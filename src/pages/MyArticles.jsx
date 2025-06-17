import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UpdateArticleModal from "../components/UpdateArticleModal";
import { AuthContext } from "../contexts/AuthContext";
import usePageTitle from "../hooks/usePageTitle";

const MyArticles = () => {
    usePageTitle("My Articles");
    const { user } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios(
                `${import.meta.env.VITE_BASE_API_URL}/articles?author_id=${
                    user.uid
                }`
            )
                .then((res) => setArticles(res.data))
                .catch((err) => console.error(err));
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `${import.meta.env.VITE_BASE_API_URL}/article/${id}`
                    );
                    setArticles(
                        articles.filter((article) => article._id !== id)
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Article deleted successfully!",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to delete article", "error");
                }
            }
        });
    };

    const handleUpdate = (article) => {
        setSelectedArticle(article);
        setFormData({
            title: article.title,
            category: article.category,
            tags: article.tags.join(", "),
            article_img: article.article_img,
            content: article.content,
        });
    };

    useEffect(() => {
        if (selectedArticle) {
            const modal = document.getElementById("update_modal");
            if (modal) {
                modal.showModal();
            }
        }
    }, [selectedArticle]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
                My Articles
            </h2>
            {articles.length === 0 ? (
                <p className="text-center">No articles posted yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article._id}>
                                    <td>{article.title}</td>
                                    <td>{article.category}</td>
                                    <td>
                                        {new Date(
                                            article.createdAt
                                        ).toDateString()}
                                    </td>
                                    <td className="flex gap-3">
                                        <Link to={`/article/${article._id}`}>
                                            <button className="btn btn-sm btn-outline btn-primary">
                                                <FaEye />
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline btn-warning"
                                            onClick={() =>
                                                handleUpdate(article)
                                            }
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline btn-error"
                                            onClick={() =>
                                                handleDelete(article._id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Update Modal */}
            {selectedArticle && (
                <UpdateArticleModal
                    article={selectedArticle}
                    setArticles={setArticles}
                    articles={articles}
                    formData={formData}
                    setFormData={setFormData}
                    closeModal={() => {
                        setSelectedArticle(null);
                        setFormData(null);
                    }}
                />
            )}
        </div>
    );
};

export default MyArticles;
