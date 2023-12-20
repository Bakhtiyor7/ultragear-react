import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField, Typography, IconButton } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 4),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
    width: "800px",
    position: "relative",
  },
  imgContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  },
  modalImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
    width: "60%",
  },
  closeBtn: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function AuthenticationModal(props: any) {
  const classes = useStyles();
  const [mb_nick, set_mb_nick] = useState<string>("");
  const [mb_phone, set_mb_phone] = useState<number>(0);
  const [mb_password, set_mb_password] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleUsername = (e: any) => {
    set_mb_nick(e.target.value);
  };

  const handlePhone = (e: any) => {
    set_mb_phone(e.target.value);
  };

  const handlePassword = (e: any) => {
    set_mb_password(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignupRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== "" && mb_phone !== 0;
      assert.ok(is_fulfilled, Definer.input_err1);

      const signup_data = {
        mb_nick: mb_nick,
        mb_phone: mb_phone,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.signupRequest(signup_data);

      props.handleSignUpClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      props.handleSignUpClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== "";
      assert.ok(is_fulfilled, Definer.input_err1);

      const login_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);

      props.handleLoginClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      props.handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const passwordKeyPressHandler = (e: any) => {
    if ((e.key === "Enter" && props.signUpOpen) || (e.key === "Enter" && props.loginOpen)) {
      props.signUpOpen ? handleSignupRequest() : handleLoginRequest();
    }
  };

  return (
      <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.signUpOpen || props.loginOpen}
            onClose={props.signUpOpen ? props.handleSignupClose : props.handleLoginClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
          <Fade in={props.signUpOpen || props.loginOpen}>
            <div className={classes.paper}>
              <IconButton
                  className={classes.closeBtn}
                  onClick={props.signUpOpen ? props.handleSignupClose : props.handleLoginClose}
                  color="inherit"
                  aria-label="close"
                  size="large"
              >
                <CloseIcon />
              </IconButton>
              <div className={classes.imgContainer}>
                <img
                    className={classes.modalImg}
                    src={"/auth/auth_img.png"}
                    alt="camera"
                />
              </div>
              <div className={classes.formContainer}>
                <Typography variant="h4">
                  {props.signUpOpen ? "SignUp Form" : "Login Form"}
                </Typography>
                <TextField
                    onChange={handleUsername}
                    id="outlined-basic"
                    label="username"
                    variant="outlined"
                />
                {props.signUpOpen && (
                    <TextField
                        onChange={handlePhone}
                        id="outlined-basic"
                        label="phone number"
                        variant="outlined"
                    />
                )}
                <TextField
                    onChange={handlePassword}
                    onKeyPress={passwordKeyPressHandler}
                    id="outlined-basic"
                    label="password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                />
                {props.signUpOpen && (
                    <IconButton
                        onClick={toggleShowPassword}
                        color="primary"
                        aria-label="toggle password visibility"
                        size="small"
                    >
                      {showPassword ? (
                          <VisibilityIcon />
                      ) : (
                          <VisibilityOffIcon />
                      )}
                    </IconButton>
                )}
                <Fab
                    onClick={props.signUpOpen ? handleSignupRequest : handleLoginRequest}
                    sx={{ marginTop: "30px", width: "120px" }}
                    variant="extended"
                    color="primary"
                >
                  <LoginIcon sx={{ mr: 1 }} />
                  {props.signUpOpen ? "Signup" : "Login"}
                </Fab>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
  );
}
