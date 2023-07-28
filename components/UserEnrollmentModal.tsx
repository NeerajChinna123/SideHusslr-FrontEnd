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
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAppSelector, useAppDispatch } from "../hooks";

export interface universityModalData {
  showUserEnrollmentModal: boolean;
  setShowUserEnrollmentModal: Dispatch<SetStateAction<boolean>>;
  courseId: string;
}

interface UserEnrollmentFormInput {
  jwtToken: string;
  user_id: string;
  course_id: string;
  status: string;
}

function UserEnrollmentFormModal(props: universityModalData) {
  const [error, setError] = useState<any>();

  const userDataSt = useAppSelector(
    (state) => state.studentRoleData.studentsRoleData
  );

  const { data: session } = useSession();

  const [errorT, setErrorT] = useState(false);

  const [searchUserText, setSearchUserText] = useState("");

  const [addUserList, setAddUserList] = useState([]);

  const {
    formState: { errors },
    reset,
  } = useForm<UserEnrollmentFormInput>();

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const [filteredD, setFilteredD] = useState(userDataSt);

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

    let userData = addUserList?.map((user: usersDataType) => ({
      //@ts-ignore
      status: "ACTIVE",
      //@ts-ignore
      user_id: user?.user_id,
      //@ts-ignore
      course_id: props?.courseId,
      //@ts-ignore
    }));

    const payload = userData;

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
        `${process.env.SIDEHUSSLR_TEST_API}/course/bulk/enroll`,
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

  function addUser(userId: string) {
    const filteredAddUSerData = userDataSt.filter((userD: usersDataType) => {
      const { user_id } = userD;

      // Check if any of the properties match the search term
      return user_id == userId;
    });

    //@ts-ignore

    addUserList.push(filteredAddUSerData[0]);

    setAddUserList([...addUserList]);
    setErrorT(false);
  }

  function removeUser(userId: string) {
    const filteredAddUSerData = addUserList.filter((userD: usersDataType) => {
      const { user_id } = userD;

      // Check if any of the properties match the search term
      return user_id !== userId;
    });

    setAddUserList(filteredAddUSerData);
  }

  return (
    <>
      <ToastContainer className="font-bold text-sm text-black tracking-wide font-poppins" />
      <Modal
        showModal={props.showUserEnrollmentModal}
        setShowModal={props.setShowUserEnrollmentModal}
        successData={success}
        resetData={() => {
          setSearchUserText("");
          setFilteredD(userDataSt);
          setErrorT(false);
          setAddUserList([]);
          setError("");
        }}
        setSuccessData={setSuccess}
      >
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-xl md:border md:border-gray-100">
          <div className="flex flex-col  justify-center bg-white py-6 px-6">
            <div className="pb-4">
              <p className="text-gray-600 font-semibold text-3xl font-sanSerif">
                Enroll Users
              </p>
            </div>
            <div className="text-red-600 font-semibold text-md text-center  p-2">
              {errorT &&
                addUserList.length == 0 &&
                "Please Select Users for Enrollment"}

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

              <div className="scroll-smooth space-y-8 w-[90%] px-4 mx-auto flex-col max-h-[14rem] overflow-scroll overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-h-[2rem]  scrollbar-w-[0.3rem] md:scrollbar-w-[0.2rem] mt-6">
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
                          addUserList.some((obj) =>
                            Object.values(obj).includes(user?.user_id)
                          )
                            ? () => removeUser(user?.user_id)
                            : () => addUser(user?.user_id)
                        }
                        className={
                          `p-2 self-center cursor-pointer border border-gray-300 flex justify-center rounded-md font-poppins text-sm md:text-sm uppercase  tracking-wide ` +
                          `${
                            addUserList.some((obj) =>
                              Object.values(obj).includes(user?.user_id)
                            )
                              ? "text-red-600"
                              : "text-black "
                          }`
                        }
                      >
                        <p className="">
                          {" "}
                          {addUserList.some((obj) =>
                            Object.values(obj).includes(user?.user_id)
                          )
                            ? "Remove"
                            : "Add"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {addUserList.length > 0 && (
                <div className="flex flex-row flex-wrap space-x-3 mt-6">
                  {addUserList?.map((userToAdd: usersDataType) => (
                    <div
                      key={userToAdd?.username}
                      className="p-2 rounded-xl mb-2 flex items-center space-x-2 flex-row text-black border border-red-600"
                    >
                      <p> {userToAdd?.username}</p>
                      <div
                        onClick={() => removeUser(userToAdd?.user_id)}
                        className="cursor-pointer"
                      >
                        {" "}
                        <XMarkIcon className="text-red-600 h-5 w-5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <motion.div className="mt-5 md:mt-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={
                    addUserList.length > 0
                      ? //@ts-ignore
                        () => {
                          onSubmit();
                        }
                      : () => {
                          setErrorT(true);
                        }
                  }
                  disabled={submitting}
                  className={
                    `mx-auto flex w-full cursor-pointer justify-center rounded-[0.2rem] h-[3rem] items-center bg-red-600 py-4 px-8 font-poppins text-md font-semibold tracking-wide text-gray-100 shadow-md  transition duration-500 ease-in-out lg:px-8 lg:hover:bg-red-800 lg:hover:text-white ` +
                    (submitting &&
                      "cursor-not-allowed animate-pulse opacity-70")
                  }
                >
                  {submitting ? <LoadingDots color="#ffffff" /> : "Enroll"}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UserEnrollmentFormModal;
