import CategoriesList from "../components/CategoriesList";
import FeaturedArticles from "../components/FeaturedArticles";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <FeaturedArticles></FeaturedArticles>
            <CategoriesList></CategoriesList>
        </div>
    );
};

export default Home;
