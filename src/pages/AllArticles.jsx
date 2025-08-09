import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLoaderData, useSearchParams } from "react-router";
import usePageTitle from "../hooks/usePageTitle";

const PAGE_SIZE = 9;

const ShimmerCard = () => (
  <div className="card bg-base-100 border border-base-200 rounded-lg animate-pulse shadow-lg">
    <div className="h-52 bg-gray-300 rounded-t-lg mb-4"></div>
    <div className="p-4 space-y-2">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="space-y-1 flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-4 h-8 w-24 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const AllArticles = () => {
  usePageTitle("All Articles");

  const loaderData = useLoaderData() || {};
  const {
    articles: initialArticles = [],
    page: initialPage = 1,
    totalPages: initialTotalPages = 1,
  } = loaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  // URL params or fallback
  const categoryParam = searchParams.get("category") || "All";
  const searchParam = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || initialPage, 10);

  // Controlled states
  const [category, setCategory] = useState(categoryParam);
  const [searchInput, setSearchInput] = useState(searchParam);
  const [page, setPage] = useState(pageParam);

  const [articles, setArticles] = useState(initialArticles);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Categories fetched from API
  const [categories, setCategories] = useState(["All"]);

  // Fetch categories from your backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios(
          import.meta.env.VITE_BASE_API_URL + "/categories"
        );
        setCategories(["All", ...res.data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);

  // Sync states when URL params change (back/forward navigation)
  useEffect(() => {
    setCategory(categoryParam);
    setSearchInput(searchParam);
    setPage(pageParam);
  }, [categoryParam, searchParam, pageParam]);

  // Fetch articles when filters/page change
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        let endpoint = `/articles?page=${page}&limit=${PAGE_SIZE}`;
        if (category !== "All")
          endpoint += `&category=${encodeURIComponent(category)}`;
        if (searchParam.trim())
          endpoint += `&search=${encodeURIComponent(searchParam.trim())}`;

        const response = await axios(
          import.meta.env.VITE_BASE_API_URL + endpoint
        );
        const data = response.data || response;

        setArticles(data.articles || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError("Failed to load articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [category, searchParam, page]);

  // Only update searchParam when clicking search button or pressing enter
  const [tempSearch, setTempSearch] = useState(searchInput);

  const onSearchClick = () => {
    const params = {};
    if (category !== "All") params.category = category;
    if (tempSearch.trim()) params.search = tempSearch.trim();
    params.page = "1"; // reset page on new search
    setSearchParams(params);
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchClick();
    }
  };

  // Category select change resets page to 1
  const onCategoryChange = (e) => {
    const val = e.target.value;
    const params = {};
    if (val !== "All") params.category = val;
    if (tempSearch.trim()) params.search = tempSearch.trim();
    params.page = "1";
    setSearchParams(params);
  };

  // Pagination handlers
  const onPrev = () => {
    if (page > 1) {
      const params = Object.fromEntries(searchParams.entries());
      params.page = (page - 1).toString();
      setSearchParams(params);
    }
  };

  const onNext = () => {
    if (page < totalPages) {
      const params = Object.fromEntries(searchParams.entries());
      params.page = (page + 1).toString();
      setSearchParams(params);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        {category !== "All" ? `Articles in "${category}"` : "All Articles"}
      </h1>

      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex w-full sm:w-96">
          <input
            type="search"
            placeholder="Search articles by title..."
            className="input focus:outline-0 rounded-r-none flex-grow min-w-0"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={onSearchKeyDown}
            aria-label="Search articles by title"
          />
          <button
            type="button"
            className="btn btn-primary rounded-l-none flex items-center justify-center"
            onClick={onSearchClick}
            aria-label="Search articles"
          >
            <FaSearch />
          </button>
        </div>

        <select
          className="select select-bordered max-w-xs w-full sm:w-auto"
          value={category}
          onChange={onCategoryChange}
          aria-label="Filter articles by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading / Error / No Articles */}
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-error font-semibold">{error}</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-accent">No articles found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article._id}
              className="card bg-base-100 border border-base-200 rounded-lg shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out min-w-0"
            >
              {article.article_img && (
                <figure>
                  <img
                    src={article.article_img}
                    alt={article.title}
                    className="h-52 w-full object-cover rounded-t-lg"
                    loading="lazy"
                  />
                </figure>
              )}
              <div className="card-body space-y-2 break-words min-w-0">
                <Link to={`/article/${article._id}`}>
                  <h3
                    className="card-title text-lg text-primary truncate"
                    title={article.title}
                  >
                    {article.title}
                  </h3>
                </Link>

                <p className="text-sm text-accent line-clamp-3">
                  {article.content.replace(/<[^>]+>/g, "")}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <div className="avatar flex-shrink-0">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={article.author_photo}
                        alt={article.author_name}
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {article.author_name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="card-actions justify-end mt-2">
                  <Link to={`/article/${article._id}`}>
                    <button className="btn btn-sm btn-outline btn-primary">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && articles.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-12 select-none flex-wrap">
          <button
            className={`btn btn-outline btn-primary ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={page <= 1}
            onClick={onPrev}
            aria-label="Previous page"
          >
            Prev
          </button>
          <span className="font-medium whitespace-nowrap">
            Page {page} of {totalPages}
          </span>
          <button
            className={`btn btn-outline btn-primary ${
              page >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={page >= totalPages}
            onClick={onNext}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
