export interface usersDataType {
  user_id: string;
  university_id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  location: string;
  email: string;
  is_delete:boolean;
  contact: string;
  user_type: string;
  createdAt: number;
  createdBy: string;
  modifiedAt: number;
  modifiedBy: string;
  user_status: string;
  image:string;
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
