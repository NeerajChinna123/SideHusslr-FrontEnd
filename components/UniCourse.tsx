import { courseAssignmentUsersType } from "../typings";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { useState, useRef, useEffect } from "react";
import {
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export interface StudentData {
  data: courseAssignmentUsersType;
  image: string;
}

function UniCourse(props: StudentData) {
  const [decs, setDesFull] = useState(true);

  const router = useRouter();

  const assignmentsCount = props?.data?.Assignments.length;

  const usersCount = props?.data?.Users.length;

  const scaleVariants = {
    whileInView: {
      y: [100, 50, 0],
      opacity: [0, 0, 1],
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      //   onClick={() => {
      //     router.push(`/course/${props?.data?.student_course_id}`);
      //   }}
    >
      <motion.div className="bg-white md:h-[30rem] md:max-h-[30rem] shadow-lg shadow-gray-300 px-[1.1rem] py-6 group flex flex-col rounded-2xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-200">
        <div className="relative w-full h-64 md:h-64 ">
          <Image
            alt=""
            className="rounded-2xl "
            layout="fill"
            objectFit="cover"
            src={props?.image}
          />

          <div className="absolute bg-white rounded-2xl shadow-inner text-red-700 text-sm  shadow-black px-3 italic font-ubuntu bottom-3 font-bold py-2 left-3">
            <p>Semester - 1</p>
          </div>
        </div>
        <div className="px-3 mt-4">
          <div className=" md:h-[3rem">
            <div>
              {props?.data?.name.length > 20 && decs ? (
                <>
                  <p className="text-black font-bold font-poppins tracking-wide text-xl">
                    {props?.data?.name?.slice(0, 19) + " ..."}{" "}
                    {/* <span
                      onClick={() => {
                        setDesFull(false);
                      }}
                      className="text-[0.9rem] text-gray-600 font-bold hover:cursor-pointer"
                    >
                      {"       "}more{" "}
                    </span> */}
                  </p>{" "}
                </>
              ) : (
                <p className="text-black font-bold font-poppins tracking-wide text-xl">
                  {props?.data?.name}
                </p>
              )}
            </div>
            <div className="md:max-h-[4.1rem] mt-2 max-h-[5.8rem] md:h-[4.1rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem]">
              {props?.data?.description.length > 97 && decs ? (
                <>
                  <p className="tracking-wide text-[0.9rem] font-poppins text-stone-600 pr-[0.4rem]">
                    {props?.data?.description.slice(0, 96) + " ..."}{" "}
                    {/* <span
                      onClick={() => {
                        setDesFull(false);
                      }}
                      className="text-[0.9rem] text-gray-600 font-bold hover:cursor-pointer"
                    >
                      {"       "}more{" "}
                    </span> */}
                  </p>{" "}
                </>
              ) : (
                <p className="tracking-wide text-[0.9rem] font-poppins text-gray-700 pr-[0.4rem]">
                  {props?.data?.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap md:space-x-0 md:justify-between pt-6">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-[0.4rem] border-gray-300 border">
              <DocumentTextIcon className="h-6 w-6 font-bold text-black" />
              <p className="font-semibold text-md  tracking-wide">
                {assignmentsCount}
              </p>
            </div>

            <div className="flex items-center ml-10 md:ml-0  space-x-2 bg-gray-100 rounded-full px-4 py-[0.4rem] border-gray-300 border">
              <UserIcon className="h-6 w-6 font-bold text-black" />
              <p className="font-semibold text-md tracking-wide">
                {usersCount}
              </p>
            </div>

            <div className="flex items-center mt-6 md:mt-0 space-x-2 bg-gray-100 rounded-full px-4 py-[0.4rem] border-gray-300 border">
              <CalendarIcon className="h-6 w-6 font-bold text-black" />
              <p className="font-semibold text-md tracking-wide">
                {props?.data?.duration}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UniCourse;
