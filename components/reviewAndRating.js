import ReviewCard from "./reviewCard";
import ReviewInput from "./reviewInput";
import React, { useContext, useState } from "react";
import { AmazonContext } from "../context/AmazonContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",

    display: "flex",
    justifyContent: "center",
    backgroundColor: " hsl(223, 19%, 93%)",
    height: "100vh",
    "& div": {
      maxWidth: "800px",
      "& div": {
        margin: "5px 0",
      },
    },
  },
}));
const ReviewAndRating = () => {
  const classes = useStyles();
  const { assetReviews } = useContext(AmazonContext);
  console.log(assetReviews);
  return (
    <div className={classes.container}>
      <div>
        <div>
          {assetReviews ? <div>Comments</div> : <div>No Comments</div>}
          <div>
            {assetReviews.map((item, index) => {
              console.log(assetReviews);
              return <ReviewCard key={index} item={item} index={index} />;
            })}
          </div>
        </div>
        <ReviewInput />
      </div>
    </div>
  );
};

export default ReviewAndRating;
