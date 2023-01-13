import Head from "next/head";

import Banner from "../containers/Banner";
import AboutUs from "../containers/AboutUs";
import Services from "../containers/Services";
import PartneredUniversities from "../containers/PartneredUniversities";
import Footer from "../containers/Footer";
import { useEffect, useState } from "react";

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

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="scroll-smooth scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
        <div className="h-screen">
          <div className="bg-gradient-to-br pb-14 md:pb-16 from-black via-black  to-[#85002a] ">
            <div className="max-w-[82rem] mx-auto">
              <Banner />
            </div>
          </div>
          <div className="max-w-[82rem] mx-auto px-[1.2rem] md:px-6">
            <AboutUs />
            <Services />
            <PartneredUniversities />
          </div>
          <div className="bg-gradient-to-br mt-8 from-black via-black  to-[#85002a] ">
            <div className="max-w-[82rem] mx-auto">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
