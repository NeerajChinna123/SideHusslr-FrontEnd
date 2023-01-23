import Modal from "./modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingDots from "../icons/loading-dots";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FADE_IN_ANIMATION_SETTINGS } from "../lib/constants";
import { useRouter } from "next/router";

export interface universityModalData {
  showUniversityModal: boolean;
  setShowUniversityModal: Dispatch<SetStateAction<boolean>>;
}

interface UniversityFormInput {
  jwtToken: string;
  name: string;
  description: string;
  country: string;
  image: string;
}

function UniversityFormModal(props: universityModalData) {
  const [error, setError] = useState<any>();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UniversityFormInput>();

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit: SubmitHandler<UniversityFormInput> = async (data) => {
    setSubmitting(true);
    console.log("data", data);
    //post request

    const payload = data;
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("s-c", success);

    try {
      const res = await axios.post(
        `${process.env.SIDEHUSSLR_TEST_API}/university`,
        payload,
        customConfig
      );
      //@ts-ignore
      if (res?.status < "300") {
        delay(1000).then(() => {
          setSuccess(true);
          //   notify();
          toast.success("University Created Successfully!", {
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
        showModal={props.showUniversityModal}
        setShowModal={props.setShowUniversityModal}
        successData={success}
        resetData={() => {
          reset({
            name: "",
            description: "",
            country: "",
            image: "",
          });
        }}
        setSuccessData={setSuccess}
      >
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-xl md:border md:border-gray-100">
          <div className="flex flex-col  justify-center bg-white py-6 px-6">
            <div className="pb-4">
              <p className="text-gray-600 font-semibold text-3xl font-sanSerif">
                Create University
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
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  University Name *
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Enter University Name"
                  {...register("name", {
                    required: true,
                  })}
                ></input>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  Description *
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Enter Description"
                  {...register("description", {
                    required: true,
                  })}
                ></input>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  Country *
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Enter Country Name"
                  {...register("country", {
                    required: true,
                  })}
                ></input>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  Image
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="text"
                  placeholder="Enter Logo URL"
                  {...register("image")}
                ></input>
              </div>
              <motion.div className="mt-5 md:mt-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={submitting}
                  className={
                    `mx-auto flex w-full cursor-pointer justify-center rounded-[0.2rem] h-[3rem] items-center bg-red-600 py-4 px-8 font-poppins text-md font-semibold tracking-wide text-gray-100 shadow-md  transition duration-500 ease-in-out lg:px-8 lg:hover:bg-red-800 lg:hover:text-white ` +
                    (submitting &&
                      "cursor-not-allowed animate-pulse opacity-70")
                  }
                >
                  {submitting ? (
                    <LoadingDots color="#ffffff" />
                  ) : (
                    "Create University"
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UniversityFormModal;
