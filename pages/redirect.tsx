import { useSession, signIn, signOut } from "next-auth/react";

function redirect() {
  const { data: session } = useSession();
  console.log("ses", session);
  return <div>redirect</div>;
}

export default redirect;
