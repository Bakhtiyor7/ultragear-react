import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      title: "Logi Sales 🥳",
      desc: "70% off during Black Friday, Start shopping now!",
      author: "Logitech",
      date: "2022/09/12",
      location: "Toshkent, Yakkasaroy",
      img: "/home/black_friday.jpg",
    },
    {
      title: "MSI TOKYO GAME SHOW",
      desc: "Attend in our Game Show in Tokyo and win prizes. Order tickets through www.msi.com",
      author: "MSI",
      date: "2022/12/30",
      location: "Toshkent, Chilonzor",
      img: "/home/msi_event.jpeg",
    },
    {
      title: "Special event from Razer",
      desc: "Buy any product by Razer and get 80% off coupons for your next choice",
      author: "Razer",
      date: "2023/01/15 - 2023/02/15",
      location: "Toshkent, Uchtepa",
      img: "/home/razer_event.jpeg",
    },
    {
      title: "Samsung Galaxy buds sale",
      desc: "Get Samsung Galaxy buds 30% off deal only with us",
      author: "Oasis",
      date: "2023/01/10 - 2022/02/10",
      location: "Toshkent, Chilonzor",
      img: "/home/samsung_event.webp",
    },
  ];

  return (
    <div className="events_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"events_main"}>
          {/* <Box className={"events_text"}>
            <span className={"category_title"}>Events</span>
          </Box> */}
          <Box className={"prev_next_frame"}>
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
          </Box>
          <Swiper
            className={"events_info swiper-wrapper"}
            slidesPerView={"auto"}
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
            autoplay={{ delay: 2000, disableOnInteraction: true }}
          >
            {events_list.map((value, number) => {
              return (
                <SwiperSlide className={"events_info_frame"}>
                  <div className="events_img">
                    <img src={value.img} className={"events_img"} />
                  </div>
                  <Box className={"events_desc"}>
                    <Box className={"events_bott"}>
                      <Box className={"bott_left"}>
                        <div className={"event_title_speaker"}>
                          <strong>{value.title}</strong>
                          <div className={"event_organizator"}>
                            <img
                              src={"/icons/speaker.svg"}
                              style={{ width: "20px", marginRight: "10px" }}
                            />
                            <p className={"spec_text_author"}>{value.author}</p>
                          </div>
                        </div>

                        <p
                          className={"text_desc"}
                          style={{ marginTop: "10px" }}
                        >
                          {""} {value.desc}
                        </p>

                        <div
                          className={"bott_info"}
                          style={{ marginTop: "10px" }}
                        >
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/calendar.svg"}
                              style={{ marginRight: "10px" }}
                            />
                            {value.date}
                          </div>
                          {/* <div className={"bott_info_main"}>
                            <img
                              src={"/icons/location.svg"}
                              style={{ marginRight: "10px" }}
                            />
                            {value.location}
                          </div> */}
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
