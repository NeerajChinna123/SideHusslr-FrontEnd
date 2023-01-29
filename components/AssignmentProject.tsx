import { StudentAssignmentInstructorsType } from "../typings";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

export interface AssignmentProjectData {
  data: StudentAssignmentInstructorsType;
}

function AssignmentProject(props: AssignmentProjectData) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  var dueDate = null;

  if (props?.data?.Assignment?.end_date) {
    dueDate = new Date(props?.data?.Assignment?.end_date);
  }

  const today = new Date();

  //@ts-ignore

  var diffDays = 0;

  if (dueDate) {
    if (dueDate > today) {
      //@ts-ignore
      const diffTime = Math.abs(dueDate - today);
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  var status = 0;

  var assignmentStatusString = props?.data?.assignment_status;

  if (assignmentStatusString == "IN-PROGRESS") {
    status = 2;
  } else if (assignmentStatusString == "COMPLETED") {
    status = 3;
  } else if (assignmentStatusString == "IN-REVIEW") {
    status = 4;
  } else if (assignmentStatusString == "DELIVERED") {
    status = 5;
  } else {
    status = 1;
  }

  var AssignmentCompletionPer = (status / 5) * 100;

  console.log("op : ", isOpen);

  return (
    <motion.div layout className="py-6">
      <motion.div layout className=" px-2 flex justify-between flex-row">
        <motion.div layout className="flex flex-col space-y-3 w-[28%]">
          <motion.div layout>
            <p className="font-bold font-poppins tracking-wide text-4xl">
              {props?.data?.Assignment?.name}
            </p>
          </motion.div>
          <motion.div
            layout
            className="max-h-[7rem] overflow-y-scroll pr-1 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem]"
          >
            <p className="font-poppins tracking-wide text-[0.9rem] text-gray-600">
              {props?.data?.Assignment?.description}
            </p>
          </motion.div>
          <motion.div layout className="flex flex-row space-x-2">
            <p className="font-poppins font-semibold tracking-wide text-[0.9rem] text-gray-600">
              Type :{" "}
            </p>
            <p className="font-poppins tracking-wide text-[0.9rem] text-gray-600">
              Assignment
            </p>
          </motion.div>
        </motion.div>

        <motion.div layout className="flex flex-col space-y-3 mt-4">
          <p className="font-bold font-poppins text-2xl text-gray-700">
            Complete
          </p>
          <p className="font-bold font-poppins text-5xl text-black">
            {AssignmentCompletionPer}%
          </p>
          <motion.div
            className={`h-[0.7rem] md:h-[0.6rem] mt-1 w-[14rem] rounded-full flex bg-[#e7e7e7]`}
          >
            <motion.div
              layout
              style={{
                width: `${AssignmentCompletionPer}%`,
              }}
              className={`bg-gradient-to-r from-red-600 rounded-md transition-all ease-out duration-1000 via-red-400 to-red-300`}
            />
          </motion.div>
        </motion.div>

        <motion.div layout className="flex flex-col space-y-4 mt-4">
          <p className="font-bold font-poppins  text-2xl text-gray-700">
            Expected Completion
          </p>
          <p className="font-bold font-poppins  text-xl text-gray-700 self-end">
            {dueDate && dueDate.toDateString()}
          </p>
          <p className="font-bold font-poppins  text-lg text-gray-700 self-end">
            {diffDays > 0 ? (
              `${diffDays} days left`
            ) : (
              <span className="text-red-600">Deadline Passed</span>
            )}
          </p>
        </motion.div>
      </motion.div>

      <motion.div layout>
        <AnimatePresence>
          {isOpen && (
            <motion.div className="mt-10 mb-20">
              <div className="w-11/12 lg:w-5/6 mx-auto pt-4">
                <div className="bg-gray-300 dark:bg-gray-800 h-1 flex items-center justify-between">
                  <div className={status>1 ? `w-1/3 bg-red-600 h-1 flex items-center ` : ` w-1/3 bg-gray-300 h-1 flex items-center `}>
                    <div className="bg-red-600 h-10 w-10 rounded-full shadow p-1 flex items-center justify-center">
                      <CheckIcon className="w-6 h-6 font-bold text-white " />
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-between bg-red-600 h-1 items-center relative">
                    <div className="bg-red-600 h-10 w-10 rounded-full shadow flex items-center justify-center -ml-2">
                      <div className="bg-red-600 h-10 w-10 rounded-full shadow p-1 flex items-center justify-center">
                        <CheckIcon className="w-6 h-6 font-bold text-white " />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-300 dark:bg-gray-700 h-10 w-10 rounded-full shadow flex items-center justify-center -mr-3 relative">
                      <div className="h-5 w-5 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <div className="bg-white border border-gray-300 dark:bg-gray-700 h-10 w-10 rounded-full shadow"></div>
                  </div>
                  <div className="w-1/3 flex justify-end">
                    <div className="bg-white border border-gray-300 dark:bg-gray-700 h-10 w-10 rounded-full shadow"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isOpen ? (
        <motion.div
          layout
          onClick={toggleOpen}
          className="flex flex-row mt-2 cursor-pointer justify-center items-center space-x-2"
        >
          <p className="font-bold tracking-wide text-lg">Minimize</p>
          <ChevronUpIcon className="w-6 h-6 text-black" />
        </motion.div>
      ) : (
        <motion.div
          layout
          onClick={toggleOpen}
          className="flex flex-row mt-2 cursor-pointer justify-center items-center space-x-2"
        >
          <p className="font-bold tracking-wide text-lg">Expand</p>
          <ChevronDownIcon className="w-6 h-6 text-black" />
        </motion.div>
      )}

      <motion.div layout className="flex justify-center mt-6">
        <motion.div
          layout
          className="border-bottom  border shadow-md shadow-gray-200 w-full"
        ></motion.div>
      </motion.div>
    </motion.div>
  );
}

export default AssignmentProject;
