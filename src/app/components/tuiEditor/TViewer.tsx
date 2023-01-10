import { Box, Stack } from "@mui/material";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { useRef } from "react";

export const TViewer = (props: any) => {
  const editorRef = useRef();

  return (
    <Stack
      className="chosen_article"
      sx={{ background: "#dddddd", mt: "30px", padding: "20px" }}
      fontFamily="Poppins"
      fontSize={"40px"}
      fontWeight={"600"}
    >
      <Box sx={{ m: "40px" }}>
        <Viewer
          //@ts-ignore
          ref={editorRef}
          initialValue={props.chosenSingleBoArticle?.art_content}
          height="600px"
        />
      </Box>
    </Stack>
  );
};
