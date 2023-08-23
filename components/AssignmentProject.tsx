import { StudentAssignmentInstructorsType } from "../typings";
import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { motion, AnimatePresence } from "framer-motion";

export interface AssignmentProjectData {
  data: StudentAssignmentInstructorsType;
  edit: boolean;
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

  if (assignmentStatusString == "IN PROGRESS") {
    status = 2;
  } else if (assignmentStatusString == "COMPLETED") {
    status = 3;
  } else if (assignmentStatusString == "IN REVIEW") {
    status = 4;
  } else if (assignmentStatusString == "DELIVERED") {
    status = 5;
  } else {
    status = 1;
  }

  var AssignmentCompletionPer = (status / 5) * 100;

  return (
    <motion.div layout className="py-6">
      <motion.div layout className="flex justify-center mb-6">
        <motion.div
          layout
          className="border-bottom  border shadow-md shadow-gray-200 w-full"
        ></motion.div>
      </motion.div>
      {props?.edit && (
        <motion.div layout className="flex justify-end my-3 md:my-6 ">
          <motion.div layout className="cursor-pointer">
            <PencilSquareIcon className="text-red-600 font-bold h-10 w-10" />
          </motion.div>
        </motion.div>
      )}
      <motion.div
        layout
        className=" px-2 flex justify-between flex-col lg:flex-row"
      >
        <motion.div
          layout
          className="flex w-full flex-col space-y-3 lg:w-[28%]"
        >
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
          {props?.data?.Assignment?.assignment_type == "PROJECT" ? (
            <motion.div layout className="pt-1">
              <p className="font-poppins tracking-wide text-[1rem]  text-white w-[7rem] bg-red-600  text-center rounded-md shadow-md shadow-gray-200 p-2">
                <span className="animate-pulse">
                  {props?.data?.Assignment?.assignment_type}
                </span>
              </p>
            </motion.div>
          ) : (
            <motion.div layout className="pt-1">
              <p className="font-poppins text-center tracking-wide text-[1rem] text-red-600 border border-red-500 rounded-md p-2 w-[8rem] shadow-red-200  shadow-md">
                <span className="animate-pulse">
                  {props?.data?.Assignment?.assignment_type}
                </span>
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          layout
          className="flex flex-row justify-between items-center mb-6 lg:hidden"
        >
          <motion.div layout className="flex-col space-y-3 mt-6  flex">
            <p className="font-bold font-poppins text-lg text-gray-700">
              Complete
            </p>
            <p className="font-bold font-poppins text-4xl text-black">
              {AssignmentCompletionPer}%
            </p>
            <motion.div
              className={`h-[0.7rem] md:h-[0.6rem] mt-1 w-[8rem] rounded-full flex bg-[#e7e7e7]`}
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
          <motion.div layout className="flex-col space-y-4 mt-7 flex ">
            <p className="font-bold font-poppins w-full  self-end text-[1.1rem] text-gray-700">
              Expected Completion
            </p>
            <p className="font-bold font-poppins  text-md text-gray-700 self-end">
              {dueDate && dueDate.toDateString()}
            </p>
            <p className="font-bold font-poppins  text-md text-gray-700 self-end">
              {diffDays > 0 ? (
                `${diffDays} days left`
              ) : (
                <span className="text-red-600">Deadline Passed</span>
              )}
            </p>
          </motion.div>
        </motion.div>

        <motion.div layout className="flex-col space-y-3 mt-4 hidden lg:flex">
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

        <motion.div layout className="flex-col space-y-4 mt-4 hidden lg:flex">
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
            <motion.div className="md:mt-14 mt-16 mb-[6rem] md:mb-[8rem] md:ml-[-0.9rem]">
              <div className="w-[96%]  md:w-10/12 lg:w-5/6 md:mx-auto pt-4">
                <div className="bg-gray-300 dark:bg-gray-800 h-1 flex items-center justify-between">
                  <div
                    className={
                      status >= 1
                        ? ` w-1/3 bg-red-600 h-1 flex items-center relative `
                        : ` w-1/3 bg-gray-300 h-1 flex items-center relative `
                    }
                  >
                    {status >= 1 ? (
                      <div className="bg-red-600 md:h-10 md:w-10 h-8 w-8 rounded-full shadow p-1 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 md:h-6 md:w-6 font-bold text-white " />
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-8 w-8 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-600 rounded-full"></div>
                      </div>
                    )}

                    <div className="absolute top-8 md:top-9 left-[-0.4rem] md:left-[-0.9rem] bg-white  shadow-lg px-1 md:px-2 py-1 rounded-md  ">
                      <svg
                        className={
                          status >= 1
                            ? `-mt-1 w-full text-red-600`
                            : `-mt-1 w-full text-red-300`
                        }
                        width="16px"
                        height="8px"
                        viewBox="0 0 16 8"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Progress-Bars"
                            transform="translate(-322.000000, -198.000000)"
                            fill="currentColor"
                          >
                            <g
                              id="Group-4"
                              transform="translate(310.000000, 198.000000)"
                            >
                              <polygon
                                id="Triangle"
                                points="20 0 28 8 12 8"
                              ></polygon>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-red-600 px-1 md:px-2 py-1 text-[0.65rem]  md:text-sm font-bold"
                      >
                        Open
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      status >= 2
                        ? `w-1/3 bg-red-600 h-1 flex items-center relative`
                        : ` w-1/3 bg-gray-300 h-1 flex items-center relative`
                    }
                  >
                    {status >= 2 ? (
                      <div className="bg-red-600 md:h-10 md:w-10 h-8 w-8 rounded-full shadow p-1 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 md:h-6 md:w-6 font-bold text-white " />
                      </div>
                    ) : status == 1 ? (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-600 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-300 rounded-full"></div>
                      </div>
                    )}
                    <div className="absolute top-[-4.2rem] md:top-9 left-[-1.8rem] rotate-180 md:rotate-0  md:left-[-2.25rem] bg-white shadow-lg md:shadow-lg px-2 py-1 rounded  ">
                      <svg
                        className={
                          status == 1
                            ? `mb-[0.16rem] md:-mt-1 w-full text-red-600  `
                            : `mb-[0.16rem] md:-mt-1 w-full text-red-300 `
                        }
                        width="16px"
                        height="8px"
                        viewBox="0 0 16 8"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Progress-Bars"
                            transform="translate(-322.000000, -198.000000)"
                            fill="currentColor"
                          >
                            <g
                              id="Group-4"
                              transform="translate(310.000000, 198.000000)"
                            >
                              <polygon
                                id="Triangle"
                                points="20 0 28 8 12 8"
                              ></polygon>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-red-600 px-1 md:px-2 py-1 text-[0.7rem] rotate-180 md:rotate-0  md:text-sm font-bold"
                      >
                        In-Progress
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      status >= 3
                        ? ` w-1/3 bg-red-600 h-1 flex items-center relative`
                        : ` w-1/3 bg-gray-300 h-1 flex items-center relative`
                    }
                  >
                    {status >= 3 ? (
                      <div className="bg-red-600 md:h-10 md:w-10 h-8 w-8 rounded-full shadow p-1 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 md:h-6 md:w-6 font-bold text-white " />
                      </div>
                    ) : status == 2 ? (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-600 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-300 rounded-full"></div>
                      </div>
                    )}
                    <div className="absolute top-8 md:top-9 left-[-1.45rem] md:left-[-2.1rem] bg-white shadow-lg px-2 py-1 rounded  ">
                      <svg
                        className={
                          status == 2
                            ? `-mt-1 w-full text-red-600`
                            : `-mt-1 w-full text-red-300`
                        }
                        width="16px"
                        height="8px"
                        viewBox="0 0 16 8"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Progress-Bars"
                            transform="translate(-322.000000, -198.000000)"
                            fill="currentColor"
                          >
                            <g
                              id="Group-4"
                              transform="translate(310.000000, 198.000000)"
                            >
                              <polygon
                                id="Triangle"
                                points="20 0 28 8 12 8"
                              ></polygon>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-red-600  px-1 md:px-2 py-1 text-[0.65rem]  md:text-sm font-bold"
                      >
                        Completed
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      status >= 4
                        ? `w-1/3 bg-red-600 h-1 flex items-center relative`
                        : ` w-1/3 bg-gray-300 h-1 flex items-center relative`
                    }
                  >
                    {status >= 4 ? (
                      <div className="bg-red-600 md:h-10 md:w-10 h-8 w-8 rounded-full shadow p-1 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 md:h-6 md:w-6 font-bold text-white " />
                      </div>
                    ) : status == 3 ? (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-600 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-300 rounded-full"></div>
                      </div>
                    )}
                    <div className="absolute top-[-4.2rem] md:top-9 left-[-1.4rem] rotate-180 md:rotate-0  md:left-[-1.9rem] bg-white shadow-lg md:shadow-lg px-2 py-1 rounded  ">
                      <svg
                        className={
                          status == 3
                            ? `mb-[0.16rem] md:-mt-1 w-full text-red-600  `
                            : `mb-[0.16rem] md:-mt-1 w-full text-red-300 `
                        }
                        width="16px"
                        height="8px"
                        viewBox="0 0 16 8"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Progress-Bars"
                            transform="translate(-322.000000, -198.000000)"
                            fill="currentColor"
                          >
                            <g
                              id="Group-4"
                              transform="translate(310.000000, 198.000000)"
                            >
                              <polygon
                                id="Triangle"
                                points="20 0 28 8 12 8"
                              ></polygon>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-red-600 px-1 md:px-2 py-1 text-[0.7rem] rotate-180 md:rotate-0  md:text-sm font-bold"
                      >
                        In-Review
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      status >= 5
                        ? ` flex items-center relative`
                        : ` flex items-center relative`
                    }
                  >
                    {status >= 5 ? (
                      <div className="bg-red-600 md:h-10 md:w-10 h-8 w-8 rounded-full shadow p-1 flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 md:h-6 md:w-6 font-bold text-white " />
                      </div>
                    ) : status == 4 ? (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-600 rounded-full"></div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-300 dark:bg-gray-700 md:h-10 md:w-10 h-9 w-9 rounded-full shadow flex items-center justify-center -mr-3 relative">
                        <div className="w-5 h-5 md:h-6 md:w-6 bg-red-300 rounded-full"></div>
                      </div>
                    )}
                    <div className="absolute top-[2.9rem] md:top-[3.45rem] left-[-1.3rem] md:left-[-1.77rem] bg-white shadow-lg px-2 py-1 rounded   ">
                      <svg
                        className={
                          status == 4
                            ? `-mt-1 w-full text-red-600 `
                            : `-mt-1 w-full text-red-300 `
                        }
                        width="16px"
                        height="8px"
                        viewBox="0 0 16 8"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g
                            id="Progress-Bars"
                            transform="translate(-322.000000, -198.000000)"
                            fill="currentColor"
                          >
                            <g
                              id="Group-4"
                              transform="translate(310.000000, 198.000000)"
                            >
                              <polygon
                                id="Triangle"
                                points="20 0 28 8 12 8"
                              ></polygon>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <p
                        tabIndex={0}
                        className="focus:outline-none text-red-600  px-1 md:px-2 py-1 text-[0.7rem]  md:text-sm  font-bold"
                      >
                        Delivered
                      </p>
                    </div>
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
          className="flex flex-row mt-2 lg:mt-8 cursor-pointer justify-center items-center space-x-2"
        >
          <p className="font-bold tracking-wide text-lg">Minimize</p>
          <ChevronUpIcon className="w-6 h-6 text-black" />
        </motion.div>
      ) : (
        <motion.div
          layout
          onClick={toggleOpen}
          className="flex flex-row mt-2 lg:mt-8 cursor-pointer justify-center items-center space-x-2"
        >
          <p className="font-bold tracking-wide text-lg">Expand</p>
          <ChevronDownIcon className="w-6 h-6 text-black" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default AssignmentProject;
