import React, { useState } from "react";
import styles from "./Input.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { storage, db } from "../firebase";
import Modal from "react-modal";
// import Input from "./Input";
import { Button, IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import firebase from "firebase/app";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "95%",
      width: "90%",
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
    image: {
      height: "300px",
      width: "400px",
    },
  })
);

const Input: React.FC = () => {
  const user = useSelector(selectUser);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postMsg, setPostMsg] = useState("");
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files![0]) {
    //   setPostImage(e.target.files![0]);
    //   e.target.value = "";
    // }
    if (e.target.files === null) {
      return;
    }
    const file = e.target.files[0];
    if (file === null) {
      return;
    }
    let imgTag = document.getElementById("preview") as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
    };
  };

  // 投稿機能
  const sendPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //投稿写真がある場合
    if (postImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + postImage.name;
      const uploadPostImg = storage.ref(`images/${fileName}`).put(postImage);
      uploadPostImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,

        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("posts").add({
                avatar: user.photoUrl,
                image: url,
                text: postMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
              });
            });
        }
      );
    } else {
      //投稿写真がない場合
      db.collection("posts").add({
        avatar: user.photoUrl,
        image: "",
        text: postMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
      });
    }
    setPostImage(null);
    setPostMsg("");
  };

  const classes = useStyles();
  //   var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={classes.content}
        contentLabel="Example Modal"
      >
        <CloseIcon onClick={closeModal} className={classes.close} />
        <form onSubmit={sendPost}>
          <div className={styles.tweet_form}>
            <IconButton>
              <label>
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
              </label>
            </IconButton>
            <textarea
              className={styles.tweet_input}
              placeholder="入力してください。"
              // type="text"
              // autoFocus
              value={postMsg}
              onChange={(e) => setPostMsg(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={!postMsg}
            className={
              postMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
            }
          >
            投稿
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Input;
