import styled from "styled-components";
import Image from "next/image";
import React, { useEffect } from "react";
import Router from "next/router";
import chainImg from "../public/images/foodsupply.png";
import { useMoralis } from "react-moralis";

export default function SignIn() {
  const styles = {
    container: `h-full w-full flex bg-[#fff] pt-40 justify-center`,
    card: `shadow-lg rounded-lg w-1.5/4 pt-8 `,
    itemImage: `flex justify-center`,
    infoSection: `flex-row justify-center`,
    buttonSection: `flex justify-center pb-8 pl-8`,
    title: `pt-6 pb-4 text-center text-3xl`,
    subTitle: `pb-6 text-center text-xl`,
    a: `no-underline text-white`,
    button: `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `,
  };

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const login = async () => {
    await authenticate();
    if (isAuthenticated) {
      if (user.attributes.check == "1") {
        Router.push("/editProfile");
      } else {
        Router.push("/start");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.itemImage}>
          <Image src={chainImg} border-radius="1rem" width="250" height="280" />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.title}>Welcome to Food Supplychain</div>
          <div className={styles.subTitle}>
            Supplychain using Ethereum smart contract, web3 and many more.
          </div>
        </div>
        <div className={styles.buttonSection}>
          <button className={styles.button}>
            <a className={styles.a} href="https://metamask.io/">
              Get Metamask
            </a>
          </button>
          <button className={styles.button} onClick={login}>
            Connect to Metamask
          </button>
        </div>
      </div>
    </div>
  );
}
