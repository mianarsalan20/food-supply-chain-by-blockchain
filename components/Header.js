import React, { useContext } from "react";
import { CgMenuGridO } from "react-icons/cg";
import logo from "../public/images/fsc-logo.png";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { AmazonContext } from "../context/AmazonContext";
import { FaCoins } from "react-icons/fa";
import Link from "next/link";
import {
  ModalProvider,
  Modal,
  useModal,
  ModalTransition,
} from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
import BuyModal from "./BuyModal";

const Header = () => {
  const styles = {
    container: `h-[60px] w-full flex items-center gap-5 px-16`,
    logo: `flex items-center ml-[20px] cursor-pointer flex-1`,
    search: `p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex flex items-center border border-black`,
    searchInput: `bg-transparent focus:outline-none border-none flex-1 items-center flex`,
    menu: `flex items-center gap-6`,
    menuItem: `flex items-center text-md font-bold cursor-pointer`,
    coins: `ml-[10px]`,
  };

  const { balance, buyTokens, getBalance, logout, user, setSearch } =
    useContext(AmazonContext);
  const { openModal, isModalOpen, closeModal } = useModal();
  return (
    <ModalProvider>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="FSC"
            height={100}
            width={150}
            className="object-cover"
          />
        </div>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search Your Assets..."
            className={styles.searchInput}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <IoMdSearch fontSize={20} />
        </div>
        <div className={styles.menu}>
          <Link href="/addAssets">
            <div className={styles.menuItem}>Add Assets</div>
          </Link>
          <a onClick={logout}>
            <a href="/" className={styles.menuItem}>
              LogOut
            </a>
          </a>
          {balance ? (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              {balance} Rs
              <FaCoins className={styles.coins} />
              <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                <BuyModal close={closeModal} buyTokens={buyTokens} />
              </Modal>
            </div>
          ) : (
            <div
              className={(styles.balance, styles.menuItem)}
              onClick={openModal}
            >
              0 Rs <FaCoins className={styles.coins} />
              <Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
                <BuyModal close={closeModal} buyTokens={buyTokens} />
              </Modal>
            </div>
          )}
          <CgMenuGridO fontSize={30} className={styles.menuItem} />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Header;
