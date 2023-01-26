import Header from "../components/Header";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/husslr.json";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../lib/constants";

function StudentBanner() {
  const description =
    "Our platform provides easy access to your course information and assignment status, allowing you to stay organized and on top of your work. Never miss a deadline again!. You can focus on what really matters - learning and achieving your academic goals";

  return (
    <div className="max-w-[82rem] mx-auto px-[1.2rem] md:px-6 mb-[4rem] lg:mb-[8rem]">
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
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        <motion.div className="flex ">
          <motion.div className="flex-col flex mt-[2rem] md:mt-[4rem] space-y-6">
            <motion.div
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="text-black text-center md:text-start text-[2.7rem] md:text-[4rem] leading-[4rem] md:leading-[5.4rem] font-[900] md:font-[900] font-poppins tracking-wide capitalize"
            >
              <span className="">
                <Balancer>
                  Your one-stop hub for all your{" "}
                  <span className="text-red-600">academic needs .</span>
                </Balancer>
              </span>
            </motion.div>
            <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="">
              <p className="text-[0.8rem] text-center md:text-start md:text-[1rem] leading-6 md:leading-8 tracking-wide text-gray-800 font-base font-poppins">
                {description}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="flex justify-center">
          <Lottie
            loop
            animationData={animationData}
            play
            className="md:w-[36rem] md:h-[32rem] w-[30rem] h-[18rem]  lg:ml-12 md:mt-3 "
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default StudentBanner;
