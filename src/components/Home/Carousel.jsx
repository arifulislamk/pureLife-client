
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carouse.css'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Carousel = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/1dWWDct/Free-Medical-Camp.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/gm2wC38/Free-Medical-Checkup-Camp.png" alt="" /></SwiperSlide>
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/gt6t8wW/maharashtra-day-medical-camp01.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/vsCNC2G/lucas-vasques-9vn-ACv-X2748-unsplash.jpg" alt="" /></SwiperSlide>
                
            </Swiper>
        </>
    );
};

export default Carousel;