import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "@/pages/CustomerReviews/index.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useGetAllReviewQuery } from "@/api/Review";

const CustomerReviews = () => {
  const {data}:any = useGetAllReviewQuery()
  return (
    <>
      <h2 className="text-center mb-6 text-[#8783f5] text-[22px] font-medium font-serif italic">
        Customer Review
      </h2>
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
        className={style.swiper}
      >
        {data?.dataReview.map((rv:any)=>(

        <SwiperSlide key={rv._id} className={style.swiper_slide}>
          <div className="w-24 h-24 bg-gray-500 rounded-full mx-auto">
            <img
              src={rv.gallery}
              className="rounded-full w-20 h-20"
              alt="avatar"
            />
          </div>
          <h3 className="font-bold mt-4 text-lg">{rv.name}</h3>
          <p className="text-gray-600 text-center mt-2 px-6">
            {rv.content}
          </p>
        </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
};

export default CustomerReviews;
