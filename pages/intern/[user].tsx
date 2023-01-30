import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { motion, AnimateSharedLayout } from "framer-motion";
import CourseAssignments from "../../containers/CourseAssignments";
import axios from "axios";
import Footer from "../../containers/Footer";
import { StudentAssignmentInstructorsType } from "../../typings";
import InternAssignments from "../../containers/InternAssignments";

export interface propsData {
  internData: [StudentAssignmentInstructorsType];
}

export default function Intern(props: propsData) {
  const { data: session, status } = useSession();

  const router = useRouter();

  // if (session && status == "authenticated") {
  //   // @ts-ignore
  //   if (session.data[0].user_status == "ACTIVE") {
  //     // @ts-ignore
  //     if (session.data[0].user_type == "STUDENT") {
  //       router.push("/student");
  //     }
  //      // @ts-ignore
  //     if (session.data[0].user_type == "ADMIN") {
  //       router.push("/admin");
  //     }
  //   } else {
  //     router.push("/");
  //   }
  // }

  //   if (!session && status == "unauthenticated") {
  //     router.push("/");
  //   }

  console.log("intern-d : ", props?.internData);

  return (
    <>
      {/* {session &&
        status == "authenticated" &&
         // @ts-ignore
        session.data[0].user_status == "ACTIVE" &&
         // @ts-ignore
        session.data[0].user_type == "INTERN" && (
          <main className="scroll-smooth scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
            <div className="h-screen">
              <div className="bg-gradient-to-br pb-4 from-black via-black  to-[#85002a] ">
                <div className="max-w-[82rem] mx-auto">
                  <div>
                    <div className="pt-4 md:pt-6">
                      <Header page="intern" />
                    </div>
                  </div>
                </div>
              </div>
              Intern
            </div>
          </main>
        )} */}

      <main>
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
              <div>
                <InternAssignments data={props?.internData} />
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
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/auth/signIn",
  //         permanent: false,
  //       },
  //     };
  //   }

  //   if (session) {
  //     // @ts-ignore
  //     if (session.data[0].user_status == "ACTIVE") {
  //       // @ts-ignore
  //       if (session.data[0].user_type == "ADMIN") {
  //         return {
  //           redirect: {
  //             destination: "/admin",
  //             permanent: false,
  //           },
  //         };
  //       }
  //       // @ts-ignore
  //       if (session.data[0].user_type == "STUDENT") {
  //         return {
  //           redirect: {
  //             destination: "/student",
  //             permanent: false,
  //           },
  //         };
  //       }
  //     } else {
  //       return {
  //         redirect: {
  //           destination: "/",
  //           permanent: false,
  //         },
  //       };
  //     }
  //   }

  let internData = null;

  const { user } = context.query;

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      // @ts-ignore
      // Authorization: `Bearer ${session.accessToken}`,
    },
  };
  try {
    const internRes = await axios.get(
      `${process.env.SIDEHUSSLR_TEST_API}/university/course/assignment/intern/${user}`,
      customConfig
    );

    console.log("uni :", internRes);
    if (internRes?.data?.status < "300") {
      internData = await internRes.data.data;
    }
  } catch (err) {
    // Handle error
    console.log(err);
  }

  return {
    props: {
      internData: internData,
    },
  };
}
