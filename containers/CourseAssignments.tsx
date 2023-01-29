import { StudentAssignmentInstructorsType } from "../typings";
import AssignmentProject from "../components/AssignmentProject";
import { motion, AnimateSharedLayout } from "framer-motion";


export interface CourseAssignmentsData {
  data: [StudentAssignmentInstructorsType];
}
function CourseAssignments(props: CourseAssignmentsData) {
  return (
    <AnimateSharedLayout>  
    <motion.div layout className="max-w-7xl mx-auto mt-20 bg-white bprder-solid border border-gray-200 shadow-lg shadow-gray-200 rounded-2xl px-6 py-6 ">
      <motion.div layout className="text-2xl text-black font-sanSerif font-bold  tracking-wide">
        Assignments / Projects
      </motion.div>

      <motion.div layout className="flex justify-center mt-6">
        <motion.div layout className="border-bottom  border shadow-md shadow-gray-200 w-full"></motion.div>
      </motion.div>

      {props?.data?.map((Assignment: StudentAssignmentInstructorsType) => (
        <motion.div layout key={Assignment?.assigned_id}>
          <AssignmentProject data={Assignment} />
        </motion.div>
      ))}
    </motion.div>
    </AnimateSharedLayout>
  );
}

export default CourseAssignments;
