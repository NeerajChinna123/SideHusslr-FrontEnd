import { useEffect, useRef, useState } from "react";
import Universities from "./Universities";
import Users from "./Users";

const tabsData = [
  {
    label: "Universities",
    content: "Universities",
  },
  {
    label: "Users",
    content: "Users",
  },
];

export default function UniversityUserTabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      //@ts-ignore
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      //@ts-ignore
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="max-w-7xl mx-auto mt-4 lg:mt-12 ">
      <div className="relative">
        <div className="flex space-x-2 md:space-x-10 justify-center pb-[0.2rem] md:pb-[0.3rem] border-b-2 border-gray-200">
          {tabsData.map((tab, idx) => {
            return (
              <button
                key={idx}
                //@ts-ignore
                ref={(el) => (tabsRef.current[idx] = el)}
                className={
                  `pt-2 pb-3 px-[3rem] md:px-[10rem] text-md font-poppins tracking-wide ` +
                  `${
                    tabsRef.current[idx] == tabsRef.current[activeTabIndex] &&
                    "text-red-500 font-semibold"
                  }`
                }
                onClick={() => setActiveTabIndex(idx)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="">
          <span
            className="absolute bottom-0  z-auto block h-1 bg-red-500 transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </div>
      </div>
      <div className="py-4 md:px-1">
        {tabsData[activeTabIndex].content == "Universities" ? (
          <Universities />
        ) : (
          <Users />
        )}
      </div>
    </div>
  );
}
