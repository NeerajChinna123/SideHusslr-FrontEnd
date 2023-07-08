import { courseAssignmentUsersType } from "../typings";
import Image from "next/image";
import { studentDataType, StudentAssignmentInstructorsType } from "../typings";
import {
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../lib/constants";

interface propsData {
  courseDetails: courseAssignmentUsersType;
  image: string;
}

function UniCourseBanner(props: propsData) {
  const assignmentsCount = props?.courseDetails?.Assignments.length;

  const usersCount = props?.courseDetails?.Users.length;
  return (
    <div className="lg:max-w-[68rem] mx-auto mt-10 lg:mt-14 md:px-4 lg:px-0">
      <div className="flex flex-col md:flex-row ">
        <div className="relative self-center md:self-start h-[22rem] w-[22rem] md:h-[26rem] lg:h-[23rem]">
          <Image
            alt=""
            className="rounded-md shadow-lg shadow-gray-400 "
            layout="fill"
            objectFit="cover"
            src={props?.image}
          />

          <div className="absolute bg-white rounded-2xl shadow-inner text-red-700 text-sm  shadow-black px-3 italic font-ubuntu bottom-3 font-bold py-2 left-3">
            <p>Semester - 1</p>
          </div>
        </div>
        <motion.div
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
          className="flex flex-col lg:h-[25rem] md:h-[28rem] items-center md:items-start space-y-4 pt-6 md:pt-0 md:ml-6  flex-1 lg:ml-16"
        >
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="w-[93%] md:w-[100%] self-center md:self-start md:pl-0"
          >
            <p className="text-black font-bold font-poppins text-center md:text-start tracking-wide leading-[3rem] lg:leading-[4.1rem] text-[3rem] lg:text-[3.4rem]">
              {props?.courseDetails?.name}
            </p>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="lg:w-[95%] w-[90%] max-h-[7rem] pt-2 h-[7rem] md:h-[9rem] md:max-h-[9rem] lg:max-h-[13rem] lg:h-[10rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem] ml-2"
          >
            <p className="tracking-wide text-[0.9rem] lg:text-[1rem] text-center md:text-start font-poppins text-stone-600 pr-[0.8rem]">
              {props?.courseDetails?.description}
            </p>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="hidden lg:flex w-[90%] pt-6 flex-wrap md:w-[50%] self-start ml-5 flex-row lg:pt-2 lg:ml-1 lg:justify-between"
          >
            <div className="flex flex-col space-y-4 border rounded-2xl mr-3 md:mr-0 justify-center items-center border-gray-200 px-2 md:px-3 py-2">
              <DocumentTextIcon className="text-black font-bold h-6 w-6" />
              <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                <p className="font-semibold text-sm tracking-wide">
                  {assignmentsCount}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 border rounded-2xl justify-center items-center border-gray-200 px-2 md:px-3 py-2">
              <UserIcon className="text-black font-bold h-6 w-6" />
              <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                <p className="font-semibold text-sm tracking-wide">
                  {usersCount}
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-3 md:mt-0 space-y-4 border rounded-2xl mr-3 md:mr-0 justify-center items-center border-gray-200 px-2 md:px-3 py-2">
              <CalendarIcon className="text-black font-bold h-6 w-6" />
              <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                <p className="font-semibold text-sm tracking-wide">
                  {props?.courseDetails?.duration}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="flex flex-row px-5 md:px-2 lg:hidden"
          >
            <div className="flex  md:pt-3 pt-1 flex-wrap space-x-3   flex-row">
              <div className="flex flex-col space-y-4 border rounded-2xl  justify-center items-center border-gray-200 px-2 lg:px-3 lg-2">
                <DocumentTextIcon className="text-black font-bold h-6 w-6" />
                <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                  <p className="font-semibold text-sm tracking-wide">
                    {assignmentsCount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 border rounded-2xl justify-center items-center border-gray-200 px-2 lg:px-3 py-2">
                <UserIcon className="text-black  font-bold h-6 w-6" />
                <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                  <p className="font-semibold text-sm tracking-wide">
                    {usersCount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:mt-0 space-y-4 border rounded-2xl  justify-center items-center border-gray-200 px-2 lg:px-3 py-2">
                <CalendarIcon className="text-black  font-bold h-6 w-6" />
                <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                  <p className="font-semibold text-sm tracking-wide">
                    {props?.courseDetails?.duration}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="w-[70rem] border-b border-gray-300"></div>
      </div>
    </div>
  );
}

export default UniCourseBanner;
