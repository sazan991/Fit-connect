import VideoThumbnails from "@/components/video/VideoThumbnail";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function VideosPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl">All Videos</h2>
        <Link href="videos/add" className="text-primary">
          Create Video
        </Link>
      </div>
      <div className="py-5">
        {/* <div className="py-6.5">
          <ul className="">
            <li className="p-3 border border-darksecond hover:bg-gray">
              <Link href="#">
                15 Minute BURNING Biceps Workout / Dumbbells - Caroline Girvan
              </Link>
            </li>
          </ul>
        </div> */}
        <VideoThumbnails />
      </div>
    </>
  );
}
