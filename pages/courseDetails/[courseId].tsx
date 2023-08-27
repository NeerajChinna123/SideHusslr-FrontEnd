import { courseAssignmentUsersType, usersDataType } from "../../typings";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { motion, AnimateSharedLayout } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../containers/Footer";
import axios from "axios";
import { setCourseDetailsData } from "../../slice/courseDetailsSlice";
import { setInternsRoleData } from "../../slice/internDataSlice";
import UniCourseBanner from "../../containers/UniCourseBanner";
import UserAssignmentTabs from "../../containers/UserAssignmentTabs";
import { setStudentsRoleData } from "../../slice/studentsDataSlice";

export interface courseDetailsType {
  courseDetails: courseAssignmentUsersType;
  students: usersDataType;
  internsData:usersDataType
}

function CourseDetails(props: courseDetailsType) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  if (!session && status == "unauthenticated") {
    router.push("/auth/signIn");
  }

  //@ts-ignore

  if (session?.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/auth/signIn", redirect: false });
  }

  //@ts-ignore
  const courseData = props?.courseDetails;

  const myArray = [
    "https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560732488-6b0df240254a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2VydmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjB0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  const image = myArray[Math.floor(Math.random() * myArray.length)];

  dispatch(setCourseDetailsData(courseData));

  dispatch(setStudentsRoleData(props?.students));

  dispatch(setInternsRoleData(props?.internsData));

  const coData = useAppSelector(
    (state) => state.courseDetailData.courseDetailsData
  );

  return (
    <>
      {session &&
        status == "authenticated" &&
        // @ts-ignore
        session.data.user_status == "ACTIVE" &&
        // @ts-ignore
        session.data.user_type == "ADMIN" && (
          <AnimateSharedLayout>
            <main className="h-screen scroll-smooth bg-gradient-to-br from-red-50 via-white to-red-50  scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] z-100 scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
              <div className="">
                <div className="bg-gradient-to-br from-black via-black  to-[#85002a] shadow-md shadow-red-600">
                  <div className="max-w-[82rem]   mx-auto ">
                    <div>
                      <div className="py-2">
                        <Header page="student" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <UniCourseBanner courseDetails={coData} image={image} />
                </div>

                <div className="mb-[2rem] lg:mb-[4rem]">
                  <UserAssignmentTabs />
                </div>
              </div>
              <motion.div
                layout
                className="bg-gradient-to-br from-black via-black  to-[#85002a] "
              >
                <div className="max-w-[82rem] mx-auto">
                  <Footer />
                </div>
              </motion.div>
            </main>
          </AnimateSharedLayout>
        )}
    </>
  );
}

export default CourseDetails;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  if (session) {
    // @ts-ignore
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/signIn", redirect: true });
    }
    // @ts-ignore
    if (session.data.user_status == "ACTIVE") {
      // @ts-ignore
      if (session.data.user_type == "STUDENT") {
        return {
          redirect: {
            destination: "/student",
            permanent: false,
          },
        };
      }
      // @ts-ignore
      if (session.data.user_type == "INTERN") {
        return {
          redirect: {
            // @ts-ignore
            destination: `/intern/${session.data.user_id}`,
            permanent: false,
          },
        };
      }
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  if (session) {
    // @ts-ignore
    if (session.data.user_status == "ACTIVE") {
      let courseDetailsData = null;

      const { courseId } = context.query;

      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          Cookie: context.req.headers.cookie,
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      };
      try {
        const cDRes = await axios.get(
          `${process.env.NEXT_PUBLIC_SIDEHUSSLR_TEST_API}/course/details/${courseId}`,
          customConfig
        );

        if (cDRes?.data?.status < "300") {
          if (cDRes?.data?.success) {
            courseDetailsData = await cDRes.data.data;
          }
        }
      } catch (err) {
        // Handle error
        console.log(err);
      }

      let studentsData = null;
      const customConfig1 = {
        headers: {
          "Content-Type": "application/json",
          Cookie: context.req.headers.cookie,
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      };

      try {
        const studRes = await axios.get(
          `${process.env.NEXT_PUBLIC_SIDEHUSSLR_TEST_API}/users/students`,
          customConfig1
        );

        if (studRes?.data?.status < "300") {
          if (studRes?.data?.success) {
            studentsData = await studRes.data.data;
          }
        }
      } catch (err) {
        // Handle error
        console.log(err);
      }


      let internsData = null;
      const customConfig2 = {
        headers: {
          "Content-Type": "application/json",
          Cookie: context.req.headers.cookie,
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      };

      try {
        const internRes = await axios.get(
          `${process.env.NEXT_PUBLIC_SIDEHUSSLR_TEST_API}/users/intern`,
          customConfig1
        );

        if (internRes?.data?.status < "300") {
          if (internRes?.data?.success) {
            internsData = await internRes.data.data;
          }
        }
      } catch (err) {
        // Handle error
        console.log(err);
      }

      return {
        props: {
          courseDetails: courseDetailsData,
          students: studentsData,
          internsData:internsData
        },
      };
    }
  }
}
