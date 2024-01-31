from rest_framework import viewsets, status
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from main.views import BaseAuthModelViewSet

from video.serializers import VideoSerializer, VideoCategorySerializer ,\
VideoPatchSerializer, PlaylistSerializer, PlaylistVideoAddSerializer
from video.models import Video, Playlist, VideoCategory, PlaylistVideo



class VideoCategoryViewSet(BaseAuthModelViewSet):
    serializer_class = VideoCategorySerializer
    queryset = VideoCategory.objects.filter()

class PlaylistViewSet(BaseAuthModelViewSet):
    serializer_class = PlaylistSerializer
    queryset = Playlist.objects.filter()


class VideoViewSet(BaseAuthModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.filter()

    def get_serializer_class(self):
        serializer_mapping = {
            'PATCH': VideoPatchSerializer,
            'GET': VideoSerializer
        }
        method = self.request.method
        return serializer_mapping.get(method, VideoSerializer)

    def partial_update(self, request, *args, **kwargs):
        user_id = request.user.id
        video = self.get_object()

        if video.user_id == user_id:
            serializer = self.get_serializer(
                video, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"detail": "You are not allowed to update this video"})


class VideoUploadView(APIView):

    parser_classes = [FileUploadParser]
    authentication_classes = [JWTAuthentication]

    def post(self, request, filename):
        output = {"message": ""}
        print("inside post")
        print(request.data)
        file = request.data['file']
        filename = file.name

        extension = filename.split(".")[-1].lower()
        print(extension)
        if extension not in ["mp4", "mpeg", "avi", "mov"]:
            return Response({
                    "message": "Invalid file"
                })

        file = request.data['file']
        serializer = VideoSerializer(data={'file': file, 'user': request.user.id})
        
        if serializer.is_valid():
            serializer.save()
            output['message'] = 'Video uploaded'
            output['data'] = {'id': serializer.data['id']}
            return Response(output)
        else:
            print(serializer.errors)
            return Response({"message": "Invalid file"}, status=400)


        # video = Video(file=file, user=request.user)
        # video.save()
        # output['message']  = 'Video uploaded'
        # output['data'] = {'id': video.id}

        #return Response(output)




class PlaylistVideoViewSet(BaseAuthModelViewSet):
    serializer_class = PlaylistVideoAddSerializer
    queryset = PlaylistVideo.objects.filter()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        action = request.data['action']
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        if action == 'add':
            pv = PlaylistVideo.objects.filter(
                playlist_id=data['playlist'],
                video_id=data['video']
                )
            if pv:
                return Response({"error": "The video is already in playlist"}, status=status.HTTP_400_BAD_REQUEST)
            
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        elif action == 'delete':
            pv = PlaylistVideo.objects.get(
                playlist_id=data['playlist'],
                video_id=data['video']
                )
            pv.delete()
            return Response({}, status=status.HTTP_204_NO_CONTENT)


        elif action == 'fetch':
            pvs = list(PlaylistVideo.objects.filter(
                playlist=data['playlist']).values('video', 'video__name'))
            videos = []
            for pv in pvs:
                videos.append(
                        {
                            'id': pv['video'],
                            'name': pv['video__name']
                        }

                    )
            return Response(videos, status=status.HTTP_200_OK)






