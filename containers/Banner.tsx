import Header from "../components/Header";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/Roatating _Planet.json";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../lib/constants";

function Banner() {
  const text = "Expert Educational Consultants Providing Quality ";
  const [text2] = useTypewriter({
    words: ["Assignments", "Projects", "and more .."],
    loop: false,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 1000,
  });
  return (
    <div>
      <div className="pt-4 md:pt-6">
        <Header page="Banner" />
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="flex mt-6  md:mt-6 px-[1.2rem] md:px-6"
      >
        <motion.div className="flex flex-col space-y-8">
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="text-white text-center md:text-start text-[2.8rem] md:text-[4.2rem] leading-[4rem] md:leading-[5.4rem] font-[800] md:font-[900] font-sanSerif tracking-wide capitalize"
          >
            <span className="lg:mr-12">
              <Balancer>{text}</Balancer>
            </span>
            <span className="text-red-600 font-[800] transition duration-100 ease-in-out ">
              {text2}
            </span>
            <Cursor cursorColor="red" />
          </motion.div>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="">
            <Balancer className="text-[0.8rem] text-center md:text-start md:text-[1rem] leading-6 md:leading-8 tracking-wide text-gray-300 font-base font-poppins">
              At SideHusslr, we are dedicated to helping students succeed in
              their academic pursuits. Our team of highly qualified and
              experienced consultants is here to provide personalized support
              and guidance on a wide range of educational projects, including
              assignments and many more. Contact us today to learn more about
              how we can support your learning journey.
            </Balancer>
          </motion.div>
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="justify-center flex md:justify-start"
          >
            <motion.a
              href="#aboutUs"
              whileTap={{ scale: 0.96 }}
              className="w-44 group  tracking-wide hover:bg-gray-300 rounded-md px-1 md:px-2 py-2 md:py-0 cursor-pointer justify-center shadow-md shadow-red-600  transition duration-300 ease-in-out  bg-[#f9004d] text-white hover:text-[#f9004d] "
            >
              <div className="py-2 md:py-4">
                <p className="transition uppercase duration-100 ease-in-out  text-center group-hover:font-bold tracking-wider font-semibold ">
                  About Us
                </p>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div className="hidden lg:block ">
          <Lottie
            loop
            animationData={animationData}
            play
            className="w-[655px] h-[500px]  mr-[-5rem] mt-3 "
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Banner;
