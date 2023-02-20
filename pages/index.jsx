import dynamic from "next/dynamic";
import Image from "next/image";
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
    "4Rhgk4qy53uTavYFMupgHUfsRbm5gGVpcqJBvwn7cCEZ",
    "nft-drop"
  );
  const [supplyNFT, setSupply] = useState(0);
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
  const { data: metadata, isLoading: loading } = useNFTs(program);
  async function getClaimed() {
    const supply = await program?.totalClaimedSupply();
    setSupply(supply);
  }
  useEffect(() => {
    getClaimed();
  }, []);
  console.log(metadata, "metadata");
  const nft = metadata?.filter(
    (nft) => nft.metadata.name === "NFT Asset Name #7"
  );

  return (
    <>
      <div className={styles.container}>
        <navbar className={styles.navbar}>
          <WalletMultiButtonDynamic />
        </navbar>

        <div className={styles.nftContainer}>
          <h2>Mintea tu Makto!</h2>
          <div className={styles.nftCard}>
            <h3>Random Makto!</h3>

            {nft?.map((nft) => (
              <div key={nft.metadata.id} className={styles.nft}>
                <img
                  src={
                    "https://i.picasion.com/pic92/29ab6907a2e49baf9ee00a649e6d3f04.gif"
                  }
                  className={styles.nftImage}
                  style={{
                    objectFit: "contain",
                    borderRadius: "15px",
                  }}
                  alt="nft"
                />
              </div>
            ))}
            {wallet.connected ? (
              <button
                className={styles.btnClaim}
                onClick={() => claim({ amount: 1 })}
              >
                Mint
              </button>
            ) : (
              <button
                className={styles.btnClaim}
                onClick={() => claim({ amount: 1 })}
              >
                Connect your wallet
              </button>
            )}
            <div className={styles.mainHead}>
              <div className={styles.header}>
                <h4 className={styles.texts}>Minted</h4>
                {supplyNFT > 0 ? (
                  <h5 className={styles.outp}>{supplyNFT}</h5>
                ) : (
                  <h5 className={styles.outp}>{supplyNFT + 0}</h5>
                )}
              </div>
              <div className={styles.header}>
                <h4 className={styles.texts}>Price</h4>

                <h5 className={styles.outp}>1 SOL</h5>
              </div>
            </div>
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
            NFT LAB CLUB
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
