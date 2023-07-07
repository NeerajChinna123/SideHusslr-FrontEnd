import { useAppSelector, useAppDispatch } from "../hooks";


function UsersTable() {

  
  const courseDetailsData = useAppSelector((state) => state.courseDetailData.courseDetailsData);
 

  console.log('users data : ',courseDetailsData?.Users)


  return (
    <div>

       
    </div>
  )
}

export default UsersTable