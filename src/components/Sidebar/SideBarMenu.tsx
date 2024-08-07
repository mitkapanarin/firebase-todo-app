import { ThemeTypesEnum } from "@/types/enums";
import DarkModeSwitch from "./DarkModeSwitch";
import SidebarLink from "./SidebarLink";
import { RxHome, RxExit, RxClipboard } from "react-icons/rx";
import { LuList } from "react-icons/lu";

const SideBarMenu = ({
  theme,
  handleChangeTheme,
  appSignout,
}: {
  appSignout: () => void;
  handleChangeTheme: () => void;
  theme: ThemeTypesEnum.DARK | ThemeTypesEnum.LIGHT;
}) => {
  return (
    <>
      <div className="flex items-center mb-4 space-x-1">
        <h1 className="text-lg font-medium">Assist Me</h1>
      </div>
      <nav className="space-y-2">
        <SidebarLink
          icon={<RxHome className="w-4 h-4" />}
          label="Dashboard"
          path="/profile-page"
        />
        <SidebarLink
          icon={<RxClipboard className="w-4 h-4" />}
          label="Tasks"
          path="/tasks"
        />
        <SidebarLink
          icon={<LuList className="w-4 h-4" />}
          label="Activity Logs"
          path="/activity-logs"
        />
        <div onClick={appSignout}>
          <SidebarLink
            icon={<RxExit className="w-4 h-4" />}
            label="Signout"
            path="/login"
          />
        </div>
        <DarkModeSwitch theme={theme} onClick={handleChangeTheme} />
      </nav>
    </>
  );
};

export default SideBarMenu;
