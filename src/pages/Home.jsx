import CategoriesList from "../components/CategoriesList";
import CommunityCTA from "../components/CommunityCTA";
import FeaturedArticles from "../components/FeaturedArticles";
import HeroBanner from "../components/HeroBanner";
import Testimonials from "../components/Testimonials";
import TopContributors from "../components/TopContributors";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle("Home");
  return (
    <div className="text-base-content">
      <HeroBanner></HeroBanner>
      <FeaturedArticles></FeaturedArticles>
      <CategoriesList></CategoriesList>
      <TopContributors></TopContributors>
      <Testimonials></Testimonials>
      <CommunityCTA></CommunityCTA>
    </div>
  );
};

export default Home;
