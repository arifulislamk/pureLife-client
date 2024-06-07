
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
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/q715s37/cover-photo-5.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/9bKSSL1/cover-photo-1.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/Hhrbv5r/cover-photo-7.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className=' rounded-2xl' src="https://i.ibb.co/zxN8VwF/cover-photo-3.jpg" alt="" /></SwiperSlide>

            </Swiper>
        </>
    );
};

export default Carousel;