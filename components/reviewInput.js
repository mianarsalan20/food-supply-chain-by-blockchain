import { makeStyles } from "@material-ui/core";
import { React, useState, useContext } from "react";
import { useMoralis } from "react-moralis";
import { AmazonContext } from "../context/AmazonContext";
import Rating from "@mui/material/Rating";
const useStyles = makeStyles((theme) => ({
  incontainer: {
    display: "flex",
    flexDirection: "column",
    padding: "15px 15px 5px 15px",
    backgroundColor: "#ffff",
    borderRadius: "10px",
  },
  container: {
    display: "flex",
    alignItems: "start",

    width: "100%",
    padding: "15px 15px 5px 15px",
    backgroundColor: "#ffff",
    borderRadius: "10px",
    gap: "10px",
    "& img": {
      width: "30px",
      height: "30px",
      borderRadius: "100%",
    },
    "& textarea": {
      flex: "1",
      fontSize: "16px",
      color: "  hsl(211, 10%, 45%)",
      fontWeight: "700",
      resize: "none",
      borderRadius: "10px",
      border: "1px solid #fcfc",
      padding: "10px",
      "&:focus": {
        outline: "none",
      },
    },
    "& button": {
      backgroundColor: " hsl(238, 40%, 52%)",
      color: "#ffff",
      cursor: "pointer",
      padding: "10px 15px",
      border: "0",
      borderRadius: "5px",
      fontSize: "14px",
      fontWeight: "bold",
      outline: "none",

      "&:focus": {
        opacity: "0.9",
      },
    },
  },
  star: {
    height: "25px",
    display: "flex",
    flexDirection: "column",
    padding: "10px 50px",
    backgroundColor: "#ffff",
    borderRadius: "10px",
  },
}));

export const ReviewInput = () => {
  const classes = useStyles();
  const { user, setUserData, userError, Moralis, isAuthenticated, account } =
    useMoralis();
  const { setReviews } = useContext(AmazonContext);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  return (
    <div className={classes.incontainer}>
      <div className={classes.container}>
        <img src={user.attributes.profileImg} />
        <textarea
          placeholder="Write Something...."
          rows="2"
          onChange={(event) => setComment(event.currentTarget.value)}
        ></textarea>
        <button
          type="button"
          onClick={() => {
            setReviews(rating, comment);
          }}
        >
          Send
        </button>
      </div>
      <div className={classes.star}>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
    </div>
  );
};
