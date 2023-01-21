import { useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function Redirect() {
  const { data: session, status } = useSession();

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

  if (session && status == "authenticated") {
    // @ts-ignore
    if (session.data[0].user_status == "ACTIVE") {
      // @ts-ignore
      if (session.data[0].user_type == "ADMIN") {
        delay(100).then(() => router.push("/admin"));
      }
      // @ts-ignore
      if (session.data[0].user_type == "STUDENT") {
        delay(100).then(() => router.push("/student"));
      }
      // @ts-ignore
      if (session.data[0].user_type == "INTERN") {
        delay(100).then(() => router.push("/intern"));
      }
    } else {
      delay(100).then(() => router.push("/"));
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
