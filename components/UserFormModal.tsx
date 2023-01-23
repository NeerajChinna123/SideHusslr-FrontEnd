import Modal from "./modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingDots from "../icons/loading-dots";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { FADE_IN_ANIMATION_SETTINGS } from "../lib/constants";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  BuildingLibraryIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export interface userModalData {
  showUserModal: boolean;
  setShowUserModal: Dispatch<SetStateAction<boolean>>;
  universityDataStProp: [];
}

interface UserFormInput {
  jwtToken: string;
  first_name: string;
  last_name: string;
  contact: string;
  user_type: string;
  location: string;
  image: string;
  university_id: string;
}

function UserFormModal(props: userModalData) {
  const [error, setError] = useState<any>();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormInput>();

  const [role, setRole] = useState(null);

  const roles = ["ADMIN", "STUDENT", "INTERN"];

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const [rolePopover, setRolePopover] = useState(false);

  const [universityPopOver, setUniversityPopOver] = useState(false);

  const [universityD, setUniversityD] = useState(null);

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    setSubmitting(true);

    //post request
    //@ts-ignore
    if (universityD.university_id) {
      //@ts-ignore
      data.university_id = universityD.university_id;
    }
    //@ts-ignore
    data.user_type = role;

    const payload = data;

    console.log("data", data);

    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.SIDEHUSSLR_TEST_API}/users`,
        payload,
        customConfig
      );
      //@ts-ignore
      if (res?.status < "300") {
        delay(1000).then(() => {
          setSuccess(true);
          //   notify();
          toast.success("User Created Successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            // draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSubmitting(false);
          refreshData();
        });
      } else {
        //@ts-ignore
        setError(res?.message);
        setSuccess(false);
        setSubmitting(false);
      }
      // Work with the response...
    } catch (err) {
      // Handle error
      //@ts-ignore
      setError(err.message);
      setSuccess(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer className="font-bold text-sm text-black tracking-wide font-poppins" />
      <Modal
        showModal={props.showUserModal}
        setShowModal={props.setShowUserModal}
        successData={success}
        resetData={() => {
          reset({
            // username: "",
            // password: "",
            first_name: "",
            last_name: "",
            contact: "",
            user_type: "",
            location: "",
            image: "",
            university_id: "",
          });
        }}
        setSuccessData={setSuccess}
      >
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-xl md:border md:border-gray-100">
          <div className="flex flex-col  justify-center bg-white py-6 px-6">
            <div className="pb-4">
              <p className="text-gray-600 font-semibold text-3xl font-sanSerif">
                Create User
              </p>
            </div>
            <div className="text-red-600 font-semibold text-md text-center  p-2">
              {!submitting && error}
            </div>
            <div className="border-t border-gray-300"></div>
            <div className="flex flex-col gap-2">
              <input
                {...register("jwtToken")}
                name="jwtToken"
                type="hidden"
                //@ts-ignore
                value={`${session?.accessToken}`}
              />
              <div className="mt-4 flex space-x-3">
                <div>
                  <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                    First Name *
                  </p>
                  <input
                    className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                    type="text"
                    placeholder="Enter First Name"
                    {...register("first_name", {
                      required: true,
                    })}
                  ></input>
                </div>
                <div>
                  <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                    Last Name *
                  </p>
                  <input
                    className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                    type="text"
                    placeholder="Enter Last Name"
                    {...register("last_name", {
                      required: true,
                    })}
                  ></input>
                </div>
              </div>
              {/* <div className="mt-4"></div> */}

              <div className="mt-3">
                <p className="text-gray-600  text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  User Role *
                </p>
                {/* <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Select University"
                  {...register("university_id")}
                ></input> */}

                <motion.div
                  onClick={() => {
                    !rolePopover ? setRolePopover(true) : setRolePopover(false);
                  }}
                  className={
                    `mt-2  w-full cursor-pointer flex items-cente rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu shadow ` +
                    (rolePopover && ` rounded-b-none `)
                  }
                >
                  {role != null ? (
                    /* @ts-ignore */
                    <p className="text-black flex-1">{role}</p>
                  ) : (
                    <p className="text-gray-400 flex-1">Select Role</p>
                  )}
                  <div>
                    {rolePopover ? (
                      <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </motion.div>
                <div className="relative">
                  {rolePopover && (
                    <motion.div
                      {...FADE_IN_ANIMATION_SETTINGS}
                      className="w-full  absolute left-0 z-50 rounded-b-md bg-white border border-t-0 border-gray-300 "
                    >
                      <div className=" flex  flex-col max-h-[13.5rem] overflow-scroll ">
                        <>
                          <div
                            onClick={() => {
                              setRole(null), setRolePopover(false);
                            }}
                            className="border-b w-full px-4 py-2 group lg:hover:bg-red-600 transition-all duration-200 ease-in-out cursor-pointer"
                          >
                            <div className="self-center text-black text-sm lg:group-hover:text-white transition-all duration-200 ease-in-out font-poppins ">
                              {/* @ts-ignore */}
                              Select
                            </div>
                          </div>
                          {roles.map((ro) => (
                            <div
                              key={ro}
                              onClick={() => {
                                //@ts-ignore
                                setRole(ro), setRolePopover(false);
                              }}
                              className="border-b w-full px-4 py-2 group lg:hover:bg-red-600 transition-all duration-200 ease-in-out cursor-pointer"
                            >
                              <div className="flex justify-start space-x-4">
                                {/* @ts-ignore */}
                                <UserIcon className="h-[2rem] w-[2rem] text-red-600 lg:group-hover:text-black transition-all duration-200 ease-in-out" />

                                <div className="self-center text-black text-sm lg:group-hover:text-white transition-all duration-200 ease-in-out font-poppins ">
                                  {/* @ts-ignore */}
                                  {ro}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-gray-600  text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  University
                </p>
                {/* <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Select University"
                  {...register("university_id")}
                ></input> */}

                <motion.div
                  onClick={() => {
                    !universityPopOver
                      ? setUniversityPopOver(true)
                      : setUniversityPopOver(false);
                  }}
                  className={
                    `mt-2  w-full cursor-pointer flex items-cente rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu shadow ` +
                    (universityPopOver && ` rounded-b-none `)
                  }
                >
                  {universityD != null ? (
                    /* @ts-ignore */
                    <p className="text-black flex-1">{universityD?.name}</p>
                  ) : (
                    <p className="text-gray-400 flex-1">Select University</p>
                  )}
                  <div>
                    {universityPopOver ? (
                      <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </motion.div>
                <div className="relative">
                  {universityPopOver && (
                    <motion.div
                      {...FADE_IN_ANIMATION_SETTINGS}
                      className="w-full  absolute left-0 z-50 rounded-b-md bg-white border border-t-0 border-gray-300 "
                    >
                      <div className=" flex  flex-col max-h-[13.5rem] overflow-scroll ">
                        <>
                          <div
                            onClick={() => {
                              setUniversityD(null), setUniversityPopOver(false);
                            }}
                            className="border-b w-full px-4 py-2 group lg:hover:bg-red-600 transition-all duration-200 ease-in-out cursor-pointer"
                          >
                            <div className="self-center text-black text-sm lg:group-hover:text-white transition-all duration-200 ease-in-out font-poppins ">
                              {/* @ts-ignore */}
                              Select
                            </div>
                          </div>
                          {props?.universityDataStProp?.map((uni) => (
                            <div
                              //@ts-ignore
                              key={uni.university_id}
                              onClick={() => {
                                setUniversityD(uni),
                                  setUniversityPopOver(false);
                              }}
                              className="border-b w-full px-4 py-2 group lg:hover:bg-red-600 transition-all duration-200 ease-in-out cursor-pointer"
                            >
                              <div className="flex justify-start space-x-4">
                                {/* @ts-ignore */}
                                {uni.image ? (
                                  <div className=" relative object-contain self-center h-[2rem] w-[2rem]">
                                    <img
                                      alt=""
                                      className=""
                                      src={
                                        /* @ts-ignore */
                                        uni.image
                                      }
                                    />
                                  </div>
                                ) : (
                                  <BuildingLibraryIcon className="h-[2rem] w-[2rem] text-red-600 lg:group-hover:text-black transition-all duration-200 ease-in-out" />
                                )}
                                <div className="self-center text-black text-sm lg:group-hover:text-white transition-all duration-200 ease-in-out font-poppins ">
                                  {/* @ts-ignore */}
                                  {uni.name}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex space-x-3">
                <div>
                  <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                    Location
                  </p>
                  <input
                    className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                    type="text"
                    placeholder="Enter Location"
                    {...register("location")}
                  ></input>
                </div>
                <div>
                  <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                    Contact *
                  </p>
                  <input
                    className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                    type="text"
                    placeholder="Enter Contact No."
                    {...register("contact", {
                      required: true,
                    })}
                  ></input>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  Profile Image
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Enter Profile Image URL"
                  {...register("image")}
                ></input>
              </div>
              <motion.div className="mt-5 md:mt-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={role ? handleSubmit(onSubmit) : () => {}}
                  disabled={submitting}
                  className={
                    `mx-auto flex w-full cursor-pointer justify-center rounded-[0.2rem] h-[3rem] items-center bg-red-600 py-4 px-8 font-poppins text-md font-semibold tracking-wide text-gray-100 shadow-md  transition duration-500 ease-in-out lg:px-8 lg:hover:bg-red-800 lg:hover:text-white ` +
                    (submitting &&
                      "cursor-not-allowed animate-pulse opacity-70")
                  }
                >
                  {submitting ? <LoadingDots color="#ffffff" /> : "Create User"}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UserFormModal;
