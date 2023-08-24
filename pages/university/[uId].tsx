import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { studentDataType } from "../../typings";
import { motion, AnimateSharedLayout } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../containers/Footer";
import UniversityBanner from "../../containers/UniversityBanner";
import { universityDetailsType } from "../../typings";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setUniversitiesCoursesData } from "../../slice/uniCourseSlice";
import UniCourses from "../../containers/UniCourses";

export interface propsData {
  uniData: universityDetailsType;
}

function UniversityDetails(props: propsData) {
  const router = useRouter();

  const { data: session, status } = useSession();

  //   if (session && status == "authenticated") {
  //     // @ts-ignore
  //     if (session.data.user_status == "ACTIVE") {
  //       // @ts-ignore
  //       if (session.data.user_type == "STUDENT") {
  //         router.push("/student");
  //       }
  //       // @ts-ignore
  //       if (session.data.user_type == "INTERN") {
  //         // @ts-ignore
  //         router.push(`/intern/${session.data.user_id}`);
  //       }
  //     } else {
  //       router.push("/");
  //     }
  //   }



  const dispatch = useAppDispatch();

  dispatch(setUniversitiesCoursesData(props?.uniData));

  if (!session && status == "unauthenticated") {
    router.push("/auth/signIn");
  }

  //@ts-ignore

  if (session?.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/auth/signIn", redirect: false });
  }

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
              </div>

              <div>
                {props?.uniData && (
                  <UniversityBanner universityData={props?.uniData} />
                )}
              </div>

              <div className="max-w-7xl mx-auto mt-8 mb-10">
                <UniCourses />
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

export default UniversityDetails;

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

  let universityData = null;

  const { uId } = context.query;

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
      // @ts-ignore
      Authorization: `Bearer ${session.accessToken}`,
    },
  };
  try {
    const uniRes = await axios.get(
      `${process.env.NEXT_PUBLIC_SIDEHUSSLR_TEST_API}/course/${uId}`,
      customConfig
    );

    if (uniRes?.data?.status < "300") {
      if (uniRes?.data?.success) {
        universityData = await uniRes.data.data;
      }
    }
  } catch (err) {
    // Handle error
    console.log(err);
  }

  return {
    props: {
      uniData: universityData,
    },
  };
}
