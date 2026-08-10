
import BestDeals from "../Components/BestDeals";
import CategoryOption from "../Components/CategorySection";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import NewsletterSection from "../Components/NewsletterSection";
import TopBrands from "../Components/TopBrands";
import TrendingProducts from "../Components/TrendingProducts";
import WhyChooseUs from "../Components/WhyChooseUs";

function Home(){

    return (
        <>
        <HeroSection />
        <TrendingProducts/>
        <CategoryOption />
        <BestDeals />
        <WhyChooseUs/>
        <TopBrands />
        <NewsletterSection />
        <Footer />
        </>
    )
}

export default Home; 