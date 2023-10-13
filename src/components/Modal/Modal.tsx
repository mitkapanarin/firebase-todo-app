import React, { useState } from "react";
import InputField from "../Form/InputField";
import { toast } from "react-toastify";
import { useUpdateUserProfileMutation } from "../../store";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { loginFn } from "../../store";
import { useDispatch } from "react-redux";
import { IUpdateUser } from "../../types/interface";

const Modal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const initialState = {
    name: user?.name,
    photoURL: user?.photoURL,
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = useState(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(updateUserProfile(data).unwrap(), {
        pending: "Updating...",
        success: "Profile Updated",
        error: "Error while updating",
      })
      .then((res: IUpdateUser) => dispatch(loginFn(res)));
  };

  return (
    <>
      {/* // <!-- Modal toggle --> */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Edit
      </button>

      {/* // <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabIndex={1}
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 
        ${!isOpen && "hidden"}
        w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6" action="#">
                <InputField
                  label="Display Name"
                  name="name"
                  placeholder="Profile User name"
                  type="text"
                  onChange={handleInputChange}
                  value={data?.name}
                  required
                />
                <InputField
                  label="Profile Image"
                  name="photoURL"
                  placeholder="Profile User name"
                  type="text"
                  onChange={handleInputChange}
                  value={data?.photoURL}
                  required
                />
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
