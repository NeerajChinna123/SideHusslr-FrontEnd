import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { usersDataType, universityDataType } from "../typings";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setUsersData } from "../slice/usersSlice";
import { setUniversitiesData } from "../slice/universitySlice";
import Footer from "../containers/Footer";
import UniversityUserTabs from "../containers/UniversityUserTabs";

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

  const dispatch = useAppDispatch();

  dispatch(setUsersData(props?.usersData));
  dispatch(setUniversitiesData(props?.universitiesData));

  // const userDataSt = useAppSelector((state) => state.userData.usersData);
  // const universityDataSt = useAppSelector(
  //   (state) => state.universityData.universitiesData
  // );

  // console.log("user-d", userDataSt);

  // console.log("universi-d", universityDataSt);

  return (
    <div className="h-screen ">
      {session &&
        status == "authenticated" &&
        // @ts-ignore
        session.data[0].user_status == "ACTIVE" &&
        // @ts-ignore
        session.data[0].user_type == "ADMIN" && (
          <>
            <main className="scroll-smooth bg-gradient-to-br from-red-50 via-white to-red-50 h-screen scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] z-100 scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
              <div className="">
                <div className="bg-gradient-to-br  from-black via-black  to-[#85002a] shadow-md shadow-red-600">
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
                <div className="bg-gradient-to-br from-black via-black  to-[#85002a] ">
                  <div className="max-w-[82rem] mx-auto">
                    <Footer />
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // security at server side to check the authentication status of the user
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
    if (session.data[0].user_status == "ACTIVE") {
      // @ts-ignore
      if (session.data[0].user_type == "STUDENT") {
        return {
          redirect: {
            destination: "/student",
            permanent: false,
          },
        };
      }
      // @ts-ignore
      if (session.data[0].user_type == "INTERN") {
        return {
          redirect: {
            destination: "/intern",
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
    if (session.data[0].user_status == "ACTIVE") {
      //getUsers API
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      };

      let usersData = null;
      try {
        const userRes = await axios.get(
          `${process.env.SIDEHUSSLR_API}/allUser`,
          customConfig
        );
        let usersData = null;
        if (userRes?.data?.success == true) {
          usersData = await userRes.data.data;
        }

        // Work with the response...
      } catch (err) {
        // Handle error
        console.log(err);
      }

      //JSON WEB SERVER API

      let universitiesData = null;
      const customConfig1 = {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          // Authorization: `Bearer ${session.accessToken}`,
        },
      };
      try {
        const uniRes = await axios.get(
          `${process.env.SIDEHUSSLR_TEST_API}/university`,
          customConfig1
        );

        console.log("uni :", uniRes);
        if (uniRes?.data?.status == "201") {
          universitiesData = await uniRes.data.data;
        }
        // Work with the response...
      } catch (err) {
        // Handle error
        console.log(err);
      }

      console.log("u-dat : ", universitiesData);

      return {
        props: {
          usersData,
          universitiesData,
        },
      };
    }
  }
}
