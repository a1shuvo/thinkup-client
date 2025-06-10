import axios from "axios";
import { useEffect, useState } from "react";

const FeaturedArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/articles")
            .then((res) => {
                setArticles(res.data.slice(0, 6));
            })
            .catch((err) => {
                console.error("Error fetching articles:", err);
            });
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                Featured Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <div
                        key={article._id}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                    >
                        <div className="card-body">
                            <h3 className="card-title">{article.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {article.content}
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={article.author_photo}
                                            alt={article.author_name}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {article.author_name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Published recently
                                    </p>
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-sm btn-outline btn-primary">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedArticles;
