import Image from "next/image";

function PartneredUniversities() {
  return (
    <div>
      <div
        // whileInView={{ opacity: [0, 1] }}
        // transition={{ duration: 1 }}
        className="mt-[4rem] lg:mt-[8rem] lg:px-[12rem]"
      >
        <div className="flex flex-wrap gap-x-6  lg:gap-x-0 justify-center md:space-x-20">
          <div className=" relative h-[6rem] w-[6rem] md:h-[9rem] md:w-[9rem]">
            <Image
              alt=""
              className="opacity-75 hover:opacity-100 transition duration-500 ease-in-out hover:scale-105"
              layout="fill"
              objectFit="contain"
              src={"/stanford-university.png"}
            />
          </div>
          <div className=" relative h-[6rem] w-[6rem] md:h-[10rem] md:w-[10rem]">
            <Image
              alt=""
              className="opacity-75 hover:opacity-100 transition duration-500 ease-in-out hover:scale-105"
              layout="fill"
              objectFit="contain"
              src={"/MIT-2.png"}
            />
          </div>
          <div className=" relative h-[6rem] w-[6rem] md:h-[10rem] md:w-[10rem]">
            <Image
              alt=""
              className="opacity-75 hover:opacity-100 transition duration-500 ease-in-out hover:scale-105"
              layout="fill"
              objectFit="contain"
              src={"/GT-2.png"}
            />
          </div>
          <div className=" relative h-[6rem] w-[6rem] pl-0 md:h-[10rem] md:w-[10rem]">
            <Image
              alt=""
              className="opacity-75 hover:opacity-100 transition duration-500 ease-in-out hover:scale-105"
              layout="fill"
              objectFit="contain"
              src={"/university-of-california.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartneredUniversities;
