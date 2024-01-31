import { privateRequest } from "../../base";
const root_endpoint = "video";
const getAllVideos = async () => {
  return privateRequest(`${root_endpoint}/`, "GET", null, "json");
};

const getVideoById = async (id: string) => {
  return privateRequest(`${root_endpoint}/detail/${id}/`, "GET", null, "json");
};
const uploadVideoFile = async (body: any, filename: string) => {
  return privateRequest(
    `${root_endpoint}/upload/${filename}`,
    "POST",
    body,
    "formdata"
  );
};

const searchVideo = async (body: { keyword: string }, signal?: AbortSignal) => {
  return privateRequest(`scraper/scrape/`, "POST", body, "json", signal);
};

export { getAllVideos, getVideoById, uploadVideoFile, searchVideo };
