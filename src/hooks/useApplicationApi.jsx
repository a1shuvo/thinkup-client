import { useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useApplicationApi = () => {
    const axiosSecure = useAxiosSecure();

    const myArticlesPromise = useCallback(
        async (uid) => {
            const res = await axiosSecure.get(`/articles?author_id=${uid}`);
            return res.data;
        },
        [axiosSecure]
    );

    const deleteArticle = useCallback(
        async (id) => {
            const res = await axiosSecure.delete(`/article/${id}`);
            return res.data;
        },
        [axiosSecure]
    );

    return {
        myArticlesPromise,
        deleteArticle,
    };
};

export default useApplicationApi;
