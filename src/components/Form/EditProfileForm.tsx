import { useState } from "react";
import { toast } from "react-toastify";
import { loginSuccess, useUpdateUserProfileMutation } from "../../store";
import { useDispatch } from "react-redux";
import { IUpdateUser } from "../../types/interface";

const EditProfileForm = ({
    name,
    email,
    password, 
    button,
    onClose,
}: {
    name: string;
    email: string;
    password: string;
    button: JSX.Element;
    onClose: () => void;
}) => {
    const initialState: Pick<IUpdateUser, "name" | "photoURL"> = {
        name: "Random Name",
        photoURL:
            "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/piw9n7scle0b3so65dzq.png",
    };

    const [data, setData] = useState(initialState);
    const dispatch = useDispatch();
    const [updateUserProfile] = useUpdateUserProfileMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await toast
            .promise(updateUserProfile(data).unwrap(), {
                pending: "Updating profile...",
                success: "Profile updated",
                error: "Profile update failed",
            })
            .then((res: IUpdateUser) => {
                dispatch(loginSuccess(res));
                onClose(); // Close the modal after a successful update.
            })
            .catch((err) => toast.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-6 mb-6">
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your name
                </label>
                <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Someone"
                />
            </div>
            <div className="mt-6 mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="********"
                />
            </div>
        </form>
    );
};

export default EditProfileForm;
