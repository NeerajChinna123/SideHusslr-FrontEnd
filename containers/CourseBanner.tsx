import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { studentDataType, StudentAssignmentInstructorsType } from "../typings";
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CircularProgress from "../components/CircularProgress";

export interface StudentData {
  data: studentDataType;
  image: string;
}

function CourseBanner(props: StudentData) {
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

  console.log("p-dt : ", props.data);

  const percentage = 20;
  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="flex flex-row space-x-14">
        <div className="relative h-[22rem] w-[20rem] ">
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
        <div className="flex flex-col space-y-3 flex-1">
          <div className="w-[100%]">
            <Balancer className="text-black font-bold font-poppins tracking-wide leading-[6rem] text-[4rem]">
              {props?.data?.Course?.name}
            </Balancer>
          </div>
          <div className="w-[95%] max-h-[8rem] h-[8rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem] ml-2">
            <p className="tracking-wide text-[1rem] font-poppins text-stone-600 pr-[0.8rem]">
              {props?.data?.Course?.description}
            </p>
          </div>
          <div className="flex w-[50%] flex-row pt-2 justify-between">
            <div className="flex flex-col space-y-4 border rounded-2xl justify-center items-center border-gray-200 px-3 py-2">
              <DocumentTextIcon className="text-black font-bold h-6 w-6" />
              <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                <p className="font-semibold text-sm tracking-wide">
                  {assignmentsCount}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 border rounded-2xl justify-center items-center border-gray-200 px-2">
              <ShieldCheckIcon className="text-black font-bold h-6 w-6" />
              <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                <p className="font-semibold text-sm tracking-wide">
                  {assignmentCompleted?.length}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 border rounded-2xl justify-center items-center border-gray-200 px-2">
              <ExclamationCircleIcon className="text-black font-bold h-6 w-6" />
              <div className="bg-gray-100 rounded-xl px-6 w-[100%] py-2">
                <p className="font-semibold text-sm tracking-wide">
                  {assignmentPending?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-[1%]">
          <div className="h-[14rem]  border-l border-gray-200 shadow shadow-gray-200"></div>
        </div>
        <div className="flex items-center">
          <CircularProgress
            size={210}
            strokeWidth={18}
            percentage={30}
            color="red"
          />
        </div>
      </div>
    </div>
  );
}

export default CourseBanner;
