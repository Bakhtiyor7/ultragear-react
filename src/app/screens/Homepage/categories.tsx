import { Box, Stack } from "@mui/material";
import "../../../css/categories.css";
import {sweetComingSoonAlert} from "../../../lib/sweetAlert";

export function Categories() {
  return (
    <div className="container">
      <Stack className="categories_wrapper">
        <h1>Browse By Category</h1>
        <Box className="categories">
          <Box className="category_option" style={{cursor: "pointer"}} onClick={sweetComingSoonAlert} >
            <img src="/home/keyboard_icon.svg" alt={"category_icon"}/>
            <p>Keyboard</p>
          </Box>
          <Box className="category_option" style={{cursor: "pointer"}} onClick={sweetComingSoonAlert}>
            <img src="/home/mouse_icon.svg" alt={"category_icon"}/>
            <p>Mouse</p>
          </Box>
          <Box className="category_option" style={{cursor: "pointer"}} onClick={sweetComingSoonAlert}>
            <img src="/home/headset_icon.svg" alt={"category_icon"}/>
            <p>Headset</p>
          </Box>
          <Box className="category_option" style={{cursor: "pointer"}} onClick={sweetComingSoonAlert}>
            <img src="/home/earphone_icon.svg" alt={"category_icon"}/>
            <p>Earphone</p>
          </Box>
          <Box className="category_option" style={{cursor: "pointer"}} onClick={sweetComingSoonAlert}>
            <img src="/home/speaker_icon.svg" alt={"category_icon"}/>
            <p>Speaker</p>
          </Box>
          <Box className="category_other" style={{cursor: "pointer"}} onClick={sweetComingSoonAlert}>
            <p>Other</p>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
