import { Container } from "@mui/material";
import React from "react";

export function Advertisements() {
  return (
    <div className="ads_brand_frame">
      <video
        className="ads_video"
        width="100%"
        height="100%"
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
        onError={(e) => console.error("Video error:", e)}
      >
        <source src="/public/ad.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
