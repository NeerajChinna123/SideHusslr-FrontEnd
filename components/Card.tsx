import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DocumentMagnifyingGlassIcon, ClockIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export interface cardData {
  cardTitle: string;
  layoutId: string;
  cardDescription: string;
}

function Card(props: cardData) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <div >  
      <motion.div
        layout
        className="group  rounded-md shadow-md shadow-gray-300 "
      >
        {/* <div className=" absolute  h-full w-full   group-hover:bg-gradient-to-r transition opacity-0 group-hover:opacity-100 duration-500 ease-in-out group-hover:scale-105 group-hover:from-[#f61b10] group-hover:to-[#ef0963]"></div> */}
        <motion.div
          layout
          onClick={toggleOpen}
          className="cursor-pointer rounded-md px-10 py-12  z-100   transition duration-500 ease-in-out bg-[#f9004d] md:bg-[#f7f6f6] md:group-hover:bg-[#f9004d] "
          layoutId={`certi-${props.layoutId}`}
        >
          <motion.div
            layout
            className="flex-col items-center justify-center text-center"
          >
            {props?.layoutId != "1" ? (
              props?.layoutId == "2" ? (
                <motion.div layout className="">
                  <ChatBubbleBottomCenterTextIcon className="h-20 w-20 md:text-[#f9004d] text-white mx-auto md:group-hover:text-white" />
                </motion.div>
              ) : (
                <motion.div layout  className="overflow-hidden">
                  <ClockIcon className="h-20 w-20 md:text-[#f9004d] text-white mx-auto md:group-hover:text-white" />
                </motion.div>
              )
            ) : (
              <motion.div layout  className="overflow-hidden">
                <DocumentMagnifyingGlassIcon className="h-20 w-20 md:text-[#f9004d] text-white mx-auto md:group-hover:text-white" />
              </motion.div>
            )}
            <motion.p
              layout
              className="pt-4 text-[1.6rem] overflow-hidden md:text-[1.9rem] font-[500]  text-center leading-9 md:leading-10 font-ubuntu text-white md:text-black md:group-hover:text-white"
            >
              {props?.cardTitle}
            </motion.p>
          </motion.div>
          
          <motion.div layout>
          <AnimatePresence >
            {isOpen && (
              <motion.div
              
                className={" mt-4"}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p className="md:text-gray-700 max-w-[30rem] md:group-hover:text-white  text-white  text-center font-poppins ml-[0.1rem]  text-lg  leading-7 tracking-wide">
                  {props?.cardDescription}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
      </div>  
    </>
  );
}

export default Card;
