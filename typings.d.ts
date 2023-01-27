export interface usersDataType {
  user_id: string;
  university_id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  location: string;
  email: string;
  is_delete: boolean;
  contact: string;
  user_type: string;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
  user_status: string;
  image: string;
}

export interface universityDataType {
  university_id: string;
  name: string;
  description: string;
  country: string;
  is_delete: boolean;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
  image: string;
}

export interface studentDataType {
  student_course_id: string;
  status: string;
  start_date: string;
  end_date: string;
  is_delete: boolean;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  user_id: string;
  course_id: string;
  StudentAssignmentInstructors: [StudentAssignmentInstructorsType];
  Assignments: [Assignment];
  Course:CourseDataType

}

export interface StudentAssignmentInstructorsType {
  assigned_id: string;
  assignment_status: string;
  assigned: boolean;
  assigned_date: string;
  start_date: string;
  completion_date: string;
  is_delete: boolean;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  student_course_id: string;
  assignment_id: string;
  user_id: string;
  Assignment: AssignmentDataType;
}

export interface AssignmentDataType {
  assignment_id: string;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  course_id: string;
}

export interface CourseDataType {
  course_id: string,
  name: string,
  description: string,
  duration: string,
  is_delete: boolean,
  createdAt: string,
  createdBy: string,
  modifiedAt: string,
  modifiedBy: string,
  university_id: string
}
