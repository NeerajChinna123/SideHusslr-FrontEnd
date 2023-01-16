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
import { useRef } from "react";
import { useRouter } from "next/router";
import { FADE_IN_ANIMATION_SETTINGS } from "../lib/constants";

import LoadingBar from "react-top-loading-bar";
import useScroll from "../lib/hooks/use-scroll";
import { motion, AnimatePresence } from "framer-motion";

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

  const scrolled = useScroll(50);

  return (
    <>
      <div className="flex items-center  px-[0.8rem] md:px-2">
        <LoadingBar height={4} className="bg-red-600" ref={ref} />
        <div className="flex-1">
          <div
            onClick={() => {
              router.push("/");
            }}
            className=" relative cursor-pointer h-[5rem] w-[5rem] md:h-[7rem] md:w-[7rem]"
          >
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
          {status &&
            (status == "unauthenticated" ? (
              <motion.div
                {...FADE_IN_ANIMATION_SETTINGS}
                whileTap={{ scale: 0.96 }}
                className="flex items-center space-x-2 transition-all duration-200 ease-in-out hover:text-[#f9004d] cursor-pointer p-2"
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
                {...FADE_IN_ANIMATION_SETTINGS}
                // whileTap={{ scale: 0.96 }}
                className="flex items-center space-x-2 transition-all duration-200 ease-in-out hover:text-[#f9004d]  p-2"
              >
                <UserCircleIcon className="md:h-5 md:w-5 h-7 w-7 animate-pulse text-semibold" />
                <div>
                  <p className="hidden md:block text-semibold tracking-wide text-center">
                    {session.data[0].first_name}
                  </p>
                </div>
              </motion.div>
            ) : (
              status == "authenticated" && (
                <motion.div
                  {...FADE_IN_ANIMATION_SETTINGS}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    router.push("/redirect");
                  }}
                  className="flex items-center  tracking-wide space-x-2 bg-black border rounded-lg px-2 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition-all duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
                >
                  <div className="py-2">
                    <p className=" text-center tracking-wider text-white font-semibold">
                      Get Started
                    </p>
                  </div>
                  <ArrowRightCircleIcon className="h-6 w-6 animate-pulse text-semibold" />
                </motion.div>
              )
            ))}

          {status &&
            (status == "unauthenticated" ? (
              <motion.div
                {...FADE_IN_ANIMATION_SETTINGS}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  signInFun();
                }}
                className="flex items-center tracking-wide space-x-2 bg-black border rounded-lg px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition-all duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
              >
                <div>
                  <p className=" text-center tracking-wider text-white font-semibold">
                    Sign In
                  </p>
                </div>
                <ArrowRightOnRectangleIcon className="h-6 w-6 animate-pulse text-semibold" />
              </motion.div>
            ) : (
              page != "Banner" && (
                <motion.div
                  {...FADE_IN_ANIMATION_SETTINGS}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    signOutFun();
                  }}
                  className="flex items-center tracking-wide space-x-2 bg-black border rounded-lg px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition-all duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
                >
                  <ArrowLeftOnRectangleIcon className="h-6 w-6 animate-pulse text-semibold" />
                  <div>
                    <p className=" text-center tracking-wider text-white font-semibold">
                      Sign Out
                    </p>
                  </div>
                </motion.div>
              )
            ))}
        </div>
      </div>
      {/* <div
        className={`fixed top-0 w-full ${
          scrolled
            ? " bg-black/70 shadow-sm shadow-red-600 backdrop-blur-xl"
            : "bg-black/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Logo image of a sideHusslr"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>
          <div>
            <AnimatePresence>
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Header;
