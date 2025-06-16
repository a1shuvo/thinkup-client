import { Link, useLoaderData, useSearchParams } from "react-router";

const AllArticles = () => {
    const articles = useLoaderData();
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-10">
                {category ? `Articles in "${category}"` : "All Articles"}
            </h1>

            {articles.length === 0 ? (
                <p className="text-center text-gray-500">No articles found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl border border-base-200">
                            {article.article_img && (
                                <figure>
                                    <img
                                        src={article.article_img}
                                        alt={article.title}
                                        className="h-52 w-full object-cover rounded-t-lg"
                                    />
                                </figure>
                            )}
                            <div className="card-body space-y-2">
                                <Link to={`/article/${article._id}`}>
                                    <h3 className="card-title text-lg text-primary">
                                        {article.title}
                                    </h3>
                                </Link>

                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {article.content.replace(/<[^>]+>/g, "")}
                                </p>

                                <div className="flex items-center gap-3 mt-2">
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
                                            {article.author_name || "Unknown"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(
                                                article.createdAt
                                            ).toLocaleDateString()}
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
        </div>
    );
};

export default AllArticles;
