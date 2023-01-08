import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Lottie from "react-lottie-player";
import animationData from "../lottie-aminations/lottie-animation.json";
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

        <style></style>

        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <style type="text/css">
          {/* @font-face {
        font-family: Roboto;
        src: url("chrome-extension://mcgbeeipkmelnpldkobichboakdfaeon/css/Roboto-Regular.ttf");
      } */}
        </style>
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
                  <div  className="col-lg-5 ml-[1rem] md:ml-[4rem] md:mt-[5rem]">
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
                      <img
                        src="../stanford-university.png"
                        alt="Logo Images"
                      />
                    </li>
                    <li>
                      <img
                        src="../MIT.png"
                        alt="Logo Images"
                      />
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
                    <ul className="social-share rn-lg-size d-flex justify-content-center liststyle">
                      <li>
                        <a href="https://www.facebook.com/">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 448 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                          </svg>
                        </a>
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
