import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  useProgram,
  useClaimNFT,
  useNFTs,
  dropTotalClaimedSupplyQuery,
} from "@thirdweb-dev/react/solana";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@project-serum/anchor";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Home = () => {
  const wallet = useWallet();
  const { program } = useProgram(
    "5njTCbuCaZatcuJD2KWb8CS6K8KD98bqeWwYgtZvCuAy",
    "nft-drop"
  );

  const [supplyNFT, setSupply] = useState(0);
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
  const { data: metadata, isLoading: loading } = useNFTs(program);

  async function getClaimed() {
    const supply = await program?.totalClaimedSupply();
    setSupply(supply);
  }
  getClaimed();

  console.log(metadata, "metadata");
  const nft = metadata?.filter((nft) => nft.metadata.name === "Makto #10");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nftContainer}>
          <h2>Mintea tu Makto!</h2>
          <div className={styles.nftCard}>
            <h3>Random Makto!</h3>

            {nft?.map((nft) => (
              <div key={nft.metadata.id} className={styles.nft}>
                <img
                  src={"/assets/Makto.gif"}
                  className={styles.nftImage}
                  style={{
                    objectFit: "contain",
                    borderRadius: "15px",
                  }}
                  alt="nft image"
                />
              </div>
            ))}

            <div className={styles.mainHead}>
              <div className={styles.header}>
                <h4 className={styles.texts}>Minted</h4>
                <h5 className={styles.outp}>{supplyNFT}</h5>
              </div>
              <div className={styles.header}>
                <h4 className={styles.texts}>Price</h4>

                <h5 className={styles.outp}>1 SOL</h5>
              </div>
            </div>
            <WalletMultiButtonDynamic />
            <br />
            {wallet.connected ? (
              <button
                className={styles.btnClaim}
                onClick={() => claim({ amount: 1 })}
              >
                MINT(1 SOL)
              </button>
            ) : (
              <button
                className={styles.btnClaim}
                onClick={() => claim({ amount: 1 })}
              >
                NFT Club Maktub
              </button>
            )}
          </div>
        </div>
        <footer className={styles.footer}>
          <a
            className={styles.Links}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
          </a>
          <a
            className={styles.Links}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultor??a MKB
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
