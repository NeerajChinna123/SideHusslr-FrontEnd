import { useAppSelector, useAppDispatch } from "../hooks";
import { UserPlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { usersDataType } from "../typings";
import { motion } from "framer-motion";
import { useState } from "react";
import UserEnrollmentFormModal from "../components/UserEnrollmentModal";
import User from "../components/User";

function UsersTable() {
  const courseDetailsData = useAppSelector(
    (state) => state.courseDetailData.courseDetailsData
  );

  const [pageSize, setPageSize] = useState(3);

  const [userEnrollmentModal, setUserEnrollmentModal] = useState(false);

  return (
    <div className="flex items-center flex-col mt-10">
      <UserEnrollmentFormModal
        showUserEnrollmentModal={userEnrollmentModal}
        setShowUserEnrollmentModal={setUserEnrollmentModal}
        courseId={courseDetailsData?.course_id}
      />
      <div className="flex flex-row items-center w-[90%] justify-between">
        <div className="">
          <p className="text-3xl lg:text-4xl text-black font-[900] flex-1 font-sanSerif tracking-wide">
            Enrolled Users
          </p>
        </div>
        <motion.div
          onClick={() => setUserEnrollmentModal(true)}
          whileTap={{ scale: 0.96 }}
          className="bg-red-600 p-3 shadow-md shadow-gray-400 cursor-pointer self-end rounded-full"
        >
          <UserPlusIcon className="text-white h-6 w-6" />
        </motion.div>
      </div>

      <div className="px-5 py-4 space-y-5 md:py-6 w-full md:w-[70%] flex flex-col mt-2 ">
        {courseDetailsData?.Users?.slice(0,pageSize).map((user: usersDataType) => (
          <div className="w-full" key={user?.user_id}>
            <User data={user} universityDataStProp={[]} />
          </div>
        ))}
      </div>
      {pageSize < courseDetailsData?.Users?.length && (
          <motion.div
            layout
            //   variants={scaleVariants}
            //   whileInView={scaleVariants.whileInView}
            className="flex justify-center"
          >
            <motion.div
              whileTap={{ scale: 0.2 }}
              onClick={() => {
                setPageSize(pageSize + 10);
              }}
              layout
              className="mt-8 flex cursor-pointer group justify-center rounded-[0.2rem] bg-red-600 py-4 px-8 font-ubuntu text-lg font-semibold tracking-wide text-white shadow-md shadow-gray-400 transition duration-500 ease-in-out lg:px-8"
            >
              <p className="group-hover:scale-105  transition-transform duration-300 ease-in-out">
                Show More
              </p>
            </motion.div>
          </motion.div>
        )}
    </div>
  );
}

export default UsersTable;
