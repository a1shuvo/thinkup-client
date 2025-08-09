import axios from "axios";

export const articlesLoader = async ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "9";
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");

  let endpoint = `/articles?page=${page}&limit=${limit}`;
  if (category) endpoint += `&category=${category}`;
  if (search) endpoint += `&search=${encodeURIComponent(search)}`;

  const response = await axios(import.meta.env.VITE_BASE_API_URL + endpoint);
  return response.data;
};
