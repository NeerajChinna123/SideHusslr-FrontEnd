import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { usersDataType, universityDataType } from "../typings";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setUsersData } from "../slice/usersSlice";
import { setUniversitiesData } from "../slice/universitySlice";
import Footer from "../containers/Footer";
import { motion, AnimateSharedLayout } from "framer-motion";
import UniversityUserTabs from "../containers/UniversityUserTabs";
import { signOut } from "next-auth/react";

export interface propsData {
  usersData: [usersDataType];
  universitiesData: [universityDataType];
}
export default function Admin(props: propsData) {
  const { data: session, status } = useSession();

  const router = useRouter();

  //extra security client side to check the authentication status of the user
  if (!session && status == "unauthenticated") {
    router.push("/auth/signIn");
  }

  //@ts-ignore

  if (session?.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/auth/signIn", redirect: true });
  }

  const dispatch = useAppDispatch();

  dispatch(setUsersData(props?.usersData));
  dispatch(setUniversitiesData(props?.universitiesData));

  // const userDataSt = useAppSelector((state) => state.userData.usersData);
  // const universityDataSt = useAppSelector(
  //   (state) => state.universityData.universitiesData
  // );

  // console.log("user-d", userDataSt);

  // console.log("universi-d", universityDataSt);

  if (!session && status == "unauthenticated") {
    router.push("/auth/signIn");
  }

  // @ts-ignore
  if (session?.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/auth/signIn", redirect: false });
  }

  return (
    <AnimateSharedLayout>
      <div className=" h-screen scroll-smooth bg-gradient-to-br from-red-50 via-white to-red-50  scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] z-100 scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
        {session &&
          status == "authenticated" &&
          // @ts-ignore
          session.data.user_status == "ACTIVE" &&
          // @ts-ignore
          session.data.user_type == "ADMIN" && (
            <>
              <main className="">
                <div className="">
                  <div className="bg-gradient-to-br from-black via-black  to-[#85002a] shadow-md shadow-red-600">
                    <div className="max-w-[82rem]   mx-auto ">
                      <div>
                        <div className="py-2">
                          <Header page="admin" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[2rem] lg:mb-[4rem]">
                    <UniversityUserTabs />
                  </div>
                </div>
              </main>
            </>
          )}
        <motion.div
          layout
          className="bg-gradient-to-br from-black via-black  to-[#85002a] "
        >
          <div className="max-w-[82rem] mx-auto">
            <Footer />
          </div>
        </motion.div>
      </div>
    </AnimateSharedLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // security at server side to check the authentication status of the user

  //@ts-ignore
  console.log("session-server : ", session);

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
      signOut({ callbackUrl: "/auth/signIn", redirect: false });
    }
    // @ts-ignore
    if (session.data.user_status == "ACTIVE") {
      // @ts-ignore
      if (session.data.user_type == "STUDENT") {
        return {
          redirect: {
            //@ts-ignore
            destination: `/student/${session.data.user_id}`,
            permanent: false,
          },
        };
      }
      // @ts-ignore
      if (session.data.user_type == "INTERN") {
        return {
          redirect: {
            //@ts-ignore
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
      //getUsers API
      let usersData = null;
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          // Authorization: `Bearer ${session.accessToken}`,
        },
      };

      try {
        const userRes = await axios.get(
          `${process.env.SIDEHUSSLR_TEST_API}/users`,
          customConfig
        );

        if (userRes?.data?.status < "300") {
          usersData = await userRes.data.data;
        }
      } catch (err) {
        // Handle error
        console.log(err);
      }

      let universitiesData = null;
      const customConfig1 = {
        headers: {
          "Content-Type": "application/json",
          Cookie: context.req.headers.cookie,
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
        withCredentials: true,
      };
      try {
        const uniRes = await axios.get(
          `${process.env.SIDEHUSSLR_TEST_API}/university`,
          customConfig1
        );

        

        if (uniRes?.data?.status < "300") {
          if (uniRes?.data?.success) {
            universitiesData = await uniRes.data.data;
          } else if (uniRes?.data?.refresh) {
            universitiesData = null;
            
          }
        }
      } catch (err) {
        // Handle error
        signOut({ callbackUrl: "/auth/signIn", redirect: false });
        console.log('univer - err');
        console.log(err);
      }

      return {
        props: {
          usersData,
          universitiesData,
        },
      };
    }
  }
}
