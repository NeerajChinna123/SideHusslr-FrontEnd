import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/lottie-animation.json";
import { SocialIcon } from "react-social-icons";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="manifest.json" />
        <title>Side Husslr</title>
        <meta
          name="description"
          content="Trydo – Multipurpose React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Trydo React Template will create that various landing Template, Creative Agency, And Corporate Website ."
          data-react-helmet="true"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" ">
        <div id="root" className="scroll-smooth">
          <header className="header-area formobile-menu header--transparent default-color ">
            <div className="header-wrapper " id="header-wrapper">
              <div className="header-left">
                <div className="h-[6rem] w-[6rem]">
                  <a href="#">
                    <img
                      src="/logo.png"
                      alt="Digital Agency"
                      className="logo"
                    />
                  </a>
                </div>
              </div>
              <div className="header-right">
                <nav className="mainmenunav d-lg-block">
                  <ul className="mainmenu">
                    <li className="has-droupdown">
                      <a href="#">Home</a>
                    </li>

                    <li>
                      <a href="#about-us">About Us</a>
                    </li>
                  </ul>
                </nav>

                <div className="humberger-menu d-block d-lg-none pl--20">
                  <span className="menutrigger text-white">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </span>
                </div>
                <div className="close-menu d-block d-lg-none">
                  <span className="closeTrigger">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </header>
          <div className="slider-wrapper bg_image--13">
            <div className="slider-activation ">
              <div
                className="slide slide-style-2 d-flex align-items-center justify-content-center "
                data-black-overlay="8"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="inner text-left">
                        <span>We are Consultants</span>
                        <h1 className="title">
                          Support &amp; Educational Solutions for Students.
                        </h1>
                        <div className="slide-btn">
                          <a
                            className="rn-button-style--2 btn-solid"
                            href="#about-us"
                          >
                            About Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rn-about-area ptb--120 bg_color--1" id="about-us">
            <div className="rn-about-wrapper">
              <div className="container">
                <div className="row row--35 align-items-center">
                  <div className="col-lg-6">
                    <div className="about-inner inner">
                      <div className="section-title">
                        <h2 className="title">What do we do?</h2>
                        <p className="description">
                          We are Consultants who provide end-to-end solutions
                          for students and other professionals.
                        </p>
                      </div>
                      <div className="row mt--30">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="about-us-list">
                            <h3 className="title">Our Working Process.</h3>
                            <div className="rn-progress-bar progress-bar--3">
                              <div className="single-progress custom-color--1">
                                <h6 className="title">Analyze</h6>
                                <div className="progress">
                                  <div
                                    // role="progressbar"
                                    className="progress-bar"
                                    // aria-valuenow="25"
                                    // aria-valuemin="0"
                                    // aria-valuemax="100"
                                    style={{ width: "25%" }}
                                  ></div>
                                </div>
                                <span className="label">25%</span>
                              </div>
                              <div className="single-progress custom-color--2">
                                <h6 className="title">Managment</h6>
                                <div className="progress">
                                  <div
                                    // role="progressbar"
                                    className="progress-bar"
                                    // aria-valuenow="50"
                                    // aria-valuemin="0"
                                    // aria-valuemax="100"
                                    style={{ width: "50%" }}
                                  ></div>
                                </div>
                                <span className="label">50%</span>
                              </div>
                              <div className="single-progress custom-color--3">
                                <h6 className="title">Development</h6>
                                <div className="progress">
                                  <div
                                    // role="progressbar"
                                    className="progress-bar"
                                    // aria-valuenow="75"
                                    // aria-valuemin="0"
                                    // aria-valuemax="100"
                                    style={{ width: "75%" }}
                                  ></div>
                                </div>
                                <span className="label">75%</span>
                              </div>
                              <div className="single-progress custom-color--4">
                                <h6 className="title">On Time Delivery</h6>
                                <div className="progress">
                                  <div
                                    // role="progressbar"
                                    className="progress-bar"
                                    // aria-valuenow="100"
                                    // aria-valuemin="0"
                                    // aria-valuemax="100"
                                    style={{ width: "100%" }}
                                  ></div>
                                </div>
                                <span className="label">100%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 ml-[-1rem] md:ml-[4rem] md:mt-[5rem]">
                    <Lottie
                      // id="player-lottie"

                      loop
                      animationData={animationData}
                      play
                      className="h-[455px] w-[345px] md:h-[720px] md:w-[620px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-area creative-service-wrapper pb--120 bg_color--1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center mb--30">
                    <p className=" text-5xl">Our Service</p>
                    <p>
                      We provide end to end educational support <br /> for our
                      customers.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row creative-service">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <a className="text-center" href="/service-details">
                    <div className="service service__style--2">
                      <div className="icon">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                          <line x1="2" y1="20" x2="2" y2="20"></line>
                        </svg>
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Analyze &amp; Solution Strategy
                        </h3>
                        <p>
                          We as a team first analyze the problems first and come
                          up with strategies to tackle the problems.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <a className="text-center" href="/service-details">
                    <div className="service service__style--2">
                      <div className="icon">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                          <polyline points="2 17 12 22 22 17"></polyline>
                          <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Development &amp; Customer Reporting
                        </h3>
                        <p>
                          Once solution strategies are finalised we get into
                          development phase and customers will be notified with
                          the progress.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                  <a className="text-center" href="/service-details">
                    <div className="service service__style--2">
                      <div className="icon">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div className="content">
                        <h3 className="title">Timely Delivery</h3>
                        <p>
                          We as a team thrive to delivery the solution on time
                          every time.
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="rn-brand-area pb--120 bg_color--1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <ul className="brand-style-2">
                    <li>
                      <img src="../stanford-university.png" alt="Logo Images" />
                    </li>
                    <li>
                      <img src="../MIT.png" alt="Logo Images" />
                    </li>
                    <li>
                      <img src="../GT.png" alt="Logo Images" />
                    </li>
                    <li>
                      <img
                        src="../university-of-california.png"
                        alt="Logo Images"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="backto-top">
            <div
              style={{
                position: "fixed",
                bottom: "50px",
                right: "30px",
                cursor: "pointer",
                transition: "opacity 0.2s linear 0s, visibility",
                opacity: 0,
                visibility: "hidden",
              }}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>
          <div
            className="footer-style-2 ptb--30 bg_image bg_image--1"
            data-black-overlay="6"
          >
            <div className="wrapper plr--50 plr_sm--20">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="inner">
                    <div className="logo text-center text-sm-left mb_sm--20 w-[6rem] h-[6rem]">
                      <a href="#">
                        <img
                          src="../logo.png"
                          alt="Logo images"
                          className="logo-image"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="inner text-center">
                    <ul className="social-share rn-lg-size flex justify-center liststyle">
                      <li>
                        <SocialIcon
                          className="h-3 w-3 transform my-social-icon transition duration-500 text-gray-400 hover:scale-125 "
                          bgColor="transparent"
                          fgColor="rgba(198, 201, 216, 0.75)"
                          url="https://www.facebook.com/"
                        />
                      </li>
                      <li>
                        <SocialIcon
                          className="h-3 w-3 transform my-social-icon transition duration-500 text-gray-400 hover:scale-125 "
                          bgColor="transparent"
                
                          fgColor="rgba(198, 201, 216, 0.75)"
                          url="https://www.linkedin.com/"
                        />
                      </li>
                      <li>
                       
                        <SocialIcon
                          className="h-3 w-3 transform my-social-icon transition duration-500 text-gray-400 hover:scale-125 "
                          bgColor="transparent"
                          fgColor="rgba(198, 201, 216, 0.75)"
                          url="https://www.instagram.com/"
                        />
                      </li>
                      <li>
                        <SocialIcon
                          className="h-3 w-3 transform my-social-icon transition duration-500 text-gray-400 hover:scale-125 "
                          bgColor="transparent"
                          fgColor="rgba(198, 201, 216, 0.75)"
                          url="https://twitter.com/"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="inner text-lg-right text-center mt_md--20 mt_sm--20">
                    <div className="text">
                      <p>Copyright © 2023 Side Husslr. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
