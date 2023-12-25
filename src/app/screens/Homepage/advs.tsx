import { Box, Button, Container } from "@mui/material";
import "../../../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { NavLink } from "react-router-dom";

export function Advertisement(props: any) {
  const events_list = [
    {
      category: "PC peripheralsa",
      title: "MX MASTER 3S",
      desc: "Performance Wireless Mouse",
      img: "/home/mx_3.webp",
    },
    {
      category: "Headphones & Speakers",
      title: "AirPods Max",
      desc: "Day-long comfort, great for small to medium-sized hands.",
      img: "/home/airpods_img.svg",
    },
    {
      category: "Laptops & PC",
      title: "Macbook M2 Pro 16",
      desc: "The new MacBook Pro boasts up to 6x faster performance than the highest-end Intel-based MacBook Pro",
      img: "/home/macbook_pro.png",
    },
  ];

  return (
    <div className="adv_frame">
      <Container className="adv_container">
        <Swiper
          // modules={[Navigation, Pagination]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={200}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
        >
          <Box className="arrow_left">
            <img src="/home/arrow-left.svg" className="swiper-button-prev" />
          </Box>
          {events_list.map((value, number) => {
            return (
              <SwiperSlide
                style={{ width: "70%" }}
                className="swiper_container"
              >
                <Box className="swiper_left">
                  <p>{value.category}</p>
                  <h1>{value.title}</h1>
                  <p className="swiper_text">{value.desc}</p>
                  <NavLink
                    to={"/brand"}
                    onClick={props.setPath}
                    style={{ textDecoration: "none" }}
                  >
                    <Button className="view_more_button">View More</Button>
                  </NavLink>
                </Box>
                <Box className="swiper_right">
                  <img
                    src={value.img}
                    style={{ width: "90%", height: "auto" }}
                  />
                </Box>
              </SwiperSlide>
            );
          })}
          <Box className="arrow_right">
            <img src="/home/arrow-right.svg" className="swiper-button-next" />
          </Box>
        </Swiper>
      </Container>
    </div>
  );
}
