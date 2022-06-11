import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { AmazonProvider } from "../context/AmazonContext";
import { ModalProvider } from "react-simple-hook-modal";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://aak9k46wti6v.usemoralis.com:2053/server"
      appId="SXirNpIMaoPkDdMIt9mmycKDFQe52VwNBzkJpd37"
    >
      <AmazonProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </AmazonProvider>
    </MoralisProvider>
  );
}

export default MyApp;
