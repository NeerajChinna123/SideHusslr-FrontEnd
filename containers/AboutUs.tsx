import { useState, useEffect, useRef } from "react";
import animationData from "../lottie-aminations/lottie-animation.json";
import Lottie from "react-lottie-player";


function AboutUs() {

  //Implemented IntersectionObserver inorder to identify whether the progress bar has mounted or not, 
  //and update the state of the width to apply the transition animaton for the progress bar

  function useIsVisible(ref: any) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );

      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }, [ref]);

    return isIntersecting;
  }

  const [analyzeWidth, setAnalyzeWidth] = useState("0");
  const [managementWidth, setManagementWidth] = useState("0");
  const [developmentWidth, setDevelopmentWidth] = useState("0");
  const [otdWidth, setOtdWidth] = useState("0");

  const analyzeRef = useRef(null);
  const managementRef = useRef(null);
  const developmentRef = useRef(null);
  const otdRef = useRef(null);

  const isVisibleAnalyze = useIsVisible(analyzeRef);
  const isVisibleManage = useIsVisible(managementRef);
  const isVisibleDev = useIsVisible(developmentRef);
  const isVisibleOtd = useIsVisible(otdRef);

  useEffect(() => {
    if (!isVisibleAnalyze) {
      setTimeout(() => {
        setAnalyzeWidth("0%");
      }, 100);
    }
    if (isVisibleAnalyze) {
      setTimeout(() => {
        setAnalyzeWidth("25%");
      }, 100);
    }
  }, [isVisibleAnalyze]);

  useEffect(() => {
    if (!isVisibleManage) {
      setTimeout(() => {
        setManagementWidth("0%");
      }, 100);
    }
    if (isVisibleManage) {
      setTimeout(() => {
        setManagementWidth("50%");
      }, 100);
    }
  }, [isVisibleManage]);

  useEffect(() => {
    if (!isVisibleDev) {
      setTimeout(() => {
        setDevelopmentWidth("0%");
      }, 100);
    }
    if (isVisibleDev) {
      setTimeout(() => {
        setDevelopmentWidth("75%");
      }, 100);
    }
  }, [isVisibleDev]);

  useEffect(() => {
    if (!isVisibleOtd) {
      setTimeout(() => {
        setOtdWidth("0%");
      }, 100);
    }
    if (isVisibleOtd) {
      setTimeout(() => {
        setOtdWidth("100%");
      }, 100);
    }
  }, [isVisibleOtd]);

  return (
    <div className="mt-12 md:mt-20 flex flex-col md:flex-row">
      <div
        id="aboutUs"
        className="space-y-3 md:space-y-6"
      >
        <div>
          <p className="text-[2.6rem] md:text-[3.5rem] font-[800] font-ubuntu tracking-wide">
            What do we do ?
          </p>
        </div>
        <div>
          <p className=" text-gray-800 font-poppins ml-[0.1rem]  text-md  leading-6 md:leading-8 tracking-wide  ">
            We understand the challenges that students face when it comes to
            completing assignments and projects in computer science, data
            analytics, and other related fields. That's why we offer a wide
            range of services designed to help students achieve their academic
            goals. Our team of experts is highly qualified and experienced in
            their respective fields, and they are dedicated to providing
            students with the support and guidance they need to succeed. Whether
            you need help with a specific assignment or project, or you're
            looking for ongoing support throughout the semester, we're here to
            help. Our goal is to help students achieve their full potential, and
            we pride ourselves on providing personalized, effective solutions to
            meet each student's unique needs.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="">
            <div>
              <p className="text-[1.8rem] md:text-[2.4rem] font-[450] text-start font-ubuntu tracking-wide">
                Our Working Process &gt;
              </p>
            </div>
            <div className="mt-3 space-y-4">
              <div className="">
                <div className="flex px-[0.1rem] text-md text-poppins font-semibold">
                  <div ref={analyzeRef} className="flex-1">
                    Analyze
                  </div>
                  <p className="">25%</p>
                </div>

                <div
                  className={`h-7 md:h-[2.4rem] rounded-md flex mt-2 bg-[#dddddd]`}
                >
                  <div
                    style={{
                      width: analyzeWidth,
                    }}
                    className={`bg-gradient-to-r from-blue-600 rounded-md transition-all ease-out duration-1000 via-blue-400 to-blue-300`}
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex px-[0.1rem] text-md text-poppins font-semibold">
                  <div ref={managementRef} className="flex-1">
                    Managment
                  </div>
                  <p className="">50%</p>
                </div>

                <div
                  className={`h-7 md:h-[2.4rem] rounded-md flex mt-2 bg-[#dddddd]`}
                >
                  <div
                    style={{
                      width: managementWidth,
                    }}
                    className={`bg-gradient-to-r from-orange-600 rounded-md transition-all ease-out duration-1000 via-orange-400 to-orange-300`}
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex px-[0.1rem] text-md text-poppins font-semibold">
                  <div ref={developmentRef} className="flex-1">
                    Development
                  </div>
                  <p className="">75%</p>
                </div>

                <div
                  className={`h-7 md:h-[2.4rem] rounded-md flex mt-2 bg-[#dddddd]`}
                >
                  <div
                    style={{
                      width: developmentWidth,
                    }}
                    className={`bg-gradient-to-r from-purple-600 rounded-md transition-all ease-out duration-1000 via-purple-400 to-purple-300`}
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex px-[0.1rem] text-md text-poppins font-semibold">
                  <div ref={otdRef} className="flex-1">
                    On Time Delivery
                  </div>
                  <p className="">100%</p>
                </div>

                <div
                  className={`h-7 md:h-[2.4rem] rounded-md flex mt-2 bg-[#dddddd]`}
                >
                  <div
                    style={{
                      width: otdWidth,
                    }}
                    className={`bg-gradient-to-r from-green-600 transition-all rounded-md ease-out duration-1000 via-green-500 to-green-400`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Lottie
              loop
              animationData={animationData}
              play
              className="w-[23rem] h-[26rem] md:w-[650px] md:h-[500px] lg:mt-[-1rem] ml-[-0.2rem]  md:ml-[4rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
