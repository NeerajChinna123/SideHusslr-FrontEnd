import { usersDataType } from "../typings";
import {
  UserIcon,
  BuildingLibraryIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { universityDataType } from "../typings";
import { useAppSelector } from "../hooks";

export interface UserData {
  data: usersDataType;
}

function User(props: UserData) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const universityDataSt = useAppSelector(
    (state) => state.universityData.universitiesData
  );

  var filteredUniversity = universityDataSt.find(
    (university: universityDataType) => {
      return university.university_id === props.data.university_id;
    }
  );

  const date1 = new Date(props?.data?.createdAt);

  var user_status = "ACTIVE";
  return (
    <motion.div
      layout
      onClick={toggleOpen}
      className="px-5 py-4 relative group  hover:cursor-pointer border-[0.05rem] rounded-sm shadow-md shadow-gray-300 border-gray-300"
    >
      <motion.div layout className="flex flex-row group ">
        {/* <div className="flex-1"> */}
        {props.data.image ? (
          <motion.div
            layout
            className=" relative object-contain self-center h-[3rem] w-[3rem] rounded-lg md:h-[5rem] md:w-[5rem]"
          >
            <img alt="" className="" src={props.data.image} />
          </motion.div>
        ) : (
          <UserIcon className="h-[4rem] w-[4rem] self-center text-white bg-red-600 p-3 rounded-lg md:h-[5rem] md:w-[5rem]" />
        )}
        <motion.div
          layout
          className="space-y-[0.3rem] w-[95%] self-center ml-4 md:ml-7 flex-1"
        >
          <p className="font-bold capitalize tracking-wide font-poppins text-[1rem] md:text-[1.3rem] text-red-700">
            {props?.data?.first_name} &nbsp; {props?.data?.last_name}
          </p>
          <p className="tracking-wide text-[0.8rem] md:text-[1rem] font-poppins text-gray-700">
            {props?.data?.username}
          </p>
        </motion.div>
        <motion.div
          className={
            `self-center w-[6rem] flex justify-center font-poppins uppercase font-semibold text-sm md:text-md  rounded-md border text-white tracking-wide ` +
            (props?.data?.user_type !== "ADMIN"
              ? props?.data?.user_type == "INTERN"
                ? "bg-blue-600 p-3"
                : "bg-green-600 px-4 py-3"
              : "bg-red-600 p-3")
          }
        >
          <p>{props?.data?.user_type}</p>
        </motion.div>
        {/* </div> */}
      </motion.div>
      <motion.div layout>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={" mt-4"}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mt-6 md:mt-8 border-t border-gray-300 px-2 lg:px-0 max-w-[95%] mx-auto  lg:max-w-[90%]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[1.5rem] lg:gap-y-[2.5rem] gap-x-[4rem] lg:gap-x-[12rem]  lg:max-w-[80%] mx-auto px-2 lg:px-0 mt-6">
                <div className="self-center flex justify-center space-x-3 items-center">
                  <div>
                    <EnvelopeIcon className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-sm tracking-wide font-semibold font-poppins">
                    {props?.data?.email}
                  </div>
                </div>

                <div className="self-center flex justify-center space-x-3 items-center">
                  <div>
                    <PhoneIcon className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-sm font-semibold tracking-wide font-poppins">
                    {props?.data?.contact}
                  </div>
                </div>

                {filteredUniversity && (
                  <div className="flex justify-center space-x-4">
                    {/* @ts-ignore */}
                    {filteredUniversity.image ? (
                      <div className=" relative object-contain self-center h-[3rem] w-[3rem] md:h-[3.5rem] md:w-[3.5rem]">
                        <img
                          alt=""
                          className=""
                          src={
                            /* @ts-ignore */
                            filteredUniversity.image
                          }
                        />
                      </div>
                    ) : (
                      <BuildingLibraryIcon className="h-[3rem] w-[3rem] text-red-600 md:h-[3.5rem] md:w-[3.5rem]" />
                    )}
                    <div className="self-center text-black text-md md:text-lg font-poppins ">
                      {/* @ts-ignore */}
                      {filteredUniversity.name}
                    </div>
                  </div>
                )}

                <div className="self-center flex justify-center space-x-3 items-center">
                  <div>
                    <CalendarIcon className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-sm font-semibold tracking-wide font-poppins">
                    {date1.toLocaleDateString("en-US")}
                  </div>
                </div>
                <div className="lg:self-center flex justify-center ">
                  <div
                    className={
                      `p-2 self-center flex justify-center rounded-sm font-poppins text-sm md:text-md uppercase  tracking-wide ` +
                      `${
                        user_status == "IN ACTIVE"
                          ? "text-red-900 bg-red-400 "
                          : "text-green-900 bg-green-300"
                      }`
                    }
                  >
                    <p className="animate-pulse">{user_status}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default User;
