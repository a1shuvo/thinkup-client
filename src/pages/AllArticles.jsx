import { Link, useLoaderData, useSearchParams } from "react-router";

const AllArticles = () => {
    const articles = useLoaderData();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                {category ? `Articles in "${category}"` : "All Articles"}
            </h1>
            {articles.length === 0 ? (
                <p className="text-center text-gray-500">No articles found.</p>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">
                                <Link to={`/article/${article._id}`}>
                                    {article.title}
                                </Link>
                            </h2>
                            <p className="text-sm text-gray-600 mb-2">
                                Category:{" "}
                                <span className="font-medium">
                                    {article.category}
                                </span>
                            </p>
                            <p className="text-gray-700">
                                {article.description?.length > 100
                                    ? article.description.slice(0, 100) + "..."
                                    : article.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllArticles;
