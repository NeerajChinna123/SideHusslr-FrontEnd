import { useAppSelector } from "../../hooks";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { studentDataType } from "../../typings";
import { motion, AnimateSharedLayout } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../containers/Footer";
import CourseBanner from "../../containers/CourseBanner";
import CourseAssignments from "../../containers/CourseAssignments";


export interface propsData {
  courseDetails: studentDataType;
}

function CourseDetails(props: propsData) {


  const router = useRouter();

  const { data: session, status } = useSession();

  // if (session && status == "authenticated") {
  //   // @ts-ignore
  //   if (session.data.user_status == "ACTIVE") {
  //     // @ts-ignore
  //     if (session.data.user_type == "ADMIN") {
  //       router.push("/admin");
  //     }
  //     // @ts-ignore
  //     if (session.data.user_type == "INTERN") {
  //       router.push(`/intern/${session.data.user_id}`);
  //     }
  //   } else {
  //     router.push("/");
  //   }
  // }

  if (!session && status == "unauthenticated") {
    router.push("/auth/signIn");
  }

  //@ts-ignore

  if (session?.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/auth/signIn", redirect: false });
  }

  const myArray = [
    "https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560732488-6b0df240254a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2VydmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3VkJTIwY29tcHV0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjB0ZWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  const image = myArray[Math.floor(Math.random() * myArray.length)];

  return (
    <>
      {session &&
        status == "authenticated" &&
        // @ts-ignore
        session.data.user_status == "ACTIVE" &&
        // @ts-ignore
        session.data.user_type == "STUDENT" && (
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
                  <CourseBanner data={props?.courseDetails} image={image} />
                </div>
                <div className="mb-0 md:mb-12 md:px-4 lg:px-0">
                  {/* @ts-ignore */}
                  <CourseAssignments
                    data={props?.courseDetails?.StudentAssignmentInstructors}
                    heading="Assignments / Projects"
                  />
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
      if (session.data.user_type == "ADMIN") {
        return {
          redirect: {
            destination: "/admin",
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

  let courseDetails = null;

  const { studCour } = context.query;

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      Cookie: context.req.headers.cookie,
      // @ts-ignore
      Authorization: `Bearer ${session.accessToken}`,
    },
  };
  try {
    const courseDetailsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SIDEHUSSLR_TEST_API}/course/student/assignment/detail/${studCour}`,
      customConfig
    );

    if (courseDetailsRes?.data?.status < "300") {
      if (courseDetailsRes?.data?.success) {
        courseDetails = await courseDetailsRes.data.data;
      }
    }
  } catch (err) {
    // Handle error
    console.log("", err);
  }

  return {
    props: {
      courseDetails,
    },
  };
}
