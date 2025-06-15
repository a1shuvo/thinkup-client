import axios from "axios";
import { use, useEffect, useState } from "react";
import { BiCommentDetail, BiLogIn } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const ArticleDetails = () => {
    const article = useLoaderData();
    const {
        _id,
        title,
        content,
        category,
        tags,
        author_name,
        author_photo,
        article_img,
        createdAt,
    } = article;

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(article.totalLikes);
    const [comments, setComments] = useState(article.comments || []);
    const [commentText, setCommentText] = useState("");

    const { user } = use(AuthContext);

    useEffect(() => {
        setLiked(article.likedUsers?.includes(user?.uid));
    }, [article, user]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_BASE_API_URL}/comments/${_id}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.error("Comments load failed:", err));
    }, [_id]);

    const handleToggleLike = async () => {
        if (!user) return Swal.fire("Please login to like");

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BASE_API_URL}/article/like/${
                    article._id
                }`,
                {
                    userId: user.uid,
                }
            );
            setLiked(res.data.liked);
            setLikes(res.data.totalLikes);
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            article_id: _id,
            user_id: user.uid,
            user_name: user.displayName,
            user_photo: user.photoURL,
            comment: commentText,
            createdAt: new Date().toISOString(),
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/comments`,
                newComment
            );
            setComments([newComment, ...comments]);
            setCommentText("");
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Comment posted successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error("Error posting comment:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to post comment!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden">
                <img
                    src={article_img}
                    alt="Article"
                    className="w-full h-64 object-cover"
                />
                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-primary">{title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <img
                                src={author_photo}
                                alt={author_name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{author_name}</span>
                        </div>
                        <span>{new Date(createdAt).toDateString()}</span>
                        <span className="badge badge-secondary">
                            {category}
                        </span>
                    </div>

                    <div className="prose max-w-none dark:prose-invert">
                        {content.split("\n").map((para, idx) => (
                            <p key={idx}>{para}</p>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="badge badge-outline">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                            <button
                                className="btn btn-ghost text-error text-xl"
                                onClick={handleToggleLike}
                            >
                                {liked ? <FaHeart /> : <FaRegHeart />}{" "}
                                <span>{likes}</span>
                            </button>

                            <div className="flex items-center gap-1 text-primary">
                                <BiCommentDetail />
                                <span>{comments.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Comment Form */}
                    {user ? (
                        <form
                            onSubmit={handleComment}
                            className="mt-6 space-y-3"
                        >
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                            <button
                                className="btn btn-primary btn-sm"
                                type="submit"
                            >
                                Post Comment
                            </button>
                        </form>
                    ) : (
                        <Link to={"/auth/login"}>
                            <div className="btn btn-link font-semibold mb-3 flex justify-center items-center gap-2">
                                <span>
                                    <BiLogIn size={30}></BiLogIn>
                                </span>
                                Login to Like and Comment!
                            </div>
                        </Link>
                    )}

                    {/* Comment List */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Comments</h3>
                        <div className="space-y-4">
                            {comments.length === 0 && (
                                <p className="text-base italic">
                                    No comments yet.
                                </p>
                            )}
                            {comments.map((comment, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 bg-base-200 p-3 rounded-xl"
                                >
                                    <img
                                        src={
                                            comment.user_photo ||
                                            "https://i.pravatar.cc/40"
                                        }
                                        alt={comment.user_name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">
                                            {comment.user_name}
                                        </h4>
                                        <p className="text-sm">
                                            {comment.comment}
                                        </p>
                                        <span className="text-xs text-base-content">
                                            {new Date(
                                                comment.createdAt
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
