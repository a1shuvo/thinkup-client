import axios from "axios";
import JoditEditor from "jodit-react";
import { use, useRef, useState } from "react";
import { FaCalendarAlt, FaRegImage, FaTags, FaUser } from "react-icons/fa";
import { MdCategory, MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const PostArticle = () => {
    const { user } = use(AuthContext);
    const editor = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: "",
        article_img: "",
        date: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditorChange = (newContent) => {
        setFormData((prev) => ({
            ...prev,
            content: newContent,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        const newArticle = {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            tags: tagsArray,
            article_img: formData.article_img,
            author_id: user.uid,
            author_name: user.displayName,
            author_photo: user.photoURL,
            likedUsers: [],
            totalLikes: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/article`,
                newArticle
            );
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Article Published Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFormData({
                    title: "",
                    content: "",
                    category: "",
                    tags: "",
                    article_img: "",
                    date: new Date().toISOString().split("T")[0],
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to publish article",
            });
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-base-100 shadow-lg p-8 rounded-2xl">
                <h2 className="text-3xl font-bold text-center text-primary mb-6">
                    Publish New Article
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="label font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="input input-primary focus:input-ghost w-full"
                            placeholder="Enter article title"
                        />
                    </div>

                    {/* Rich Text Editor */}
                    <div className="space-y-2">
                        <label className="label font-medium">Content</label>
                        <JoditEditor
                            ref={editor}
                            value={formData.content}
                            tabIndex={1}
                            onBlur={handleEditorChange}
                            config={{
                                readonly: false,
                                placeholder:
                                    "Write your article content here...",
                                style: {
                                    color: "#000",
                                },
                            }}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="label font-medium">
                            <MdCategory />
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="input input-primary focus:input-ghost w-full"
                            placeholder="e.g., Technology"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <label className="label font-medium flex items-center gap-2">
                            <FaTags /> Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="input input-primary focus:input-ghost w-full"
                            placeholder="e.g., AI, Future, Tech"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="space-y-2">
                        <label className="label font-medium flex items-center gap-2">
                            <FaRegImage /> Thumbnail Image URL
                        </label>
                        <input
                            type="url"
                            name="article_img"
                            value={formData.article_img}
                            onChange={handleChange}
                            required
                            className="input input-primary focus:input-ghost w-full"
                            placeholder="https://source.unsplash.com/800x400/?ai,tech"
                        />
                    </div>

                    {/* Author Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="label font-medium flex items-center gap-2">
                                <FaUser /> Author Name
                            </label>
                            <input
                                type="text"
                                value={user?.displayName}
                                readOnly
                                className="input input-primary focus:input-ghost input-disabled w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="label font-medium">
                                <MdEmail size={20} /> Author Email
                            </label>
                            <input
                                type="email"
                                value={user?.email}
                                readOnly
                                className="input input-primary focus:input-ghost input-disabled w-full"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <label className="label font-medium flex items-center gap-2">
                            <FaCalendarAlt /> Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input input-primary focus:input-ghost w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Publish Article
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostArticle;
