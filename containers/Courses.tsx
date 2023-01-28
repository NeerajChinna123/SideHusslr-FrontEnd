import { motion, AnimateSharedLayout } from "framer-motion";

import { useAppSelector } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { studentDataType, CourseDataType } from "../typings";

import Course from "../components/Course";
import Link from "next/link";


export interface StudentData {
  data: [];
}


function Courses(props:StudentData) {
  // const studentDataSt = useAppSelector(
  //   (state) => state.studentData.studentsData
  // );

  const myArray = [
    "https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560732488-6b0df240254a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2VydmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjB0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  const [pageSize, setPageSize] = useState(3);

  return (
    <AnimateSharedLayout>
      <div className="mb-10">
        <div className="py-8 px-5  flex items-center">
          <p className="font-[900] flex-1 font-sanSerif  tracking-wider text-4xl md:text-5xl">
            Your Courses
          </p>
        </div>

        <div className="px-5 py-4 md:py-6  grid grid-cols-1 grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 ">
          {props?.data
            ?.slice(0, pageSize)
            ?.map((studentD: studentDataType) => (
              <div className="w-full " key={studentD?.course_id}>
                <Course
                  data={studentD}
                  image={myArray[Math.floor(Math.random() * myArray.length)]}
                />
              </div>
            ))}
        </div>
        {pageSize < props?.data?.length && (
          <motion.div
            //   variants={scaleVariants}
            //   whileInView={scaleVariants.whileInView}
            className="flex justify-center"
          >
            <motion.div
              layout
              whileTap={{ scale: 0.2 }}
              onClick={() => {
                setPageSize(pageSize + 10);
              }}
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

export default Courses;
