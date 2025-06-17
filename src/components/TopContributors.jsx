import { FaBookOpen, FaMedal } from "react-icons/fa";

const contributors = [
    {
        id: 1,
        name: "Ayesha Rahman",
        avatar: "https://i.pravatar.cc/150?img=32",
        title: "Full Stack Developer",
        articles: 152,
        level: "Gold",
    },
    {
        id: 2,
        name: "Tanvir Hossain",
        avatar: "https://i.pravatar.cc/150?img=12",
        title: "AI Enthusiast",
        articles: 118,
        level: "Silver",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        avatar: "https://i.pravatar.cc/150?img=47",
        title: "Tech Writer",
        articles: 98,
        level: "Bronze",
    },
];

const levelColors = {
    Gold: "text-yellow-500",
    Silver: "text-gray-400",
    Bronze: "text-orange-400",
};

const TopContributors = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-primary">
                Top Contributors
            </h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {contributors.map((user) => (
                    <div
                        key={user.id}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
                    >
                        <div className="card-body items-center text-center">
                            <div className="avatar mb-4">
                                <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                    <img src={user.avatar} alt={user.name} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {user.title}
                            </p>
                            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                <FaBookOpen className="text-primary" />
                                <span>{user.articles} articles</span>
                            </div>
                            <div
                                className={`mt-2 flex items-center gap-2 font-medium ${
                                    levelColors[user.level]
                                }`}
                            >
                                <FaMedal />
                                <span>{user.level} Contributor</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopContributors;
