"use client";
import { uploadVideoFile } from "@/lib/apis/private/videos";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const VideoForm = () => {
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      file: "",
      name: "",
    },
  });

  const { handleSubmit, register } = methods;

  const uploadVideo = async (data: any) => {
    setLoading(true);
    const form_data = new FormData();

    try {
      const video_file_name = data.file[0].name;
      form_data.append("file", data.file[0]);
      form_data.append("name", data.name);
      const response = await uploadVideoFile(data, video_file_name);
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Video Upload Successful!");
        router.push("/videos");
      } else {
        throw responseData?.message;
      }
    } catch (err) {
      toast.error(String(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(uploadVideo)}>
      <div className="flex  gap-3">
        <div className="flex-1">
          <label className="mb-3 block text-black dark:text-white">
            Select Video File
          </label>
          <input
            {...register("file")}
            type="file"
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            accept="video/mp4"
          />
        </div>
        <div className="flex-1">
          <label className="mb-3 block text-black dark:text-white">
            Video Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter video title"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
      </div>
      <div className="text-end">
        <button
          disabled={loading}
          type="submit"
          className="mt-3 cursor-pointer rounded-lg border border-primary bg-primary py-4 px-7 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default VideoForm;
