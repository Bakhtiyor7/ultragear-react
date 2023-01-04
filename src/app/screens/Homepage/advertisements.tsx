import { Container } from "@mui/material";
import React from "react";

export function Advertisements() {
  return (
    <div className="ads_restaurant_frame">
      <iframe
        className="ads_video"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/qbpkm_S1gQc"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
