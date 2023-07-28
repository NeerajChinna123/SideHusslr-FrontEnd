import Modal from "./modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingDots from "../icons/loading-dots";
import { ToastContainer, toast } from "react-toastify";
import { usersDataType } from "../typings";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {
  MagnifyingGlassIcon,
  XCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAppSelector, useAppDispatch } from "../hooks";

export interface AssignmentAssignModalData {
  showAssignmentAssign: boolean;
  setAssignmentAssign: Dispatch<SetStateAction<boolean>>;
  assignmentId: String;
}

interface UserEnrollmentFormInput {
  jwtToken: string;
  user_id: string;
  course_id: string;
  status: string;
}

function AssignmentAssignModal(props: AssignmentAssignModalData) {
  const { data: session } = useSession();

  const [error, setError] = useState<any>();

  const {
    formState: { errors },
    reset,
  } = useForm<UserEnrollmentFormInput>();

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  //learnerStates

  const userDataSt = useAppSelector(
    (state) => state.studentRoleData.studentsRoleData
  );

  const [errorT, setErrorT] = useState(false);

  const [searchUserText, setSearchUserText] = useState("");

  const [selectStudent, setSelectStudent] = useState({});

  const [filteredD, setFilteredD] = useState(userDataSt);

  //InternStates

  const userDataStI = useAppSelector(
    (state) => state.studentRoleData.studentsRoleData
  );

  const [errorTI, setErrorTI] = useState(false);

  const [searchUserTextI, setSearchUserTextI] = useState("");

  const [selectIntern, setSelectIntern] = useState({});

  const [filteredDI, setFilteredDI] = useState(userDataStI);

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit = async () => {
    setSubmitting(true);

    //post request

    // let userData = addUserList?.map((user: usersDataType) => ({

    //   status: "ACTIVE",

    //   user_id: user?.user_id,

    //   course_id: props?.courseId,

    // }));

    const payload = {
      assignment_status: "OPEN",
      //@ts-ignore
      student_course_id: selectStudent?.user_id,
      assignment_id: props?.assignmentId,
      //@ts-ignore
      user_id: selectIntern?.user_id,
    };

    const customConfig = {
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        Authorization: `Bearer ${session.accessToken}`,
      },
      withCredentials: true,
    };

    try {
      const res = await axios.post(
        `${process.env.SIDEHUSSLR_TEST_API}/university/course/assignment/assign`,
        payload,
        customConfig
      );
      //@ts-ignore
      if (res?.status < "300") {
        delay(1000).then(() => {
          setSuccess(true);
          //   notify();
          toast.success("User Enrolled Successfully!", {
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

  function filterUsers(e: any) {
    setSearchUserText(e.target.value);

    let searchText = e.target.value;

    const filteredData = userDataSt.filter((userD: usersDataType) => {
      const { username, first_name, last_name } = userD;

      // Convert search term and user properties to lowercase for case-insensitive comparison
      const term = searchText.toLowerCase();
      const lowerCaseUsername = username.toLowerCase();
      const lowerCaseFirstName = first_name.toLowerCase();
      const lowerCaseLastName = last_name.toLowerCase();

      // Check if any of the properties match the search term
      return (
        lowerCaseUsername.includes(term) ||
        lowerCaseFirstName.includes(term) ||
        lowerCaseLastName.includes(term)
      );
    });

    //@ts-ignore
    setFilteredD(filteredData);
  }

  function filterInterns(e: any) {
    setSearchUserTextI(e.target.value);

    let searchText = e.target.value;

    const filteredData = userDataStI.filter((userD: usersDataType) => {
      const { username, first_name, last_name } = userD;

      // Convert search term and user properties to lowercase for case-insensitive comparison
      const term = searchText.toLowerCase();
      const lowerCaseUsername = username.toLowerCase();
      const lowerCaseFirstName = first_name.toLowerCase();
      const lowerCaseLastName = last_name.toLowerCase();

      // Check if any of the properties match the search term
      return (
        lowerCaseUsername.includes(term) ||
        lowerCaseFirstName.includes(term) ||
        lowerCaseLastName.includes(term)
      );
    });

    //@ts-ignore
    setFilteredDI(filteredData);
  }

  function selectLearner(userId: string) {
    const filteredAddUSerData = userDataSt.filter((userD: usersDataType) => {
      const { user_id } = userD;

      // Check if any of the properties match the search term
      return user_id == userId;
    });

    //@ts-ignore

    setSelectStudent(filteredAddUSerData[0]);

    setErrorT(false);
  }

  function selectInternToAdd(userId: string) {
    const filteredAddUSerData = userDataStI.filter((userD: usersDataType) => {
      const { user_id } = userD;

      // Check if any of the properties match the search term
      return user_id == userId;
    });

    //@ts-ignore

    setSelectIntern(filteredAddUSerData[0]);

    setErrorTI(false);
  }

  function unSelectLearner(userId: string) {
    setSelectStudent({});
  }

  function unSelectInternAdded(userId: string) {
    setSelectIntern({});
  }

  return (
    <>
      <ToastContainer className="font-bold text-sm text-black tracking-wide font-poppins" />
      <Modal
        showModal={props.showAssignmentAssign}
        setShowModal={props.setAssignmentAssign}
        successData={success}
        resetData={() => {
          setSearchUserText("");
          setFilteredD(userDataSt);
          setFilteredDI(userDataStI);
          setSearchUserTextI("");
          setErrorT(false);
          setSelectStudent({});
          setSelectIntern({});
          setError("");
          setErrorTI(false);
        }}
        setSuccessData={setSuccess}
      >
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-xl md:border md:border-gray-100">
          <div className="flex flex-col  justify-center bg-white py-6 px-6">
            <div className="pb-2">
              <p className="text-gray-600 font-semibold text-2xl text-center font-sanSerif">
                Select a student to enroll and an intern to assign
              </p>
            </div>
            <div className="text-red-600 font-semibold text-md text-center  p-2">
              {errorTI &&
                errorT &&
                "Please Select a Student and an Intern To Procced"}
              {!errorTI && errorT && "Please Select Student To Procced"}

              {errorTI && !errorT && "Please Select Intern To Procced"}

              {error?.length > 0 && error}
            </div>
            <div className="border-t border-gray-300"></div>
            <div className="flex flex-col gap-2">
              {/* <input
                {...register("jwtToken")}
                name="jwtToken"
                type="hidden"
                //@ts-ignore
                value={`${session?.accessToken}`}
              /> */}

              <div className="mt-4 p-3  rounded-lg border border-gray-300">
                <div className="flex flex-row space-x-2">
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />

                  <input
                    onChange={(e) => {
                      filterUsers(e);
                    }}
                    type="text"
                    placeholder="Search Students"
                    value={searchUserText}
                    className="flex-1 outline-none"
                  />

                  <div
                    onClick={() => {
                      setSearchUserText("");
                      setFilteredD(userDataSt);
                    }}
                    className="cursor-pointer"
                  >
                    {searchUserText.length > 0 && (
                      <XCircleIcon className="h-6 w-6" />
                    )}
                  </div>
                </div>
              </div>

              <div className="scroll-smooth space-y-8 w-[90%] px-4 mx-auto flex-col max-h-[7rem] overflow-scroll overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem] mt-6">
                {filteredD?.map((user: usersDataType) => (
                  <div
                    key={user?.username}
                    className="flex flex-row space-x-8 items-center"
                  >
                    {user?.image ? (
                      <img
                        className="rounded-full h-10 w-10 object-contain"
                        src={user?.image}
                      ></img>
                    ) : (
                      <div className="rounded-full bg-red-600">
                        <UserIcon className="h-10 w-10 p-3 text-white" />
                      </div>
                    )}

                    <div className="flex  flex-1 flex-col">
                      <p>
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{user?.username}</p>
                    </div>

                    <div className=" flex justify-center ">
                      <div
                        onClick={
                          Object.values(selectStudent).includes(user?.user_id)
                            ? () => unSelectLearner(user?.user_id)
                            : () => selectLearner(user?.user_id)
                        }
                        className={
                          `p-2 self-center cursor-pointer border border-gray-300 flex justify-center rounded-md font-poppins text-sm md:text-sm uppercase  tracking-wide ` +
                          `${
                            Object.values(selectStudent).includes(user?.user_id)
                              ? "text-red-600"
                              : "text-black "
                          }`
                        }
                      >
                        <p className="">
                          {" "}
                          {Object.values(selectStudent).includes(user?.user_id)
                            ? "UnSelect"
                            : "Select"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-3 border-gray-300"></div>
              <div className="flex flex-col gap-2">
                {/* <input
                {...register("jwtToken")}
                name="jwtToken"
                type="hidden"
                //@ts-ignore
                value={`${session?.accessToken}`}
              /> */}

                <div className="mt-2 p-3  rounded-lg border border-gray-300">
                  <div className="flex flex-row space-x-2">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />

                    <input
                      onChange={(e) => {
                        filterInterns(e);
                      }}
                      type="text"
                      placeholder="Search Interns"
                      value={searchUserTextI}
                      className="flex-1 outline-none"
                    />

                    <div
                      onClick={() => {
                        setSearchUserTextI("");
                        setFilteredDI(userDataStI);
                      }}
                      className="cursor-pointer"
                    >
                      {searchUserTextI.length > 0 && (
                        <XCircleIcon className="h-6 w-6" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="scroll-smooth space-y-8 w-[90%] px-4 mx-auto flex-col max-h-[7rem] overflow-scroll overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem] mt-6">
                  {filteredDI?.map((user: usersDataType) => (
                    <div
                      key={user?.username}
                      className="flex flex-row space-x-8 items-center"
                    >
                      {user?.image ? (
                        <img
                          className="rounded-full h-10 w-10 object-contain"
                          src={user?.image}
                        ></img>
                      ) : (
                        <div className="rounded-full bg-red-600">
                          <UserIcon className="h-10 w-10 p-3 text-white" />
                        </div>
                      )}

                      <div className="flex  flex-1 flex-col">
                        <p>
                          {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user?.username}
                        </p>
                      </div>

                      <div className=" flex justify-center ">
                        <div
                          onClick={
                            Object.values(selectIntern).includes(user?.user_id)
                              ? () => unSelectInternAdded(user?.user_id)
                              : () => selectInternToAdd(user?.user_id)
                          }
                          className={
                            `p-2 self-center cursor-pointer border border-gray-300 flex justify-center rounded-md font-poppins text-sm md:text-sm uppercase  tracking-wide ` +
                            `${
                              Object.values(selectIntern).includes(
                                user?.user_id
                              )
                                ? "text-red-600"
                                : "text-black "
                            }`
                          }
                        >
                          <p className="">
                            {" "}
                            {Object.values(selectIntern).includes(user?.user_id)
                              ? "UnSelect"
                              : "Select"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row space-x-4 justify-center items-center">
                  <div className="w-[8rem]">
                    {Object.values(selectStudent).length > 0 && (
                      <div className="flex flex-row flex-wrap space-x-3 mt-6">
                        <div
                          //@ts-ignore
                          key={selectStudent?.username}
                          className="p-2 rounded-xl mb-2 flex items-center space-x-2 flex-row text-black border border-red-600"
                        >
                          <p>
                            {
                              //@ts-ignore
                              selectStudent?.username
                            }
                          </p>
                          <div
                            onClick={() =>
                              //@ts-ignore
                              unSelectLearner(selectStudent?.user_id)
                            }
                            className="cursor-pointer"
                          >
                            {" "}
                            <XMarkIcon className="text-red-600 h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row space-x-2 mt-4 pr-4  ">
                    <ArrowLeftIcon className="h-3 w-3" />{" "}
                    <ArrowRightIcon className="h-3 w-3" />
                  </div>
                  <div className="w-[8rem]">
                    {Object.values(selectIntern).length > 0 && (
                      <div className="flex flex-row flex-wrap space-x-3 mt-6">
                        <div
                          //@ts-ignore
                          key={selectIntern?.username}
                          className="p-2 rounded-xl mb-2 flex items-center space-x-2 flex-row text-black border border-red-600"
                        >
                          <p>
                            {
                              //@ts-ignore
                              selectIntern?.username
                            }
                          </p>
                          <div
                            onClick={() =>
                              //@ts-ignore
                              unSelectInternAdded(selectIntern?.user_id)
                            }
                            className="cursor-pointer"
                          >
                            {" "}
                            <XMarkIcon className="text-red-600 h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <motion.div className="mt-5 md:mt-3">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={
                      Object.values(selectStudent).length > 0 &&
                      Object.values(selectIntern).length > 0
                        ? //@ts-ignore
                          () => {
                            onSubmit();
                          }
                        : Object.values(selectStudent).length == 0 &&
                          Object.values(selectIntern).length == 0
                        ? () => {
                            setErrorT(true);
                            setErrorTI(true);
                          }
                        : Object.values(selectStudent).length == 0
                        ? () => {
                            setErrorT(true);
                          }
                        : () => {
                            setErrorTI(true);
                          }
                    }
                    disabled={submitting}
                    className={
                      `mx-auto flex w-full cursor-pointer justify-center rounded-[0.2rem] h-[3rem] items-center bg-red-600 py-4 px-8 font-poppins text-md font-semibold tracking-wide text-gray-100 shadow-md  transition duration-500 ease-in-out lg:px-8 lg:hover:bg-red-800 lg:hover:text-white ` +
                      (submitting &&
                        "cursor-not-allowed animate-pulse opacity-70")
                    }
                  >
                    {submitting ? <LoadingDots color="#ffffff" /> : "Proceed"}
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AssignmentAssignModal;
