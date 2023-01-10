import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/lottie-animation.json";
import { SocialIcon } from "react-social-icons";
import styles from "../styles/Home.module.css";
import Banner from "../containers/Banner";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="manifest.json" />
        <title>Side Husslr</title>
        <meta
          name="description"
          content="Trydo – Multipurpose React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Trydo React Template will create that various landing Template, Creative Agency, And Corporate Website ."
          data-react-helmet="true"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="scroll-smooth">
        <div className="h-screen">
          <div className="bg-gradient-to-br pb-14 from-black via-black  to-[#85002a] ">
            <div className="max-w-7xl mx-auto">
              <Banner />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
