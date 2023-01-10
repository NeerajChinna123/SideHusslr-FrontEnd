import React from "react";
import Header from "../components/Header";
// import ProgressBar from "../components/ProgressBar";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/Roatating _Planet.json";

function AboutUs() {
  return (
    <div className="my-20 flex flex-col md:flex-row">
      <div id="aboutUs" className=" space-y-6">
        <div>
          <p className="text-[3.5rem] font-[800] font-ubuntu tracking-wide">
            What do we do ?
          </p>
        </div>
        <div>
          <p className=" text-gray-800 font-poppins  text-md  leading-6 md:leading-8 tracking-wide  ">
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
        <div>
          <div>
            <p className="text-[2.8rem] font-[450] font-ubuntu tracking-wide">
              Our Working Process &gt;
            </p>
          </div>
          {/* <ProgressBar
            label="Analyze"
            backgroundColor="#C5C5C5"
            visualParts={[
              {
                percentage: "25%",
                from: "tan",
                to:"red"
              },
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
