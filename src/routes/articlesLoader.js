import axios from "axios";

export const articlesLoader = async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const endpoint = category ? `/articles?category=${category}` : "/articles";
    const response = await axios(import.meta.env.VITE_BASE_API_URL + endpoint);
    return response.data;
};
