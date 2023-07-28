import React from "react";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimateSharedLayout } from "framer-motion";
import { AssignmentDataType, usersDataType } from "../typings";
import { useAppSelector } from "../hooks";
import User from "../components/User";
import AssignmentFormModal from "../components/AssignmentFormModal";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import AssignmentAssignModal from "../components/AssignmentAssignModal";

// import UniversityFormModal from "../components/UniversityFormModal";

function Assignments() {
  const courseDe = useAppSelector(
    (state) => state.courseDetailData.courseDetailsData
  );
  const [assignmentModal, setAssignmentModal] = useState(false);

  const [assignmentAssignModal, setAssignmentAssignModal] = useState(false);

  const [more, setMore] = useState(false);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      //   hour: "numeric",
      //   minute: "numeric",
      //   second: "numeric",
    };
    //@ts-ignore
    return date.toLocaleString("en-US", options);
  };

  const [assignmentId, setAssignmentId] = useState("");


  const [showMoreStates, setShowMoreStates] = useState(courseDe?.Assignments?.map(() => false));

  const handleShowMoreClick = (index:number) => {
    // Create a copy of the showMoreStates array and set the clicked element to true
    const newShowMoreStates = [...showMoreStates];
    newShowMoreStates[index] = true;
    setShowMoreStates(newShowMoreStates);
  };

  function showAssignmentAssignPopUp(assignmentID: string) {
    setAssignmentId(assignmentID);
    setAssignmentAssignModal(true);
  }

  return (
    <AnimateSharedLayout>
      <div>
        <AssignmentFormModal
          showAssignmentModal={assignmentModal}
          setShowAssignmentModal={setAssignmentModal}
          //@ts-ignore
          courseId={courseDe?.course_id}
        />

        <AssignmentAssignModal
          assignmentId={assignmentId}
          showAssignmentAssign={assignmentAssignModal}
          setAssignmentAssign={setAssignmentAssignModal}
        />

        <div className="py-6 px-5 pl-6  flex items-center">
          <p className="font-[900] flex-1 font-sanSerif  tracking-wide text-4xl md:text-5xl">
            Assignments
          </p>
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setAssignmentModal(true);
            }}
            className="bg-red-600 p-5 shadow-md shadow-gray-400 cursor-pointer rounded-full"
          >
            <PlusIcon className="text-white h-5 w-5 md:h-7 md:w-7" />
          </motion.div>
        </div>

        <div className="relative overflow-x-auto space-y-5 md:py-6  flex flex-col px-6 ">
          {/* {courseDe?.Assignments?.map((user: usersDataType) => (
            <div className="w-full md:w-[70%]" key={user?.user_id}>
              <User data={user} universityDataStProp={universityDataSt} />
            </div>
          ))} */}

          <div className="relative overflow-x-auto  shadow-md border border-gray-100  sm:rounded-lg">
            <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Assignment Name
                  </th>
                  <th scope="col" className="px-6 py-3 w-[30rem]">
                    Assignment Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseDe?.Assignments?.map(
                  (Assignment: AssignmentDataType,index:number) => (
                    <tr
                      key={Assignment?.assignment_id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {Assignment?.name}
                      </td>
                      <td className="px-6 py-4 ">
                        {!showMoreStates[index] ? (
                          Assignment?.description?.length > 99 ? (
                            <p className="max-h-[4rem] pr-4 overflow-y-scroll">
                              {Assignment?.description?.slice(0, 100)}{" "}
                              <span onClick={()=>handleShowMoreClick(index)} className="text-gray-700 font-bold cursor-pointer">
                                {" "}
                                more ..
                              </span>
                            </p>
                          ) : (
                            <p className="max-h-[4rem] pr-4 overflow-y-scroll">{Assignment?.description}</p>
                          )
                        ) : (
                          <p className="max-h-[4rem] pr-4 overflow-y-scroll">{Assignment?.description}</p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {
                          //@ts-ignore
                          formatDate(Assignment?.start_date)
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          //@ts-ignore
                          formatDate(Assignment?.end_date)
                        }
                      </td>
                      <td className="">
                        <div className="rounded-full px-3 py-4 ">
                          <motion.div
                            onClick={() =>
                              showAssignmentAssignPopUp(
                                Assignment?.assignment_id
                              )
                            }
                            whileTap={{ scale: 0.96 }}
                            className="bg-red-600 p-4 shadow-md shadow-gray-400 flex justify-center cursor-pointer self-end rounded-full"
                          >
                            <UserPlusIcon className="text-white h-5 w-5 md:h-7 md:w-7" />
                          </motion.div>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimateSharedLayout>
  );
}

export default Assignments;
