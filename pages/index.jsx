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
  console.log(nft, "nfttt");
  return (
    <>
      <div className={styles.container}>
        <navbar className={styles.navbar}>
          <WalletMultiButtonDynamic />
        </navbar>
        <div className={styles.iconContainer}>
          <Image
            width={75}
            height={75}
            src="/sol.png"
            className={styles.icon}
            alt="sol"
          />
        </div>

        <div className={styles.nftContainer}>
          {nft?.map((nft) => (
            <div key={nft.metadata.id} className={styles.nftCard}>
              <MediaRenderer
                src={nft.metadata.image}
                className={styles.nftImage}
                style={{
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
                alt="nft"
              />
            </div>
          ))}
          <button
            className={styles.btnClaim}
            onClick={() => claim({ amount: 1 })}
          >
            Claim NFT
          </button>
        </div>

        <footer className={styles.footer}>
          <a
            className={styles.Links}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by NFTLAB
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
