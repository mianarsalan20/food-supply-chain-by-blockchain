import MainProfile from "../components/MainProfile";
import Sidebar from "../components/Sidebar";
import SignIn from "../components/signin";
import { useMoralis } from "react-moralis";

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
};

export default function profile() {
  const { isAuthenticated } = useMoralis();
  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.container}>
          <Sidebar />
          <MainProfile />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
