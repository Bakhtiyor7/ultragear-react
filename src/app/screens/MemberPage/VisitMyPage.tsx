import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { MemberPosts } from "./memberPosts";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import SettingsIcon from "@mui/icons-material/Settings";
import { MySettings } from "./mySettings";

export function VisitMyPage(props: any) {
  /**INITIALIZATION */
  const [value, setValue] = useState("1");

  /**HANDLERS */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"my_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className={"my_page_frame"}>
          <TabContext value={value}>
            <Stack className={"my_page_left"}>
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className={"menu_name"}>Mening Maqolalarim</Box>
                  <Box className={"menu_content"}>
                    <MemberPosts />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={5}
                          page={1}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color={"secondary"}
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value="2">
                  <Box className={"menu_name"}>Followers</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowers />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={5}
                          page={1}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color={"secondary"}
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className={"menu_name"}>Following</Box>
                  <Box className={"menu_content"}>
                    <MemberFollowing />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className={"bottom_box"}>
                        <Pagination
                          count={5}
                          page={1}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color={"secondary"}
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>

                <TabPanel value="6">
                  <Box className={"menu_name"}>Ma'lumotlarni o'zgartirish</Box>
                  <Box className={"menu_content"}>
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className={"my_page_right"}>
              <Box className={"order_info_box"}>
                <a onClick={() => setValue("6")} className={"settings_btn"}>
                  <SettingsIcon />
                </a>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className={"order_user_img"}>
                    <img
                      className={"order_user_avatar"}
                      src={"/icons/profile.svg"}
                    />
                    <div className={"order_user_icon_box"}>
                      <img src="/icons/user_icon.svg" />
                    </div>
                  </div>
                  <span className={"order_user_name"}>Baxtiyor</span>
                  <span className={"order_user_prof"}>USER</span>
                </Box>
                <div className={"user_media_box"}>
                  <img src="/icons/facebook.svg" />
                  <img src="/icons/instagram.svg" />
                  <img src="/icons/telegram.svg" />
                  <img src="/icons/youtube.svg" />
                </div>
                <Box className={"user_media_box"}>
                  <p className="follows">Followers: 0</p>
                  <p className="follows">Following: 0</p>
                </Box>
                <p>Qo'shimcha kiritilmagan</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  marginTop={"10px"}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={(e) => (
                        <Button
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Maqola yozish
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>
              <Box className={"my_page_menu"}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Tab
                    value={"1"}
                    component={(e) => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("1")}
                      >
                        <img src="/icons/pencil.svg" />
                        <span>Maqolalarim</span>
                      </div>
                    )}
                  />

                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={(e) => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("2")}
                      >
                        <img src="/icons/follower.svg" />
                        <span>Follower</span>
                      </div>
                    )}
                  />

                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={(e) => (
                      <div
                        className={`menu_box ${value}`}
                        onClick={() => setValue("3")}
                      >
                        <img src="/icons/following.svg" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
