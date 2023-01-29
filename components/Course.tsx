import { studentDataType, StudentAssignmentInstructorsType } from "../typings";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { useState, useRef, useEffect } from "react";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export interface StudentData {
  data: studentDataType;
  image: string;
}

function Course(props: StudentData) {
  const [decs, setDesFull] = useState(true);

  const router = useRouter();

  const assignmentsCount = props?.data?.StudentAssignmentInstructors.length;

  const assignmentCompleted = props?.data?.StudentAssignmentInstructors?.filter(
    (assign: StudentAssignmentInstructorsType) =>
      assign?.assignment_status == "COMPLETED"
  );

  console.log("comp : ", assignmentCompleted);

  const assignmentPending = props?.data?.StudentAssignmentInstructors?.filter(
    (assign: StudentAssignmentInstructorsType) =>
      assign?.assignment_status == "OPEN"
  );

  const completedPercent =
    (assignmentCompleted.length / assignmentsCount) * 100;

  // const completedPercent = 50;

  function useIsVisible(ref: any) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );

      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);

    return isIntersecting;
  }

  const [completedPercentWidth, setCompletedPercentWidth] = useState(0);
  const completedPerRef = useRef(null);
  const isVisibleCompletedPerRef = useIsVisible(completedPerRef);

  useEffect(() => {
    if (!isVisibleCompletedPerRef) {
      setTimeout(() => {
        setCompletedPercentWidth(0);
      }, 100);
    }
    if (isVisibleCompletedPerRef) {
      setTimeout(() => {
        setCompletedPercentWidth(completedPercent);
      }, 100);
    }
  }, [isVisibleCompletedPerRef]);

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
      onClick={() => {
        router.push(`/course/${props?.data?.student_course_id}`);
      }}
    >
      <motion.div className="bg-white md:h-[35rem] md:max-h-[35rem] shadow-lg shadow-gray-300 px-[1.1rem] py-6 group flex flex-col rounded-2xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-200">
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
              {props?.data?.Course?.name.length > 20 && decs ? (
                <>
                  <p className="text-black font-bold font-poppins tracking-wide text-xl">
                    {props?.data?.Course?.name.slice(0, 19) + " ..."}{" "}
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
                  {props?.data?.Course?.name}
                </p>
              )}
            </div>
            <div className="md:max-h-[4.1rem] mt-2 max-h-[5.8rem] md:h-[4.1rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem]">
              {props?.data?.Course?.description.length > 97 && decs ? (
                <>
                  <p className="tracking-wide text-[0.9rem] font-poppins text-stone-600 pr-[0.4rem]">
                    {props?.data?.Course?.description.slice(0, 96) + " ..."}{" "}
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
                  {props?.data?.Course?.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between pt-6">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-5 py-[0.4rem] border-gray-300 border">
              <DocumentTextIcon className="h-6 w-6 font-bold text-black" />
              <p className="font-semibold text-md  tracking-wide">
                {assignmentsCount}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-5 py-[0.4rem] border-gray-300 border">
              <ShieldCheckIcon className="h-6 w-6 font-bold text-black" />
              <p className="font-semibold text-md  tracking-wide">
                {assignmentCompleted?.length}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-5 py-[0.4rem] border-gray-300 border">
              <ExclamationCircleIcon className="h-6 w-6 font-bold text-black" />
              <p className="font-semibold text-md tracking-wide">
                {assignmentPending?.length}
              </p>
            </div>
          </div>
          <div className=" mt-6">
            <div
              className={`h-[0.7rem] md:h-[0.8rem] rounded-full flex bg-[#e7e7e7]`}
            >
              <div
                style={{
                  width: `${completedPercentWidth}%`,
                }}
                className={`bg-gradient-to-r from-red-600 rounded-md transition-all ease-out duration-1000 via-red-400 to-red-300`}
              />
            </div>

            <div className="flex px-[0.1rem] text-md  mt-3 text-poppins font-semibold">
              <div ref={completedPerRef} className="flex-1">
                Completed
              </div>
              <p className="">{completedPercent} %</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Course;
