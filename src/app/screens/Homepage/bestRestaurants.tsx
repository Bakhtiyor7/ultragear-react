import React from "react";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Link,
  Typography,
} from "@mui/joy";
import { Box, Button, Container, Stack } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SentimentNeutral } from "@mui/icons-material";

export function BestRestaurants() {
  return (
    <div className="best_restaurant_frame">
      <img
        src={"icons/line_group.svg"}
        style={{
          position: "absolute",
          left: "6%",
          transform: "rotate(90degree",
        }}
      />
      <Container sx={{ mt: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Zo'r Restoranlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            <CssVarsProvider>
              <Card
                variant="outlined"
                sx={{ minHeight: 483, minWidth: 320, mr: "35px" }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"restaurant/burak.jpeg"} />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite /* @ts-ignore */ style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.700"
                  >
                    Tashkent Yunusabad
                  </Link>
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<CallIcon />}
                    textColor="neutral.700"
                  >
                    998902669955
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card--padding",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlineBorder",
                    bgcolor: "background.level1",
                  }}
                >
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100{""}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>

              <Card
                variant="outlined"
                sx={{ minHeight: 483, minWidth: 320, mr: "35px" }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"restaurant/burak.jpeg"} />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite /* @ts-ignore */ style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.700"
                  >
                    Tashkent Yunusabad
                  </Link>
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<CallIcon />}
                    textColor="neutral.700"
                  >
                    998902669955
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card--padding",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlineBorder",
                    bgcolor: "background.level1",
                  }}
                >
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100{""}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>

              <Card
                variant="outlined"
                sx={{ minHeight: 483, minWidth: 320, mr: "35px" }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"restaurant/burak.jpeg"} />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite /* @ts-ignore */ style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.700"
                  >
                    Tashkent Yunusabad
                  </Link>
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<CallIcon />}
                    textColor="neutral.700"
                  >
                    998902669955
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card--padding",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlineBorder",
                    bgcolor: "background.level1",
                  }}
                >
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100{""}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>

              <Card
                variant="outlined"
                sx={{ minHeight: 483, minWidth: 320, mr: "35px" }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"restaurant/burak.jpeg"} />
                  </AspectRatio>
                  <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite /* @ts-ignore */ style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.700"
                  >
                    Tashkent Yunusabad
                  </Link>
                </Typography>
                <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                  <Link
                    href=""
                    startDecorator={<CallIcon />}
                    textColor="neutral.700"
                  >
                    998902669955
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card--padding",
                    borderTop: "1px solid",
                    borderColor: "neutral.outlineBorder",
                    bgcolor: "background.level1",
                  }}
                >
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    100{""}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }} />
                  <Typography
                    level="body3"
                    sx={{
                      fontweight: "md",
                      color: "text.secondary",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
            </CssVarsProvider>
          </Stack>

          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Button style={{ background: "#1976D2", color: "#FFFFFF" }}>
              Barchasini Ko'rish
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
