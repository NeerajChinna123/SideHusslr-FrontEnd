import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";

function Admin() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (session && status == "authenticated") {
    if (session.data[0].user_status == "ACTIVE") {
      if (session.data[0].user_type == "STUDENT") {
        router.push("/student");
      }
      if (session.data[0].user_type == "INTERN") {
        router.push("/intern");
      }
    } else {
      router.push("/");
    }
  }

  if (!session && status == "unauthenticated") {
    router.push("/");
  }

  return (
    <>
      {session &&
        status == "authenticated" &&
        session.data[0].user_status == "ACTIVE" &&
        session.data[0].user_type == "ADMIN" && (
          <main className="scroll-smooth scrollbar-w-[5px] scrollbar-thin md:scrollbar-w-[8px] scrollbar-thumb-red-600  scrollbar-thumb-rounded-full  scrollbar-thumb-h-[2rem]">
            <div className="h-screen">
              <div className="bg-gradient-to-br pb-4 from-black via-black  to-[#85002a] ">
                <div className="max-w-[82rem] mx-auto">
                  <div>
                    <div className="pt-4 md:pt-6">
                      <Header page="admin" />
                    </div>
                  </div>
                </div>
              </div>
              ADMIN
            </div>
          </main>
        )}
    </>
  );
}

export default Admin;
