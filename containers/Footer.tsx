import Image from "next/image";
import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";

function Footer() {
  const urls = [
    "https://mobile.twitter.com/SideHusslr",
    "https://www.linkedin.com/company/sidehusslr/",
    "https://www.instagram.com/sidehusslr/",
    "https://www.facebook.com/profile.php?id=100089574185149&mibextid=LQQJ4d"
  ];
  return (
    <div className="">
      <div
        // whileInView={{ opacity: [0, 1] }}
        // transition={{ duration: 1 }}
        className="mt-[4rem] lg:mt-[8rem] py-10 lg:py-14 px-[0.8rem] lg:pl-2 lg:pr-0"
      >
        <div className="flex flex-col space-y-4 lg:flex-row items-center">
          <div className="justify-start relative h-[6rem] w-[6rem]">
            <Image
              alt=""
              className=""
              layout="fill"
              objectFit="contain"
              src={"/logo.png"}
            />
          </div>
          <div className="flex mx-auto lg:pl-[7rem] space-x-4">
            {urls.map((url) => (
              <motion.div
                whileTap={{ scale: 0.96 }}
                className="flex items-center tracking-wide space-x-1 border rounded-full  p-1 cursor-pointer justify-center shadow-md shadow-red-800 border-[#f9004d] transition duration-300 ease-in-out border-solid  hover:bg-[#f9004d] hover:text-white "
              >
                <SocialIcon
                  key={url}
                  className=" transform transition duration-500 hover:scale-125 animate-spin "
                  bgColor="transparent"
                  fgColor="white"
                style={{width:'40px',height:'40px'}}
                  url={url}
                />
              </motion.div>
            ))}
          </div>
          <div className="pt-4 lg:pt-0 lg:w-[13rem] lg:leading-6 text-center">
              <p className="text-gray-100 font-poppins text-[0.8rem] tracking-wide">Copyright © 2023 Side Husslr. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
