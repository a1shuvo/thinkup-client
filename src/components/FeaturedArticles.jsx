import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`${import.meta.env.VITE_BASE_API_URL}/articles?limit=6`)
      .then((res) => {
        // res.data is expected to be { articles: [...], totalCount, ... }
        if (res.data && Array.isArray(res.data.articles)) {
          setArticles(res.data.articles);
        } else {
          setArticles([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setArticles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
          Featured Articles
        </h2>
        <p className="text-center text-gray-500">Loading...</p>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
          Featured Articles
        </h2>
        <p className="text-center text-gray-500">No articles found.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
        Featured Articles
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <motion.div
            key={article._id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="card bg-base-100 shadow-xl hover:shadow-2xl border border-base-200"
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
            <div className="card-body space-y-2">
              <Link to={`/article/${article._id}`}>
                <h3
                  className="card-title text-lg text-primary truncate"
                  title={article.title}
                >
                  {article.title}
                </h3>
              </Link>

              <p className="text-sm text-accent line-clamp-3">
                {article.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
              </p>

              <div className="flex items-center gap-3 mt-2">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={article.author_photo}
                      alt={article.author_name}
                      loading="lazy"
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
