import { makeStyles } from "@material-ui/core";
import { React, useState, useContext } from "react";
import { useMoralis } from "react-moralis";

import { AmazonContext } from "../context/AmazonContext";
import Rating from "@mui/material/Rating";
const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    padding: "15px",
    backgroundColor: "hsl(0, 0%, 100%)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "start",
    gap: "10px",
  },
  leftSide: {
    backgroundColor: "hsl(223, 19%, 93%)",
    flex: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px",
    padding: "10px",
    borderRadius: "10px",
  },
  count: {
    color: " hsl(238, 40%, 52%)",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  rightSide: {
    flex: "calc(100% - 30px)",
  },
  title: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    "& img": {
      width: "30px",
      height: "30px",
      borderRadius: "100%",
    },
  },
  content: {
    color: "hsl(211, 10%, 45%)",
    textAlign: "justify",
  },
}));

export const ReviewCard = ({ item }) => {
  const classes = useStyles();
  const { Moralis } = useMoralis();
  const { assetReviews, assets, setAssetReviews } = useContext(AmazonContext);
  const [reviewer, setReviewer] = useState([]);
  const [rating, setRating] = useState([]);
  const [img, setImg] = useState([]);
  const [con, setCon] = useState([]);

  const fetchMyReviews = async () => {
    const objectId = "6Vox0Wt2w2zqL8PSLNFQW36B"; //input your value here
    const query = new Moralis.Query("assets");

    query.equalTo("objectId", objectId);
    const queryResult = await query.first({ useMasterKey: true });
    const assetReview = queryResult.get("assetReview");
    setReviewer(assetReview[0].reviewer);
    setRating(assetReview[0].rating);
    setImg(assetReview[0].reviewerImg);
    setCon(assetReview[0].reviewerContent);
    //console.log("start");
    //console.log(assetReviews);
    //console.log("end");
  };

  return (
    <>
      {item.map((asset, index) => {
        return (
          <div className={classes.container} key={index}>
            <div className={classes.rightSide}>
              <div>
                <div className={classes.title}>
                  <img src={asset.reviewerImg} />

                  <div>{asset.reviewer} </div>
                  <div>1 months</div>
                </div>
                <div className={classes.content}>
                  <Rating name="read-only" rating={asset.rating} readOnly />
                  <div>{asset.review}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
