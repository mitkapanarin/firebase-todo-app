import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log("user", user);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mx-auto max-w-242.5">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-bold">Profile</h2>
              </div>
              <div className="overflow-hidden rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="relative z-20 h-35 md:h-65">
                  <img
                    src="./images/cover/cover-01.png"
                    alt="profile cover"
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                  />
                  <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                    <label
                      htmlFor="cover"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium hover:bg-opacity-80 xsm:px-4"
                    >
                      <input
                        type="file"
                        name="cover"
                        id="cover"
                        className="sr-only"
                      />
                      <span>Edit</span>
                    </label>
                  </div>
                </div>
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                  <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                    <div className="relative drop-shadow-2">
                      <img
                        className="w-[100px] h-[100px]"
                        src={user?.profileImage}
                        alt=""
                      />
                      <label
                        htmlFor="profile"
                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                      >
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="mb-1.5 text-2xl font-medium">
                      {user?.name}
                    </h3>
                    <p className="font-medium">{user?.email}</p>
                    <div className="dark:bg-[#37404F] mx-auto mt-7 mb-7 grid max-w-50 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark">
                      <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                        <span className="font-semibold">20</span>
                        <span className="text-sm">ToDo</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                        <span className="font-semibold">12</span>
                        <span className="text-sm">Done</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                        <span className="font-semibold">8</span>
                        <span className="text-sm">Upcoming</span>
                      </div>
                    </div>
                    <div className="mx-auto max-w-180">
                      <h4 className="font-medium">About Me</h4>
                      <p className="mt-4.5 font-medium text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque posuere fermentum urna, eu condimentum
                        mauris tempus ut. Donec fermentum blandit aliquet. Etiam
                        dictum dapibus ultricies. Sed vel aliquet libero. Nunc a
                        augue fermentum, pharetra ligula sed, aliquam lacus.
                      </p>
                    </div>

                    <div className="mt-6.5">
                      <h4 className="mb-3.5 font-medium">Follow me on</h4>
                      <div className="flex items-center justify-center gap-3.5">
                        <a
                          href="#"
                          className="hover:text-primary"
                          data-name="social-icon"
                          aria-label="social-icon"
                        >
                          <FaFacebook />
                        </a>
                        <a
                          href="#"
                          className="hover:text-primary"
                          data-name="social-icon"
                          aria-label="social-icon"
                        >
                          <FaTwitter />
                        </a>
                        <a
                          href="#"
                          className="hover:text-primary"
                          data-name="social-icon"
                          aria-label="social-icon"
                        >
                          <FaLinkedin />
                        </a>
                        <a
                          href="#"
                          className="hover:text-primary"
                          data-name="social-icon"
                          aria-label="social-icon"
                        >
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
