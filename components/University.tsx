import { universityDataType } from "../typings";
import { useState } from "react";

import {
  MapPinIcon,
  CalendarIcon,
  ArrowsPointingOutIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import useWindowSize from "../lib/hooks/use-window-size";

export interface UniversityData {
  data: universityDataType;
}

function University(props: UniversityData) {
  const [decs, setDesFull] = useState(true);
  const { isMobile, isDesktop } = useWindowSize();
  const date1 = new Date(props?.data?.createdAt);
  //   const date2 = Math.round(date1.getTime());
  //   const date3 = Date.now();

  //   const diffTime = date3 - date2;
  //   const diffDays = diffTime / (1000 * 60 * 60 * 24);

  //   const diffD = Math.round(diffDays);
  return (
    <div className="px-4 py-8 relative  border-[0.05rem] rounded-sm shadow-md shadow-gray-300 border-gray-300">
      {/* {isDesktop && (
        <div className="absolute right-3 top-4">
          <motion.div
            whileTap={{ scale: 0.96 }}
            className="font-ubuntu group  font-semibold  text-sm flex items-center tracking-wide space-x-2 rounded-full px-4  cursor-pointer justify-center transition-all duration-300 ease-in-out border-solid  bg-red-500 text-white py-[0.7rem]"
          >
            <p className="animate-pulse transition-transform duration-300 ease-in-out group-hover:scale-105">
              View Details
            </p>
          </motion.div>
        </div>
      )}
      {isMobile && (
        <div className="absolute right-4 top-4 ">
          <motion.div whileTap={{ scale: 0.96 }}>
            <ArrowsPointingOutIcon className="h-6 w-6 text-red-600 animate-pulse" />
          </motion.div>
        </div>
      )} */}
      <div className="flex flex-row">
        {props.data.image ? (
          <div className=" relative self-center">
            <img alt="" className="object-contain  h-[5rem] w-[5rem] md:h-[6rem] md:w-[6rem]" src={props.data.image} />
          </div>
        ) : (
          <BuildingLibraryIcon className="h-[5rem] w-[5rem] text-red-600 md:h-[6rem] md:w-[6rem]" />
        )}
        <div className="border-l self-center h-[6rem] ml-2 border-solid border-gray-200" />
        <div  className="ml-5 mt-1 md:mt-0 w-[95%] space-y-2">
          <p onClick={()=>console.log('ok')} className="font-semibold capitalize cursor-pointer hover:underline font-poppins text-[1.5rem] text-black hover:text-red-600">
            {props?.data?.name}
          </p>
          {/* <p className="tracking-wide text-sm font-poppins text-gray-700">
            {props?.data?.description}
          </p> */}
          <div className="ml-[-0.1rem] flex space-x-3">
            <div className="flex items-center space-x-1 ">
              <MapPinIcon className="h-4 w-4 text-red-700" />
              <p className="text-[0.8rem] font-poppins font-semibold">
                {props?.data?.country}
              </p>
            </div>
            <div className="flex items-center space-x-1 ">
              <CalendarIcon className="h-4 w-4 text-red-700" />
              <p className="text-[0.8rem] font-poppins font-semibold">
                {date1.toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
          <div className="max-h-[6rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem]">
            {props?.data?.description.length > 300 && decs ? (
              <>
                <p className="tracking-wide text-[0.8rem] font-poppins text-gray-700 mr-[0.4rem]">
                  {props?.data?.description.slice(0, 299) + "..."}{" "}
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
                {props?.data?.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default University;
