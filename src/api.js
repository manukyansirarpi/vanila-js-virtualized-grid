import { UNSPLASH_ACCESS_KEY } from "../config.js";

export const fetchPhotos = async (page) => {
  const response = await fetch(
    `https://api.unsplash.com/photos?page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  const data = await response.json();
  return data;
};
