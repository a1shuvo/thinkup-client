import JoditEditor from "jodit-react";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateArticleModal = ({
    article,
    setArticles,
    articles,
    formData,
    setFormData,
    closeModal,
}) => {
    const axiosSecure = useAxiosSecure();
    const editor = useRef(null);

    useEffect(() => {
        setFormData({
            title: article.title,
            category: article.category,
            tags: article.tags.join(", "),
            article_img: article.article_img,
            content: article.content,
        });
    }, [article, setFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (newContent) => {
        setFormData((prev) => ({
            ...prev,
            content: newContent,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updated = {
            ...formData,
            tags: formData.tags.split(",").map((tag) => tag.trim()),
            updatedAt: new Date().toISOString(),
        };

        try {
            await axiosSecure.put(`/article/${article._id}`, updated);

            const updatedArticles = articles.map((a) =>
                a._id === article._id ? { ...updated, _id: article._id } : a
            );
            setArticles(updatedArticles);

            closeModal();
            Swal.fire({
                icon: "success",
                title: "Article updated successfully!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Update failed!", "error");
        }
    };

    return (
        <dialog id="update_modal" className="modal">
            <div className="modal-box w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                <h3 className="font-bold text-2xl text-primary mb-4">
                    Update Your Article
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="title"
                            className="input input-bordered w-full"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="category"
                            className="input input-bordered w-full"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="tags"
                            className="input input-bordered w-full"
                            placeholder="Tags (comma-separated)"
                            value={formData.tags}
                            onChange={handleChange}
                        />
                        <input
                            type="url"
                            name="article_img"
                            className="input input-bordered w-full"
                            placeholder="Thumbnail Image URL"
                            value={formData.article_img}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Content
                            </span>
                        </label>
                        <JoditEditor
                            ref={editor}
                            value={formData.content}
                            onBlur={handleEditorChange}
                            config={{
                                readonly: false,
                                placeholder: "Update your article content...",
                            }}
                        />
                    </div>

                    <div className="modal-action justify-between">
                        <button type="submit" className="btn btn-primary px-6">
                            Update
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default UpdateArticleModal;
