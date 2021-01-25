import React from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: "none",
      color: "#fff",
      position: "relative",
      marginRight: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
  })
);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Sample = () => {
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
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Mebee</h2>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={closeModal}
        >
          close
        </Button>
        <div>テキストテキスト</div>
      </Modal>
    </div>
  );
};

export default Sample;
