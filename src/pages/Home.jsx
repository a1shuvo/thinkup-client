import CategoriesList from "../components/CategoriesList";
import CommunityCTA from "../components/CommunityCTA";
import FeaturedArticles from "../components/FeaturedArticles";
import HeroBanner from "../components/HeroBanner";
import TopContributors from "../components/TopContributors";

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <FeaturedArticles></FeaturedArticles>
            <CategoriesList></CategoriesList>
            <TopContributors></TopContributors>
            <CommunityCTA></CommunityCTA>
        </div>
    );
};

export default Home;
