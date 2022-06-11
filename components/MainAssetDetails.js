import React from "react";
import Header from "./Header";
import AssetDetails from "./assetDetails";
import ReviewAndRating from "./reviewAndRating";
import { ReviewInput } from "./reviewInput";
import { ReviewCard } from "./reviewCard";

const MainAssetDetails = () => {
  const styles = {
    container: `h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden`,
  };

  return (
    <div className={styles.container}>
      <Header />
      <AssetDetails />
      <br />
      <ReviewCard />
      <ReviewInput />
      <br />
    </div>
  );
};

export default MainAssetDetails;
