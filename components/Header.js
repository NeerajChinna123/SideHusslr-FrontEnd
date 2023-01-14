import React from "react";
import Image from "next/image";
import {
  PhoneIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  
} from "@heroicons/react/24/solid";
import {
  UserCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import LoadingBar from "react-top-loading-bar";

import { motion } from "framer-motion";

function Header({ page }) {
  const { data: session, status } = useSession();

  const router = useRouter();

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const ref = useRef();

  function signInFun() {
    ref.current.continuousStart();

    delay(300).then(() => {
      ref.current.complete();
      signIn();
    });
  }

  function signOutFun() {
    ref.current.continuousStart();

    delay(300).then(() => {
      ref.current.complete();
      signOut();
    });
  }

  return (
    <div className="flex items-center px-[0.8rem] md:px-2">
      <LoadingBar height={4} className="bg-red-600" ref={ref} />
      <div className="flex-1">
        <div onClick={()=>{router.push('/')}} className=" relative cursor-pointer h-[5rem] w-[5rem] md:h-[7rem] md:w-[7rem]">
          <Image
            alt=""
            className=""
            layout="fill"
            objectFit="contain"
            src={"/logo.png"}
          />
        </div>
      </div>
      <div className="flex space-x-3 md:space-x-5 text-gray-100">
        {status != "authenticated" ? (
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
        ) : page != "Banner" ? (
          <motion.div
            // whileTap={{ scale: 0.96 }}
            className="flex items-center space-x-2 transition duration-200 ease-in-out hover:text-[#f9004d]  p-2"
          >
            <UserCircleIcon className="md:h-5 md:w-5 h-7 w-7 animate-pulse text-semibold" />
            <div>
              <p className="hidden md:block text-semibold tracking-wide text-center">
                {session.data[0].first_name}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={()=>{router.push('/redirect')}}
            className="flex items-center  tracking-wide space-x-2 bg-black border rounded-lg px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
          >
            <div className="py-2">
              <p className=" text-center tracking-wider text-white font-semibold">
                Get Started
              </p>
            </div>
            <ArrowRightCircleIcon className="h-6 w-6 animate-pulse text-semibold" />
          </motion.div>
        )}

        {status != "authenticated" ? (
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              signInFun();
            }}
            className="flex items-center tracking-wide space-x-2 bg-black border rounded-lg px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
          >
            <div>
              <p className=" text-center tracking-wider text-white font-semibold">
                Sign In
              </p>
            </div>
            <ArrowRightOnRectangleIcon className="h-6 w-6 animate-pulse text-semibold" />
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              signOutFun();
            }}
            className="flex items-center tracking-wide space-x-2 bg-black border rounded-lg px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 animate-pulse text-semibold" />
            <div>
              <p className=" text-center tracking-wider text-white font-semibold">
                Sign Out
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Header;
