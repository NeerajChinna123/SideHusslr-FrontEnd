import { useState } from "react";
import {useSession } from "next-auth/react";
import {
  UserCircleIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "../lib/constants";

export default function UserDropdown({signOut}) {
  const { data: session } = useSession();

  const [openPopover, setOpenPopover] = useState(false);

  const router = useRouter();

  return (
    <motion.div {...FADE_IN_ANIMATION_SETTINGS} className="relative">
      <motion.div
        onClick={() => {
          setOpenPopover(!openPopover);
        }}
        {...FADE_IN_ANIMATION_SETTINGS}
        // whileTap={{ scale: 0.96 }}
        className="flex items-center space-x-2 transition-all duration-200 ease-in-out hover:text-[#f9004d] cursor-pointer  p-2"
      >
        <UserCircleIcon className="md:h-6 md:w-6 h-8 w-8 animate-pulse text-semibold" />
        <div>
          <p className=" text-semibold text-lg tracking-wide text-center">
            {session?.data[0]?.first_name}
          </p>
        </div>
      </motion.div>
      {openPopover && (
        <motion.div
          {...FADE_IN_ANIMATION_SETTINGS}
          class="absolute z-100 inline-block w-40 text-sm left-[-2.1rem] md:left-[-2.5rem] bg-black  border rounded-md   cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition-all duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white"
        >
          <motion.div
            onClick={() => {
              router.push("/");
            }}
            className="flex items-center tracking-wide bg-black rounded-t-md border border-red-600 space-x-2 py-3 justify-center cursor-pointer transition-all duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
          >
            <HomeIcon className="h-6 w-6 animate-pulse text-semibold" />
            <div>
              <p className=" text-center tracking-wider text-[0.9rem] text-white font-semibold">
                Home
              </p>
            </div>
          </motion.div>

          <motion.div
            onClick={() => {
              signOut();
            }}
            className="flex items-center tracking-wide bg-black border-red-600 border rounded-b-md space-x-2 py-3 cursor-pointer justify-center transition-all duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 animate-pulse text-semibold" />
            <div>
              <p className=" text-center tracking-wider text-[0.9rem] text-white font-semibold">
                Sign Out
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
