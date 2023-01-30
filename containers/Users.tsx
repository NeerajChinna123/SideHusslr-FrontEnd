import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimateSharedLayout } from "framer-motion";
import { usersDataType } from "../typings";
import { useAppSelector } from "../hooks";
import User from "../components/User";
import UserFormModal from "../components/UserFormModal";

// import UniversityFormModal from "../components/UniversityFormModal";

function Users() {
  const usersDataSt = useAppSelector((state) => state.userData.usersData);

  const [pageSize, setPageSize] = useState(5);

  const [userModal, setUserModal] = useState(false);

  const universityDataSt = useAppSelector(
    (state) => state.universityData.universitiesData
  );


  return (
    <AnimateSharedLayout>
      <div>
        <UserFormModal
          showUserModal={userModal}
          setShowUserModal={setUserModal}
          universityDataStProp={universityDataSt}
        />
        <div className="py-6 px-5 pl-6  flex items-center">
          <p className="font-[900] flex-1 font-sanSerif  tracking-wide text-4xl md:text-5xl">
            Users
          </p>
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setUserModal(true);
            }}
            className="bg-red-600 p-5 shadow-md shadow-gray-400 cursor-pointer rounded-full"
          >
            <PlusIcon className="text-white h-5 w-5 md:h-7 md:w-7" />
          </motion.div>
        </div>

        <div className="px-5 py-4 space-y-5 md:py-6 flex flex-col items-center justify-center ">
          {usersDataSt?.slice(0, pageSize)?.map((user: usersDataType) => (
            <div className="w-full md:w-[70%]" key={user?.user_id}>
              <User data={user} universityDataStProp={universityDataSt} />
            </div>
          ))}
        </div>

        {pageSize < usersDataSt?.length && (
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
    </AnimateSharedLayout>
  );
}

export default Users;
