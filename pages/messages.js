import Sidebar from "../components/Sidebar";
import SignIn from "../components/signin";
import { useMoralis } from "react-moralis";
import Messages from "../components/Messages";
import Header from "../components/Header";

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
  main: `w-full h-full flex flex-col mt-[50px]`,
  tableContainer: `w-full h-full flex flex-col p-[100px] justify-center`,
};

export default function profile() {
  const { isAuthenticated } = useMoralis();
  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.main}>
            <Header />
            <div className={styles.tableContainer}>
              <Messages />
            </div>
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
