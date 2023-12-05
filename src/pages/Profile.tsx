import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <section
      key="1"
      className="w-full py-6 px-4 md:py-12 md:px-6 lg:py-16 lg:px-12 xl:py-24 xl:px-24"
    >
      <div className="container grid items-center justify-center gap-4 lg:gap-6 xl:gap-8 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-6 max-w-md mx-auto">
        <Avatar className="h-64 w-64">
          <AvatarImage alt="Profile picture" src="/placeholder-avatar.jpg" />
          <AvatarFallback>
            JP
            <div className="mt-2">
              <Label className="text-base" htmlFor="avatarUpload">
                Upload Image
              </Label>
              <Input className="mt-1" id="avatarUpload" type="file" />
            </div>
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">John Doe</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Address:
              </span>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                123 Main St, Anytown, USA
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Phone:
              </span>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                (123) 456-7890
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Email:
              </span>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                johndoe@example.com
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link className="hover:text-blue-600 dark:hover:text-blue-400" to="#">
            <IconFacebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link className="hover:text-blue-400 dark:hover:text-blue-300" to="#">
            <IconTwitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link className="hover:text-pink-600 dark:hover:text-pink-400" to="#">
            <IconInstagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link className="hover:text-blue-700 dark:hover:text-blue-500" to="#">
            <IconLinkedIn className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <div className="mt-4">
          <Button
            className="px-4 py-2 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            variant="outline"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;

function IconFacebook(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconTwitter(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
