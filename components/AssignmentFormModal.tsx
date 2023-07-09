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

export interface assignmentModalData {
  showAssignmentModal: boolean;
  setShowAssignmentModal: Dispatch<SetStateAction<boolean>>;
  courseId: string;
}

interface AssignmentFormInput {
  jwtToken: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  course_id: string;
}

function AssignmentFormModal(props: assignmentModalData) {
  const [error, setError] = useState<any>();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignmentFormInput>();

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

  function getTimezoneOffsetString(offset: any) {
    const sign = offset > 0 ? "-" : "+";
    const absoluteOffset = Math.abs(offset);
    const hours = String(Math.floor(absoluteOffset / 60)).padStart(2, "0");
    const minutes = String(absoluteOffset % 60).padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
  }

  const onSubmit: SubmitHandler<AssignmentFormInput> = async (data) => {
    setSubmitting(true);
    console.log("data", data);
    //post request

    let startDateString = "";
    let endDateString = "";

    if (data) {
      const startDate = new Date(data?.start_date);
      const year = startDate.getFullYear();
      const month = String(startDate.getMonth() + 1).padStart(2, "0");
      const day = String(startDate.getDate()).padStart(2, "0");
      const hours = String(startDate.getHours()).padStart(2, "0");
      const minutes = String(startDate.getMinutes()).padStart(2, "0");
      const seconds = String(startDate.getSeconds()).padStart(2, "0");
      const milliseconds = String(startDate.getMilliseconds()).padStart(3, "0");
      const timezoneOffset = startDate.getTimezoneOffset();

      startDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${getTimezoneOffsetString(
        timezoneOffset
      )}`;

      const endDate = new Date(data?.end_date);

      const yearE = endDate.getFullYear();
      const monthE = String(endDate.getMonth() + 1).padStart(2, "0");
      const dayE = String(endDate.getDate()).padStart(2, "0");
      const hoursE = String(endDate.getHours()).padStart(2, "0");
      const minutesE = String(endDate.getMinutes()).padStart(2, "0");
      const secondsE = String(endDate.getSeconds()).padStart(2, "0");
      const millisecondsE = String(endDate.getMilliseconds()).padStart(3, "0");
      const timezoneOffsetE = endDate.getTimezoneOffset();

      endDateString = `${yearE}-${monthE}-${dayE} ${hoursE}:${minutesE}:${secondsE}.${millisecondsE} ${getTimezoneOffsetString(
        timezoneOffsetE
      )}`;
    }

    const payload = {
      name: data?.name,
      description: data?.description,
      course_id: props?.courseId,
      status: "OPEN",
      start_date: startDateString,
      end_date: endDateString,
    };
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        Authorization: `Bearer ${session.accessToken}`,
      },
      withCredentials: true,
    };
    console.log("s-c", success);

    try {
      const res = await axios.post(
        `${process.env.SIDEHUSSLR_TEST_API}/university/course/assignment`,
        payload,
        customConfig
      );
      //@ts-ignore
      if (res?.status < "300") {
        delay(1000).then(() => {
          setSuccess(true);
          //   notify();
          toast.success("Assignment Created Successfully!", {
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
      setError(err?.response?.data?.message);
      setSuccess(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer className="font-bold text-sm text-black tracking-wide font-poppins" />
      <Modal
        showModal={props.showAssignmentModal}
        setShowModal={props.setShowAssignmentModal}
        successData={success}
        resetData={() => {
          reset({
            name: "",
            description: "",
            start_date: "",
            end_date: "",
            // status: "",
          });
        }}
        setSuccessData={setSuccess}
      >
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-xl md:border md:border-gray-100">
          <div className="flex flex-col  justify-center bg-white py-6 px-6">
            <div className="pb-4">
              <p className="text-gray-600 font-semibold text-3xl font-sanSerif">
                Create Assignment
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
              <input
                {...register("course_id")}
                name="course_id"
                type="hidden"
                //@ts-ignore
                value={`${props?.courseId}`}
              />
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  Assignment Name *
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
                  Assignment Description *
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
                  Start Date *
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="datetime-local"
                  placeholder="Enter Country Name"
                  {...register("start_date", {
                    required: true,
                  })}
                ></input>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 text-lg font-poppins font-semibold tracking-wide mb-1 opacity-70">
                  End Date *
                </p>
                <input
                  className={`form-input mt-1 w-full  rounded-md border border-gray-300 bg-transparent py-3  pl-3 pr-4 font-ubuntu text-black shadow outline-none ring-red-500 focus:ring `}
                  type="datetime-local"
                  placeholder="Enter Logo URL"
                  {...register("end_date", {
                    required: true,
                  })}
                ></input>
              </div>

              <div>
                {Object.keys(errors).length > 0 && (
                  <div className="flex flex-col p-3">
                    {errors.name && (
                      <span className="text-red-500">
                        - Assignment Name is required
                      </span>
                    )}

                    {errors.description && (
                      <span className="text-red-500">
                        - Assignment Description is required
                      </span>
                    )}

                    {errors.start_date && (
                      <span className="text-red-500">
                        - Start Date is required
                      </span>
                    )}

                    {errors.end_date && (
                      <span className="text-red-500">
                        - End Date is required
                      </span>
                    )}
                  </div>
                )}
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
                    "Create Assignment"
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

export default AssignmentFormModal;
