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
      question: "How can I pay?",
      answer: "You can pay through Payme, KakaoPay, or NaverPay",
    },
    {
      question: "How long does the delivery take?",
      answer:
        "Your item will be shipped in maximum 3 days. If you are a premium member, delivery lasts 1 day!",
    },
    {
      question:
        "Is the security gurranteed when I use the website?",
      answer:
        "Of course, our engineers make sure to provide your security",
    },
    {
      question: "Who should I contact if I have a problem?",
      answer: "Our operators respond to your calls and messages 24/7",
    },
    {
      question:
        "I am going to use this website as a business owner, not a normal user. What should i do?",
      answer:
        "Dear customer, please contact us through our phone numbers or email address shown in the website",
    },
  ];

  const rules = [
    "Prevent abuse: With a Terms and Conditions page, you can outline the behaviors that you prohibit on your website, such as harassing and spamming other users or posting defamatory content.",
    "Establish ownership of site content: A Terms and Conditions page can inform your users that you own the content on your site.",
    "Limit liability: A well-written Terms and Conditions page can help prevent harmful lawsuits by establishing the conditions of the website. It can also help prevent your website from being held accountable for any errors or misinformation on your site.",
    "Maqolalaringiz odob doirasidan chiqib ketmasligi shart.",
    "Barcha xarakatlaringiz adminlarimiz nazorati ostida bo'lani sabab iltimos talablarimizni xurmat qiling.",
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
                <Tab label="Rules" value="1" />
                <Tab label="FAQ" value="2" />
                <Tab label="contact admin" value="3" />
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
                    <span>Leave a message to admin</span>
                    <p>Hello! {""}</p>
                  </Box>
                  <form
                    action={"#"}
                    method="POST"
                    className={"admin_letter_frame"}
                  >
                    <div className="admin_input_box">
                      <label>Name</label>
                      <input
                        type={"text"}
                        name={"mb_nick"}
                        placeholder="name"
                      />
                    </div>

                    <div className="admin_input_box">
                      <label>E-mail</label>
                      <input
                        type={"text"}
                        name={"mb_email"}
                        placeholder="email"
                      />
                    </div>

                    <div className="admin_input_box">
                      <label>Message</label>
                      <textarea name="mb_msg" placeholder="text"></textarea>
                    </div>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "30px",
                      }}
                    >
                      <Button variant="contained" type={"submit"}>
                        Send
                      </Button>
                    </Box>
                  </form>
                </Stack>
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
