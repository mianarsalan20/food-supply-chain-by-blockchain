import ReviewCard from "./reviewCard";
import ReviewInput from "./reviewInput";
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
  return (
    <div className={classes.container}>
      <div>
        <ReviewCard />
        <ReviewInput />
      </div>
    </div>
  );
};

export default ReviewAndRating;
