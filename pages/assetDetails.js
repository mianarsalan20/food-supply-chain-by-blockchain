import MainAssetDetails from "../components/MainAssetDetails";
import Sidebar from "../components/Sidebar";
import { useMoralis } from "react-moralis";
import Home from ".";

const styles = {
  container: `h-full w-full flex bg-[#fff]`,
};

export default function assetDetails() {
  const { isAuthenticated } = useMoralis();
  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.container}>
          <Sidebar />
          <MainAssetDetails />
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}
