import { useState } from "react";
import { signIn, getCsrfToken, getSession,signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { FADE_DOWN_ANIMATION_VARIANTS } from "../../lib/constants";

interface IFormInput {
  csrfToken: any;
  username: string;
  password: string;
}

export default function SignIn({ csrfToken }: any) {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<any>();

  if (status == "authenticated") {
    router.push("/redirect");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitting(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: "/redirect",
    });
    if (res?.error) {
      setError(res.error);
      setSubmitting(false);
    } else {
      setError(null);
    }
    if (res?.url) {
      setSubmitting(false);
      setSuccess(true);
      router.push(res.url);
    }
  };

  const [passVisible, setPassVisible] = useState(false);

  const togglePasswordVisiblity = () => {
    setPassVisible(passVisible ? false : true);
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="h-screen relative flex items-center justify-center bg-gradient-to-br from-black via-black  to-[#85002a] "
      >
        <div className="absolute cursor-pointer top-16 md:top-10">
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            onClick={() => {
              router.push("/");
            }}
            className=" relative h-[5rem] w-[5rem] md:h-[7rem] md:w-[7rem]"
          >
            <Image
              alt=""
              className=""
              layout="fill"
              objectFit="contain"
              src={"/logo.png"}
            />
          </motion.div>
        </div>
        <motion.div className=" w-[22rem]   md:w-[32rem] mt-10 ">
          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className=" shadow-red-600 shadow-md border border-stone-800 rounded-sm p-8 md:p-10"
          >
            <div>
              <p className="text-center font-bold  text-lg font-poppins uppercase text-[#f9004d]">
                Welcome Back
              </p>
            </div>
            <div className="mt-2">
              <p className="text-center text-white text-lg font-poppins font-semibold tracking-wide">
                Log Into your account
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex-col space-y-2"
            >
              <div className="text-red-600 font-semibold text-md text-center  p-2">
                {!submitting && error}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  {...register("csrfToken")}
                  name="csrfToken"
                  type="hidden"
                />
                <div>
                  <p className="text-white text-sm font-poppins tracking-wide mb-2 opacity-80">
                    E-mail or Username
                  </p>
                  <input
                    autoComplete="off"
                    className={`form-input mt-1 w-full  rounded-sm border border-gray-500 bg-transparent py-3  pl-3 pr-12 font-ubuntu text-white shadow outline-none ring-red-700 focus:none `}
                    type="text"
                    placeholder="Enter your E-mail or Username "
                    {...register("username", {
                      required: true,
                    })}
                  ></input>
                </div>
                <div className="mt-3 relative">
                  <p className="text-white text-sm font-poppins opacity-80 tracking-wide mb-2">
                    Password
                  </p>
                  <input
                    autoComplete="off"
                    className={`form-input  bg-darkhBgLight  mt-1 w-full rounded-sm border border-gray-500 bg-transparent py-3 pl-3 pr-12 font-ubuntu text-white shadow outline-none ring-red-700 focus:none `}
                    type={passVisible ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  ></input>
                  <div className="absolute right-3 top-[2.9rem]">
                    {passVisible ? (
                      <div className="cursor-pointer">
                        <EyeSlashIcon
                          onClick={togglePasswordVisiblity}
                          className="h-5 w-5 text-gray-300 opacity-65"
                        />
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={togglePasswordVisiblity}
                      >
                        <EyeIcon className="h-5 w-5 text-gray-300 opacity-65" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="flex flex-col p-3">
                  {errors.username && (
                    <span className="text-red-600 font-semibold">
                      - E-mail or Username is required
                    </span>
                  )}

                  {errors.password && (
                    <span className="text-red-600 font-semibold">
                      - Password is required
                    </span>
                  )}
                </div>
              )}
              <motion.div
                className="pt-5 md:pt-8"
                id="form"
                whileTap={{ scale: 0.97 }}
              >
                <motion.input
                  type="submit"
                  disabled={submitting}
                  value={submitting ? "Logging in ..." : "Login now"}
                  className={
                    `mx-auto flex w-full cursor-pointer justify-center rounded-[0.2rem] bg-[#f9004d] py-4 px-8 font-poppins text-lg font-semibold tracking-wide text-gray-100 shadow-md  transition duration-500 ease-in-out lg:px-8 lg:hover:bg-[#be003c] lg:hover:text-white ` +
                    (submitting &&
                      "cursor-not-allowed animate-pulse opacity-70")
                  }
                />
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
