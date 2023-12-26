import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      title: "MSI TOKYO GAME SHOW",
      desc: "Attend in our Game Show in Tokyo and win prizes. Order tickets through www.msi.com",
      detail:
        "This is the service detail This is the service detail This is the service detail",
      author: "MSI",
      date: "2023/12/30",
      location: "Toshkent, Chilonzor",
      img: "/home/game_mask.svg",
    },
    {
      title: "Special event from Razer",
      desc: "Buy any product by Razer and get 80% off coupons for your next choice",
      detail:
        "This is the service detail This is the service detail This is the service detail",
      author: "Razer",
      date: "2023/01/15 - 2023/02/15",
      location: "Toshkent, Uchtepa",
      img: "/home/razer_mask.svg",
    },
    {
      title: "Logi Sales 🥳",
      desc: "70% off during Black Friday, Start shopping now!",
      detail:
        "This is the service detail This is the service detail This is the service detail",
      author: "Logitech",
      date: "2022/09/12",
      location: "Toshkent, Yakkasaroy",
      img: "/home/logtech_mask.svg",
    },
    {
      title: "Samsung Galaxy buds sale",
      desc: "Get Samsung Galaxy buds 30% off deal only with us",
      detail:
        "This is the service detail This is the service detail This is the service detail",
      author: "Oasis",
      date: "2023/01/10 - 2022/02/10",
      location: "Toshkent, Chilonzor",
      img: "/home/buds_mask.png",
    },
  ];

  return (
    <div className="events_frame">
      {/* <Box className={"events_text"}>
            <span className={"category_title"}>Events</span>
          </Box> */}
      {/* <Box className={"prev_next_frame"}>
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-prev"}
            />
            <div className={"dot_frame_pagination swiper-pagination"}></div>
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-next"}
              style={{ transform: "rotate(-180deg)" }}
            />
          </Box> */}
      <Swiper
        className={"events_info swiper-wrapper"}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        {events_list.map((value, number) => {
          return (
            <SwiperSlide className={"events_info_frame"}>
              <div style={{ height: "100%" }}>
                <img src={value.img} />
              </div>
              <Box className="events_swiper_info">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <p className="header_text">{value.title}</p>
                  <p style={{ fontSize: "18px" }}>{value.desc}</p>
                </div>

                <p>{value.date}</p>
                <a href="" style={{ color: "#fff", textDecoration: "none" }}>
                  {`view more >`}
                  {/* <img src="/home/view_more.svg" /> */}
                </a>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
