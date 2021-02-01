import React, { useState } from "react";
import styles from "./Input.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { storage, db } from "../firebase";
import Modal from "react-modal";
// import Input from "./Input";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import firebase from "firebase/app";
import CloseIcon from "@material-ui/icons/Close";
import Album from "./Album";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // height: "95%",
      // width: "90%",
    },
    button: {
      textTransform: "none",
      color: "#e0e0e0",
      position: "relative",
      marginRight: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    close: {
      cursor: "pointer",
    },
  })
);

const Input: React.FC = () => {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={openModal}
        >
          <CreateIcon />
          投稿
        </Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={classes.content}
      >
        <CloseIcon onClick={closeModal} className={classes.close} />
        {/* <form onSubmit={sendPost}> */}
        {/* <CardActionArea>
            <div className={styles.tweet_form}>
              <IconButton>
                <CardMedia>
                  <AddAPhotoIcon
                    className={
                      postImage
                        ? styles.tweet_addIconLoaded
                        : styles.tweet_addIcon
                    }
                    color="primary"
                  />
                  <input
                    className={styles.tweet_hiddenIcon}
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={onChangeImageHandler}
                  />
                  <img id="preview" src="null" className={classes.image} />
                </CardMedia>
              </IconButton>
              <CardContent>
                <textarea
                  className={styles.tweet_input}
                  placeholder="入力してください。"
                  // type="text"
                  // autoFocus
                  value={postMsg}
                  onChange={(e) => setPostMsg(e.target.value)}
                />
              </CardContent>
            </div>
          </CardActionArea> */}
        {/* <Button
            type="submit"
            disabled={!postMsg}
            className={
              postMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
            }
          >
            投稿
          </Button> */}
        <Album />
        {/* </form> */}
      </Modal>
    </>
  );
};

export default Input;
