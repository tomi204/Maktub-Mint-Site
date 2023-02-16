import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useProgram, useClaimNFT } from "@thirdweb-dev/react/solana";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Home = () => {
  const { program } = useProgram(
    "4Rhgk4qy53uTavYFMupgHUfsRbm5gGVpcqJBvwn7cCEZ",
    "nft-drop"
  );
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            src="/thirdweb.svg"
            height={75}
            width={115}
            style={{
              objectFit: "contain",
            }}
            alt="thirdweb"
          />
          <Image
            width={75}
            height={75}
            src="/sol.png"
            className={styles.icon}
            alt="sol"
          />
        </div>
        <h1 className={styles.h1}>Solana, meet thirdweb 👋</h1>
        <p className={styles.explain}>
          Explore what you can do with thirdweb&rsquo;s brand new{" "}
          <b>
            <a
              href="https://portal.thirdweb.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana SDK
            </a>
          </b>
          .
        </p>
        <button onClick={() => claim({ amount: 1 })}>Claim NFT </button>

        <WalletMultiButtonDynamic />
      </div>
    </>
  );
};

export default Home;
