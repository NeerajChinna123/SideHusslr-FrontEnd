import { useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function redirect() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
  }, []);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }


  if (session && status == "authenticated") {
    ref?.current?.complete();
    if (session.data[0].user_status == "ACTIVE") {
      if (session.data[0].user_type == "ADMIN") {
        delay(600).then(() => router.push("/admin"));
      }
      if (session.data[0].user_type == "STUDENT") {
        delay(600).then(() => router.push("/student"));
      }
      if (session.data[0].user_type == "INTERN") {
        delay(600).then(() => router.push("/intern"));
      }
    } else {
      delay(600).then(() => router.push("/"));
    }
  }

  if (!session && status == "unauthenticated") {
    ref?.current?.complete();
    delay(600).then(() => router.push("/"));
  }

  return (
    <div>
      <LoadingBar height={4} className="bg-red-600" ref={ref} />
    </div>
  );
}

export default redirect;
