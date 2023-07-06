import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimateSharedLayout } from "framer-motion";
import { universityDetailsType, courseAssignmentUsersType } from "../typings";
import { useAppSelector } from "../hooks";
import University from "../components/University";
import UniCourseFormModal from "../components/UniCourseFormModal";
import UniCourse from "../components/UniCourse";

function UniCourses() {
  const universityCoursesDataSt = useAppSelector(
    (state) => state.uniCourseData.uniCoursesData
  );

  const myArray = [
    "https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560732488-6b0df240254a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2VydmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjB0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  //@ts-ignore
  console.log("uni-cou : ", universityCoursesDataSt?.Courses);

  const [pageSize, setPageSize] = useState(12);

  const [universityCourseModal, setUniversityCourseModal] = useState(false);
  return (
    <AnimateSharedLayout>
      <div>
        <UniCourseFormModal
          //@ts-ignore
          universityID={universityCoursesDataSt?.university_id}
          showUniversityCourseModal={universityCourseModal}
          setShowUniversityCourseModal={setUniversityCourseModal}
        />
        <div className="py-6 px-5  flex items-center">
          <p className="font-[900] flex-1 font-sanSerif  tracking-wide text-4xl md:text-5xl">
            Courses
          </p>
          <motion.div
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setUniversityCourseModal(true);
            }}
            className="bg-red-600 p-5 shadow-md shadow-gray-400 cursor-pointer rounded-full"
          >
            <PlusIcon className="text-white h-5 w-5 md:h-7 md:w-7" />
          </motion.div>
        </div>

        <div className="px-5 py-4 md:py-6  grid grid-cols-1 grid-flow-row-dense lg:grid-cols-3 gap-x-9 gap-y-9 ">
          {
            //@ts-ignore
            universityCoursesDataSt?.Courses?.slice(0, pageSize)?.map(
              (universityCourse: courseAssignmentUsersType) => (
                <div className="w-full " key={universityCourse?.course_id}>
                  <UniCourse
                    data={universityCourse}
                    image={myArray[Math.floor(Math.random() * myArray.length)]}
                  />
                </div>
              )
            )
          }
        </div>
        {
          //@ts-ignore
          pageSize < universityCoursesDataSt?.Courses?.length && (
            <motion.div
              //   variants={scaleVariants}
              //   whileInView={scaleVariants.whileInView}
              className="flex justify-center"
            >
              <motion.div
                layout
                whileTap={{ scale: 0.2 }}
                onClick={() => {
                  setPageSize(pageSize + 12);
                }}
                className="mt-8 flex cursor-pointer group justify-center rounded-[0.2rem] bg-red-600 py-4 px-8 font-ubuntu text-lg font-semibold tracking-wide text-white shadow-md shadow-gray-400 transition duration-500 ease-in-out lg:px-8"
              >
                <p className="group-hover:scale-105  transition-transform duration-300 ease-in-out">
                  Show More
                </p>
              </motion.div>
            </motion.div>
          )
        }
      </div>
    </AnimateSharedLayout>
  );
}

export default UniCourses;
