import { Box, Stack } from "@mui/material";
import "../../../css/categories.css";

export function Categories() {
  return (
    <div className="container">
      <Stack className="categories_wrapper">
        <h1>Browse By Category</h1>
        <Box className="categories">
          <Box className="category_option">
            <img src="/home/keyboard_icon.svg" />
            <p>Keyboard</p>
          </Box>
          <Box className="category_option">
            <img src="/home/mouse_icon.svg" />
            <p>Mouse</p>
          </Box>
          <Box className="category_option">
            <img src="/home/headset_icon.svg" />
            <p>Headset</p>
          </Box>
          <Box className="category_option">
            <img src="/home/earphone_icon.svg" />
            <p>Earphone</p>
          </Box>
          <Box className="category_option">
            <img src="/home/speaker_icon.svg" />
            <p>Speaker</p>
          </Box>
          <Box className="category_other">
            <p>Other</p>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
