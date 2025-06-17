import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UpdateArticleModal from "../components/UpdateArticleModal";
import useApplicationApi from "../hooks/useApplicationApi";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";

const MyArticles = () => {
    usePageTitle("My Articles");
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [formData, setFormData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { myArticlesPromise, deleteArticle } = useApplicationApi();

    useEffect(() => {
        if (user?.uid) {
            myArticlesPromise(user.uid)
                .then((data) => setArticles(data))
                .catch((err) => console.error(err));
        }
    }, [user, myArticlesPromise]);

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
                    await deleteArticle(id);
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

    // Extract unique categories
    const categories = [
        "All",
        ...new Set(articles.map((article) => article.category)),
    ];

    // Filtered articles
    const filteredArticles =
        selectedCategory === "All"
            ? articles
            : articles.filter(
                  (article) => article.category === selectedCategory
              );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
                My Articles
            </h2>

            {/* Category Filter */}
            <div className="mb-4">
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {filteredArticles.length === 0 ? (
                <p className="text-center">
                    No articles found for this category.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Likes</th>
                                {/* <th>Comments</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArticles.map((article) => (
                                <tr key={article._id}>
                                    <td>{article.title}</td>
                                    <td>{article.category}</td>
                                    <td>
                                        {new Date(
                                            article.createdAt
                                        ).toDateString()}
                                    </td>
                                    <td>
                                        <FaHeart className="inline mr-1 text-error" />{" "}
                                        {article.totalLikes || 0}
                                    </td>
                                    {/* <td>
                                        <FaComment className="inline mr-1 text-primary" />{" "}
                                        {article.commentsCount || 0}
                                    </td> */}
                                    <td className="flex gap-2">
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
