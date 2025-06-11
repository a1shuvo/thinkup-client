import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios(`${import.meta.env.VITE_BASE_API_URL}/categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error("Error fetching catgories:", err);
            });
    }, []);
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                Explore by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <Link
                        key={cat}
                        to={`/articles?category=${cat}`}
                        className="btn btn-outline btn-primary"
                    >
                        {cat}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoriesList;
