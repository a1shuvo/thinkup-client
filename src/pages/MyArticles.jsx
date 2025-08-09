import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaEye, FaHeart, FaSearch, FaTrash } from "react-icons/fa";
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
  const [searchTerm, setSearchTerm] = useState("");
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
          setArticles(articles.filter((article) => article._id !== id));
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
  const categories = useMemo(() => {
    return ["All", ...new Set(articles.map((a) => a.category))];
  }, [articles]);

  // Filter articles by category and search term (title)
  const filteredArticles = useMemo(() => {
    let filtered = articles;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [articles, selectedCategory, searchTerm]);

  // To handle search button click
  const [tempSearch, setTempSearch] = useState("");
  const onSearchClick = () => setSearchTerm(tempSearch);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary text-center">
        My Articles
      </h2>

      {/* Search + Category Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search input + button */}
        <div className="flex w-full md:w-96">
          <input
            type="search"
            placeholder="Search by title..."
            className="input focus:outline-none rounded-r-none flex-grow"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            aria-label="Search articles by title"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearchClick();
              }
            }}
          />
          <button
            onClick={onSearchClick}
            className="btn btn-primary rounded-l-none"
            aria-label="Search articles"
            type="button"
          >
            <FaSearch />
          </button>
        </div>

        {/* Category filter */}
        <div className="w-full md:w-auto">
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter articles by category"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-base-content/70 mt-12">
          No articles found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-base-300">
          <table className="table table-zebra w-full min-w-[700px]">
            <thead className="bg-base-200 sticky top-0 shadow-md z-10">
              <tr>
                <th className="whitespace-nowrap">Title</th>
                <th className="whitespace-nowrap">Category</th>
                <th className="whitespace-nowrap">Date</th>
                <th className="whitespace-nowrap">Likes</th>
                <th className="whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article._id}>
                  <td className="max-w-xs truncate" title={article.title}>
                    {article.title}
                  </td>
                  <td>{article.category}</td>
                  <td>{new Date(article.createdAt).toDateString()}</td>
                  <td>
                    <FaHeart className="inline mr-1 text-error" />{" "}
                    {article.totalLikes || 0}
                  </td>
                  <td className="flex gap-2 justify-center">
                    <Link to={`/article/${article._id}`}>
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        aria-label="View article"
                      >
                        <FaEye />
                      </button>
                    </Link>
                    <button
                      className="btn btn-sm btn-outline btn-warning"
                      onClick={() => handleUpdate(article)}
                      aria-label="Edit article"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(article._id)}
                      aria-label="Delete article"
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
