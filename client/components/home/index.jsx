import Header from '../../layout/headers/header';
import Banner from '../common/banner/banner';
import BannerTwo from '../common/banner/banner-2';
import HeroSlider from '../common/hero-slider';
import Products from '../common/product/trending-products';
import SaleOff from '../common/product/sale-off';
import SubscribeArea from '../common/subscribe-area';
import Footer from '../../layout/footers/footer-2';

const index = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <Banner/>
      <Products/>
      <BannerTwo/>
     
      <SaleOff/>
      <SubscribeArea/>
      <Footer/>
    </>
  );
};

export default index;