import { Container } from "@mui/material";
import React from "react";

export function Advertisements() {
  return (
    <div className="ads_brand_frame">
      <iframe
        width="1280px"
        height="100%"
        src="https://www.youtube.com/embed/qbpkm_S1gQc?si=YWrPNKt_H67L-3DJ?autoplay=1&loop=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ marginTop: "60px" }}
      ></iframe>
      {/*<video*/}
      {/*  className="ads_video"*/}
      {/*  width="100%"*/}
      {/*  height="100%"*/}
      {/*  autoPlay={true}*/}
      {/*  loop*/}
      {/*  muted*/}
      {/*  playsInline*/}
      {/*  data-video-media=""*/}
      {/*  onError={(e) => console.error("Video error:", e)}*/}
      {/*>*/}
      {/*  <source src="/public/ad.mp4" type="video/mp4" />*/}
      {/*</video>*/}
    </div>
  );
}
