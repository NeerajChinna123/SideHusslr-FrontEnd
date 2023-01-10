import React from "react";
import Image from "next/image";
import {
  PhoneIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

function Header() {
  return (
    <div className="flex items-center px-[0.8rem] md:px-2">
      <div className="flex-1">
        <div className=" relative h-[5rem] w-[5rem] md:h-[7rem] md:w-[7rem]">
          <Image
            alt=""
            className=""
            layout="fill"
            objectFit="contain"
            src={"/logo.png"}
          />
        </div>
      </div>
      <div className="flex space-x-3 md:space-x-5 text-gray-100 ">
        <motion.div
          whileTap={{ scale: 0.96 }}
          className="flex items-center space-x-2 transition duration-200 ease-in-out hover:text-[#f9004d] cursor-pointer p-2"
        >
          <div>
            <p className="hidden md:block text-semibold tracking-wide text-center">
              Contact Us
            </p>
          </div>
          <PhoneIcon className="md:h-5 md:w-5 h-6 w-6 animate-pulse text-semibold" />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.96 }}
          className="flex items-center tracking-wide space-x-2 bg-black border rounded-lg px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
        >
          <div>
            <p className=" text-center tracking-wider text-white font-semibold">
              Sign In
            </p>
          </div>
          <ArrowRightOnRectangleIcon className="h-6 w-6 animate-pulse text-semibold" />
        </motion.div>
      </div>
    </div>
  );
}

export default Header;
