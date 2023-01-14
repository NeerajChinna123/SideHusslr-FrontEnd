import React, { useState } from "react";
import Header from "../components/Header";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/Roatating _Planet.json";

function Banner() {
  const text = "Expert Educational Consultants Providing Quality ";
  const [text2] = useTypewriter({
    words: ["Assignments", "Projects", "and more .."],
    loop: false,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 1000,
  });
  return (
    <div>
      <div className="pt-4 md:pt-6">
        <Header page="Banner" />
      </div>
      <div
        className="flex mt-10  md:mt-12 px-[1.2rem] md:px-6"
      >
        <div className="flex flex-col space-y-10">
          <div className="text-white text-center md:text-start text-[2.8rem] md:text-[4rem] leading-[4.4rem] md:leading-[5.4rem] font-[800] md:font-[900] font-poppins tracking-wide capitalize">
            <span className="md:mr-20">
              {text} 
            </span>
            <span className="text-red-600 font-[800] transition duration-100 ease-in-out ">{text2}</span>
            <Cursor cursorColor="red" />
          </div>
          <div className="">
            <p className="text-[0.8rem] text-center md:text-start md:text-[1rem] leading-6 md:leading-8 tracking-wide text-gray-300 font-base font-poppins">
              At SideHusslr, we are dedicated to helping students succeed in
              their academic pursuits. Our team of highly qualified and
              experienced consultants is here to provide personalized support
              and guidance on a wide range of educational projects, including
              assignments and many more. Contact us today to learn more about
              how we can support your learning journey.
            </p>
          </div>
          <div className="justify-center flex md:justify-start">
            <motion.a
              href="#aboutUs"
              whileTap={{ scale: 0.96 }}
              className="w-44 group  tracking-wide hover:bg-gray-300 rounded-md px-1 md:px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-600  transition duration-300 ease-in-out  bg-[#f9004d] text-white hover:text-[#f9004d] "
            >
              <div className="py-2 md:py-4">
                <p className="transition uppercase duration-100 ease-in-out  text-center group-hover:font-bold tracking-wider font-semibold ">
                  About Us
                </p>
              </div>
            </motion.a>
          </div>
        </div>
        <motion.div className="hidden lg:block ">
          <Lottie
            loop
            animationData={animationData}
            play
            className="w-[655px] h-[500px]  mr-[-5rem] "
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Banner;
