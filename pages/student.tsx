import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setStudentsData } from "../slice/studentSlice";
import { motion, AnimateSharedLayout } from "framer-motion";
import { studentDataType } from "../typings";
import StudentBanner from "../containers/StudentBanner";
import CourseAssignmentTabs from "../containers/CourseAssignmentTabs";

export interface propsData {
  studentData: [studentDataType];
}

export default function Student(props: propsData) {
  // const { data: session, status } = useSession();

  const router = useRouter();

  // if (session && status == "authenticated") {
  //   // @ts-ignore
  //   if (session.data[0].user_status == "ACTIVE") {
  //     // @ts-ignore
  //     if (session.data[0].user_type == "ADMIN") {
  //       router.push("/admin");
  //     }
  //     // @ts-ignore
  //     if (session.data[0].user_type == "INTERN") {
  //       router.push("/intern");
  //     }
  //   } else {
  //     router.push("/");
  //   }
  // }

  // if (!session && status == "unauthenticated") {
  //   router.push("/");
  // }

  const dispatch = useAppDispatch();

  dispatch(setStudentsData(props?.studentData));

  const studentDataSt = useAppSelector(
    (state) => state.studentData.studentsData
  );

  console.log("s-d-t-st : ", studentDataSt);

  return (
    <>
      {/* {session &&
        status == "authenticated" &&
        // @ts-ignore
        session.data[0].user_status == "ACTIVE" &&
        // @ts-ignore
        session.data[0].user_type == "STUDENT" && (
          <main className="scroll-smooth scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
            <div className="h-screen">
              <div className="bg-gradient-to-br pb-4 from-black via-black  to-[#85002a] ">
                <div className="max-w-[82rem] mx-auto">
                  <div>
                    <div className="pt-4 md:pt-6">
                      <Header page="student" />
                    </div>
                  </div>
                </div>
              </div>
              STUDENT
            </div>
          </main>
        )} */}
      <AnimateSharedLayout>
        <main className="h-screen scroll-smooth bg-gradient-to-br from-red-50 via-white to-red-50  scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] z-100 scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
          <div className="">
            <div className="bg-gradient-to-br sticky top-0 z-50 from-black via-black  to-[#85002a] shadow-md shadow-red-600">
              <div className="max-w-[82rem]   mx-auto ">
                <div>
                  <div className="py-2">
                    <Header page="student" />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <StudentBanner />
            </div>
            <div>
              <CourseAssignmentTabs />
            </div>
          </div>
        </main>
      </AnimateSharedLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  // const session = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth/signIn",
  //       permanent: false,
  //     },
  //   };
  // }

  // if (session) {
  //   // @ts-ignore
  //   if (session.data[0].user_status == "ACTIVE") {
  //     // @ts-ignore
  //     if (session.data[0].user_type == "ADMIN") {
  //       return {
  //         redirect: {
  //           destination: "/admin",
  //           permanent: false,
  //         },
  //       };
  //     }
  //     // @ts-ignore
  //     if (session.data[0].user_type == "INTERN") {
  //       return {
  //         redirect: {
  //           destination: "/intern",
  //           permanent: false,
  //         },
  //       };
  //     }
  //   } else {
  //     return {
  //       redirect: {
  //         destination: "/",
  //         permanent: false,
  //       },
  //     };
  //   }
  // }

  let studentData = null;

  const userId = context.query.userId;

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      // @ts-ignore
      // Authorization: `Bearer ${session.accessToken}`,
    },
  };
  try {
    const studentRes = await axios.get(
      `${process.env.SIDEHUSSLR_TEST_API}/university/course/assignment/student/${userId}`,
      customConfig
    );

    console.log("uni :", studentRes);
    if (studentRes?.data?.status < "300") {
      studentData = await studentRes.data.data;
    }
  } catch (err) {
    // Handle error
    console.log(err);
  }

  return {
    props: {
      studentData,
    },
  };
}
