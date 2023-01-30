import { motion, AnimateSharedLayout } from "framer-motion";
import CourseAssignments from "./CourseAssignments";

export interface OnGoingAssignmentsData {
  data: any[];
}

function OnGoingAssignments(props: OnGoingAssignmentsData) {
  return (
    <AnimateSharedLayout>
      <div>
        <div className="mb-0 md:mb-12 md:px-4 lg:px-0">
          <CourseAssignments
            //@ts-ignore
            data={props?.data}
            heading="On-Going Tasks"
          />
        </div>
      </div>
    </AnimateSharedLayout>
  );
}

export default OnGoingAssignments;
