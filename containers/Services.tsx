import React, { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

import Card from "../components/Card";

function Services() {
  return (
    <div>
      <AnimateSharedLayout>
        <div className="mt-7 md:mt-10  px-[1.2rem] md:px-6">
          <div className="flex flex-col space-y-3 md:space-y-6">
            <div className="text-center">
              <p className="text-[2.6rem] md:text-[3.5rem] font-[800] font-poppins tracking-wide">
                Our Service
              </p>
              <div className=" mt-3 items-center justify-center flex flex-row">
                <p className=" text-gray-700 md:max-w-[30rem]  text-center font-poppins ml-[0.1rem]  text-lg  leading-7 md:leading-7 tracking-wide">
                  We provide end to end educational support for our customers.
                </p>
              </div>
            </div>
            <motion.div
              layout
              className="grid flex-wrap gap-8  md:grid-cols-2  md:justify-center md:gap-10 pt-8 md:pt-10 lg:grid-cols-3"
            >
              <Card
                key="1"
                layoutId="1"
                cardTitle="Analyze & Solution"
                cardDescription="We as a team first analyze the problems first and come up with strategies to tackle the problems."
              />
              <Card
                key="2"
                layoutId="2"
                cardTitle="Development & customer reporting"
                cardDescription="Once solution strategies are finalised we get into development phase and customers will be notified with the progress."
              />
              <Card
                key="3"
                layoutId="3"
                cardTitle="Timely Delivery"
                cardDescription="We as a team thrive to delivery the solution on time every time."
              />
            </motion.div>
          </div>
        </div>
      </AnimateSharedLayout>
    </div>
  );
}

export default Services;
