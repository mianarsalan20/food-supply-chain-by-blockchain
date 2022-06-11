import React from "react";
import Profile from "./profile";
import Header from "./Header";

const MainProfile = () => {
  const styles = {
    container: `h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden`,
  };

  return (
    <div className={styles.container}>
      <Header />
      <Profile />
    </div>
  );
};

export default MainProfile;
