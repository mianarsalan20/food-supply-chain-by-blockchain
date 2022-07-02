import React, { useContext } from "react";
import logo from "../public/images/logos.png";
import logoFull from "../public/images/logo.png";
import Image from "next/image";
import { MdMessage } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { AmazonContext } from "../context/AmazonContext";
import { ConnectButton } from "web3uikit";
import { AiOutlineHistory } from "react-icons/ai";
import Link from "next/link";

const Sidebar = () => {
  const styles = {
    container: `h-full w-[300px] flex flex-col bg-[#fff] static`,
    profile: ` w-full py-16 flex flex-col justify-center items-center rounded-r-3xl bg-gradient-to-t from-[#0d141c] to-[#42667e] mt-[40px] mb-[50px] border-2 border-[#fb9701]`,
    profilePicContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
    profilePic: `rounded-full object-cover`,
    welcome: ` text-md mb-2 font-bold text-2xl text-white text-center`,
    walletAddress: `text-xl flex w-full justify-center font-extrabold mb-4`,
    menu: `flex flex-col w-full h-full px-10 gap-10`,
    menuItem: `flex items-center text-lg font-bold cursor-pointer gap-2`,
    amazonLogo: `mr-4 flex object-cover`,
    companyName: `text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]`,
    usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
    username: `flex items-center w-full justify-center`,
    setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
  };

  const {
    isAuthenticated,
    user,
    buyTokens,
    getBalance,
    nickname,
    setNickname,
    username,
    handleSetUsername,
  } = useContext(AmazonContext);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        {isAuthenticated && (
          <>
            <div className={styles.profilePicContainer}>
              <img
                src={user.attributes.profileImg}
                alt="profile"
                className={styles.profilePic}
                height={100}
                width={100}
              />
            </div>
            <div>
              <div className={styles.welcome}>{user.attributes.name}</div>
              <div className={styles.welcome}>{user.attributes.selectRole}</div>
            </div>
          </>
        )}
      </div>
      <div className={styles.menu}>
        <Link href="/start">
          <div className={styles.menuItem}>
            <Image
              src={logo}
              height={30}
              width={30}
              className={styles.amazonLogo}
            />
            My Supply Chain
            <br /> Board
          </div>
        </Link>

        <Link href="/profile">
          <div className={styles.menuItem}>
            <BsFillPersonFill />
            Profile
          </div>
        </Link>
        <Link href="/messages">
          <div className={styles.menuItem}>
            <MdMessage />
            Messages
          </div>
        </Link>
        <Link href="/history">
          <div className={styles.menuItem}>
            <AiOutlineHistory />
            Transaction History
          </div>
        </Link>
      </div>
      <div className={styles.companyName}></div>
    </div>
  );
};

export default Sidebar;
