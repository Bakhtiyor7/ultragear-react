import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";
import { verifiedMemberData } from "../../apiServices/verify";
import { ChatGreetMsg, ChatMessage } from "../../../types/others";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { RippleBadge } from "../../MaterialTheme/styled";
import styled from "styled-components";

const NewMessage = (data: any) => {
  if (data.new_message.mb_id == verifiedMemberData?._id) {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        sx={{ m: "10px 0px" }}
      >
        <MsgRight>{data.new_message.msg} </MsgRight>
      </Box>
    );
  } else {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        sx={{ m: "10px 0px" }}
      >
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className={"msg_left"}>{data.new_message.msg}</div>
      </Box>
    );
  }
};

export function CommunityChats() {
  /** INITIALIZATIONS **/
  const [messagesList, setMessagesList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.connect();
    console.log("PRINTED");

    socket?.on("connect", function () {
      console.log("CLIENT: conncected");
    });

    socket?.on("newMsg", (new_message: ChatMessage) => {
      console.log("CLIENT: new message");
      messagesList.push(
        // @ts-ignore
        <NewMessage new_message={new_message} key={messagesList.length} />
      );
      setMessagesList([...messagesList]);
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("CLIENT: greet message");
      messagesList.push(
        // @ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
        </p>
      );
      setMessagesList([...messagesList]);
    });

    socket?.on("infoMsg", (msg: any) => {
      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** HANDLERS */
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err: any) {
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", true);
        return false;
      }

      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);

      const mb_image_url = verifiedMemberData?.mb_image ?? "/auth/profile.svg";

      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?._id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
    } catch (err: any) {
      console.log("onclickHandler, Error:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <ChatFrame>
      <ChatTop>
        <div>Live Chat</div>
        <RippleBadge
          style={{ margin: "-30px 0 0 20px" }}
          badgeContent={onlineUsers}
        />
      </ChatTop>
      <ChatContent>
        <ChatMain className={"chat_main"}>
          <Box
            flexDirection={"row"}
            style={{ display: "flex" }}
            sx={{ m: "10px 0px" }}
          >
            <MsgLeft>We are online</MsgLeft>
          </Box>
          {messagesList}
        </ChatMain>
      </ChatContent>
      <ChatBottom>
        <MsgInput
          ref={textInput}
          type={"text"}
          name={"message"}
          placeholder={"Send a message"}
          onChange={getInputMessageHandler}
          onKeyDown={getKeyHandler}
        />
        <MsgButton onClick={onClickHandler}>
          <SendIcon style={{ color: "#fff" }} />
        </MsgButton>
      </ChatBottom>
    </ChatFrame>
  );
}

const ChatFrame = styled.div`
  width: 100%;
  height: 600px;

  display: flex;
  flex-direction: column;
  background: linear-gradient(270deg, #5912ff 0%, #9c1fff 100%);
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ChatTop = styled.div`
  width: 100%;
  height: 94px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(228, 228, 228, 0.83);

  font-family: "Helvetica";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: #fff;
`;

const ChatContent = styled.div`
  position: relative;
  padding: 17px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  background: #fff;
`;

const ChatMain = styled.div`
  position: relative;
  /*padding: 17px;*/
  width: 100%;
  /*height: 100%;*/

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: auto;
`;

const MsgLeft = styled.div`
  margin-left: 10px;
  padding: 9px;
  width: auto;
  height: auto;

  display: flex;
  background: rgba(228, 228, 228, 0.83);
  border-radius: 20px 20px 20px 0px;
`;

const ChatBottom = styled.div`
  width: 100%;
  height: 94px;

  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(228, 228, 228, 0.83);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const MsgInput = styled.input`
  padding: 20px;
  width: 276px;
  height: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  border-radius: 28px;
  border: none;
  outline-color: #257677;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const MsgButton = styled.button`
  margin-left: 14px;
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #55a99d 0%, #007665 100%);
  border: none;
`;

const MsgRight = styled.div`
  padding: 9px;
  width: auto;
  height: auto;

  display: flex;
  background: #d0ece8;
  border-radius: 20px 20px 0px 20px;
  margin-right: 5px;
`;
