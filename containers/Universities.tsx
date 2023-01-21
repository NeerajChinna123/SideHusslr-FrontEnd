import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { universityDataType } from "../typings";
import { useAppSelector } from "../hooks";
import University from "../components/University";
import UniversityFormModal from "../components/UniversityFormModal";

function Universities() {
  const universityDataSt = useAppSelector(
    (state) => state.universityData.universitiesData
  );

  const [pageSize, setPageSize] = useState(10);

  const [universityModal, setUniversityModal] = useState(false);
  return (
    <div>
       <UniversityFormModal showUniversityModal={universityModal} setShowUniversityModal={setUniversityModal}  />
      <div className="py-6 px-4  flex items-center">
        <p className="font-[900] flex-1 font-sanSerif  tracking-wider text-4xl md:text-5xl">
          Universities
        </p>
        <motion.div
          whileTap={{ scale: 0.96 }}
          onClick={()=>{setUniversityModal(true)}}
          className="bg-red-600 p-5 shadow-md shadow-gray-400 cursor-pointer rounded-full"
        >
          <PlusIcon className="text-white h-5 w-5 md:h-7 md:w-7" />
        </motion.div>
      </div>

      <div className="px-5 py-4 md:py-6  grid grid-cols-1 grid-flow-row-dense lg:grid-cols-2 gap-x-8 gap-y-8 ">
        {universityDataSt
          .slice(0, pageSize)
          ?.map((university: universityDataType) => (
            <div className="w-full " key={university?.university_id}>
              <University data={university} />
            </div>
          ))}
      </div>
      {pageSize < universityDataSt?.length && (
        <motion.div
          //   variants={scaleVariants}
          //   whileInView={scaleVariants.whileInView}
          className="flex justify-center"
        >
          <motion.div
            whileTap={{ scale: 0.2 }}
            onClick={() => {
              setPageSize(pageSize + 4);
            }}
            className="mt-8 flex cursor-pointer group justify-center rounded-[0.2rem] bg-red-600 py-4 px-8 font-ubuntu text-lg font-semibold tracking-wide text-white shadow-md shadow-gray-400 transition duration-500 ease-in-out lg:px-8"
          >
            <p className="group-hover:scale-105  transition-transform duration-300 ease-in-out">
              Show More
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Universities;
