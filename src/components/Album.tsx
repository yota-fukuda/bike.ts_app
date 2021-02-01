import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CardActions, IconButton } from "@material-ui/core";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import styles from "./Input.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { storage, db } from "../firebase";
import firebase from "firebase/app";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  image: {
    height: "300px",
    width: "400px",
  },
}));

const Album: React.FC = () => {
  const classes = useStyles();

  const user = useSelector(selectUser);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postMsg, setPostMsg] = useState("");
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPostImage(e.target.files![0]);
      e.target.value = "";
    }
    // if (e.target.files === null) {
    //   return;
    // }
    // const file = e.target.files[0];
    // if (file === null) {
    //   return;
    // }
    // let imgTag = document.getElementById("preview") as HTMLImageElement;
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const result: string = reader.result as string;
    //   imgTag.src = result;
    // };
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

  return (
    <React.Fragment>
      <main>
        <Container maxWidth="md">
          <form onSubmit={sendPost}>
            <Grid container spacing={4}>
              <Card className={classes.card}>
                <CardMedia>
                  {/* <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              /> */}
                  <IconButton>
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
                  </IconButton>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                  <textarea
                    className={styles.tweet_input}
                    placeholder="入力してください。"
                    // type="text"
                    // autoFocus
                    value={postMsg}
                    onChange={(e) => setPostMsg(e.target.value)}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    disabled={!postMsg}
                    className={
                      postMsg
                        ? styles.tweet_sendBtn
                        : styles.tweet_sendDisableBtn
                    }
                  >
                    投稿
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </form>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Album;
