import React from "react";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../lib/constants";
import { motion } from "framer-motion";

function UniversityBanner() {
  let description =
    "test asxas asjbxasjbx asbxakjsbxasbx ashjbxajshbxasjx asjhbxajshbx asxjahbsxjahsbx asjxhbasjhbx asjhbxajsbx asjxhbas xajshbxasjhx ajshbxajhsbxasjbx ajhsbxjahsbxjasbhx ajshbxajhsbxasjbhx asjhbxjasbxjashbx jahsbxjasbhxas xajhb";

  const [decs, setDesFull] = useState(true);
  return (
    <div className="flex flex-col lg:max-w-[68rem] mx-auto mt-10 lg:mt-20 md:px-4 lg:px-0 md:flex-row md:space-x-10 items-center">
      <div className="w-[18rem] h-[18rem]   md:w-[23rem] relative md:h-[23rem]">
        <Image
          alt=""
          className="rounded-full shadow-lg shadow-gray-400"
          layout="fill"
          objectFit=""
          src="https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        />
      </div>
      <div className="hidden md:inline-block">
        <div className="h-[13rem] border-l border-gray-200"></div>
      </div>
      <div className="ml-0">
        <motion.div
          className="flex flex-col space-y-4 items-center md:items-start md:ml-0 p-6 mt-2 md:mt-0 md:p-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <p className="font-bold text-center md:text-start text-[1.8rem]  capitalize cursor-pointer font-poppins md:text-[2rem] text-black">
              University of Washington, Bothell
            </p>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="flex items-center justify-center md:justify-start space-x-1"
          >
            <MapPinIcon className="h-6 w-6 text-red-700" />
            <p className="text-[1rem] font-poppins font-semibold">
              United States
            </p>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="max-h-[6rem] text-center md:text-start md:w-[40rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem]"
          >
            {description.length > 300 && decs ? (
              <>
                <p className="tracking-wide text-[0.8rem] font-poppins text-gray-700 mr-[0.4rem]">
                  {description.slice(0, 299) + "..."}{" "}
                  <span
                    onClick={() => {
                      setDesFull(false);
                    }}
                    className="text-[0.8rem] text-gray-400 font-bold hover:cursor-pointer"
                  >
                    {"       "}more{" "}
                  </span>
                </p>{" "}
              </>
            ) : (
              <p className="tracking-wide text-[0.8rem] font-poppins text-gray-700 mr-[0.4rem]">
                {description}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default UniversityBanner;
