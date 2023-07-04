import { useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function Redirect() {
  const { data: session, status } = useSession();

  console.log("sess-new ", session);
  console.log("status-new ", status);

  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    ref?.current?.continuousStart();
    // @ts-ignore
    ref?.current?.complete();
  }, []);

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // @ts-ignore
  if (session?.error === "RefreshAccessTokenError") {
    signOut({ callbackUrl: "/auth/signIn", redirect: false });
  }

  if (session && status == "authenticated") {
    // @ts-ignore
    if (session.data.user_status == "ACTIVE") {
      // @ts-ignore
      if (session.data.user_type == "ADMIN") {
        delay(100).then(() => router.push("/admin"));
      }
      // @ts-ignore
      if (session.data.user_type == "STUDENT") {
        // @ts-ignore
        delay(100).then(() => router.push(`/student/${session.data.user_id}`));
      }
      // @ts-ignore
      if (session.data.user_type == "INTERN") {
        // @ts-ignore
        delay(100).then(() => router.push(`/intern/${session.data.user_id}`));
      }
    } else {
      delay(100).then(() => router.push("/auth/signIn"));
    }
  }

  if (!session && status == "unauthenticated") {
    delay(100).then(() => router.push("/"));
  }

  return (
    <div>
      <LoadingBar height={4} className="bg-red-600" ref={ref} />
    </div>
  );
}

export default Redirect;
