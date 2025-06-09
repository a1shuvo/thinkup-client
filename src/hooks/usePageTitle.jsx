import { useEffect } from "react";

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | ThinkUp`;
    }, [title]);
};

export default usePageTitle;
