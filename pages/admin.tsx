import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";

function Admin() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (!session && status == "unauthenticated") {
    router.push("/");
  }

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

export default Admin;
