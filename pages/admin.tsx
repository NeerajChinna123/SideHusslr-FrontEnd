import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { usersDataType } from "../typings";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setUsersData } from "../slice/usersSlice";

export interface propsData {
  usersData: [usersDataType];
}
export default function Admin(props: propsData) {
  const { data: session, status } = useSession();

  const router = useRouter();

  //extra security client side to check the authentication status of the user
  if (!session && status == "unauthenticated") {
    router.push("/auth/signIn");
  }

  const dispatch = useAppDispatch();

  dispatch(setUsersData(props.usersData));

  const userDataSt = useAppSelector((state) => state.userData.usersData);

  console.log("u-d-s", userDataSt);

  return (
    <div className="h-screen">
      {session &&
        status == "authenticated" &&
        // @ts-ignore
        session.data[0].user_status == "ACTIVE" &&
        // @ts-ignore
        session.data[0].user_type == "ADMIN" && (
          <main className="scroll-smooth bg-gradient-to-br from-red-50 via-white to-red-200 h-screen scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] z-100 scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
            <div className="">
              <div className="sticky top-0 z-50 bg-gradient-to-br  from-black via-black  to-[#85002a] shadow-md shadow-red-600">
                <div className="max-w-[82rem]   mx-auto sticky top-0 z-50">
                  <div>
                    <div className="py-2">
                      <Header page="admin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
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
      const customConfig = {
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Bearer ${session.accessToken}`,
        },
      };
      const res = await axios.get(
        `${process.env.SIDEHUSSLR_API}/allUser`,
        customConfig
      );
      let usersData = null;
      if (res?.data?.success == true) {
        usersData = await res.data.data;
      }
      return {
        props: {
          usersData,
        },
      };
    }
  }
}
