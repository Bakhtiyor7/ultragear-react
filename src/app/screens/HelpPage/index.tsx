import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "../../../css/help.css";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function HelpPage() {
  /** INITIALIZATIONS **/
  const [value, setValue] = useState("1");

  /**Handlers */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const FAQ = [
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni Payme, click ilovalari orqali amalga oshirishingiz mumkin",
    },
  ];

  const rules = [
    "Iltimos saytimizda odob-ahloq qoidalariga rioya qiling!",
    "Iltimos saytimizda odob-ahloq qoidalariga rioya qiling!",
    "Iltimos saytimizda odob-ahloq qoidalariga rioya qiling!",
  ];

  return (
    <div className="help_page">
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="simple tabs example"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Tab label="Qoidalar" value="1" />
                <Tab label="FAQ" value="2" />
                <Tab label="Adminga xat" value="3" />
              </TabList>
            </Box>
          </Box>
          <Stack className="help_main_content">
            {" "}
            <TabPanel value="1">
              <Stack className={"theRules_box"}>
                <Box className={"theRulesFrame"}>
                  {rules.map((ele, number) => {
                    return <p>{ele}</p>;
                  })}
                </Box>
              </Stack>
            </TabPanel>
          </Stack>

          <TabPanel value="2">
            <Stack className={"accordian_menu"}>
              {FAQ.map((ele, number) => {
                return (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panella-content"
                      id="panella-header"
                    >
                      <Typography>{ele.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{ele.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
          </TabPanel>
          <TabPanel value="3">
            <Stack className={"admin_letter_box"}>
              <Stack className={"admin_letter_container"}>
                <Box className={"admin_letter_frame"}>
                  <span>Adminga Xabar Qoldirish</span>
                  <p>Assalomu alaykum! {""}</p>
                </Box>
                <form
                  action={"#"}
                  method="POST"
                  className={"admin_letter_frame"}
                >
                  <div className="admin_input_box">
                    <label>Ism</label>
                    <input type={"text"} name={"mb_nick"} placeholder="ism" />
                  </div>

                  <div className="admin_input_box">
                    <label>Elektron Manzil</label>
                    <input
                      type={"text"}
                      name={"mb_email"}
                      placeholder="Elektron manzil"
                    />
                  </div>

                  <div className="admin_input_box">
                    <label>Xabar</label>
                    <textarea name="mb_msg" placeholder="Xabar"></textarea>
                  </div>
                  <Button variant="contained" type={"submit"}>
                    Jo'natish
                  </Button>
                </form>
              </Stack>
            </Stack>
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
}
