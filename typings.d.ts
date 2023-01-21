export interface usersDataType {
  user_id: string;
  university_id: string;
  username: string;
  first_name: string;
  last_name: string;
  location: string;
  email: string;
  contact: string;
  user_type: string;
  created_date: number;
  created_by: string;
  modified_date: number;
  modified_by: string;
  user_status: string;
}

export interface universityDataType {
  university_id: string;
  name: string;
  description: string;
  country: string;
  is_delete:boolean;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
  image:string;
}
