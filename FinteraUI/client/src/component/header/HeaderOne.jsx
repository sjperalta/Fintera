import ProtoTypes from "prop-types";
import { useContext, useState } from "react";
import Author from "./Author";
import NotificationPopup from "./NotificationPopup";
import ProfilePopup from "./ProfilePopup";
import ToggleBtn from "./ToggleBtn";
import ModeToggler from "./ModeToggler";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function HeaderOne({ handleSidebar }) {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  // Extract user, logout from AuthContext
  const { user, logout } = useContext(AuthContext);

  const handlePopup = (name) => {
    setPopup((prevPopup) => ({
      [name]: prevPopup?.[name] ? false : true,
    }));
  };

  const handleLogout = async () => {
    // Call logout from AuthContext
    // clearing tokens & user data
    await logout(); 

    //Going to signin again after the logout cleanup cache 
    navigate('/signin');
  };

  return (
    <header className="header-wrapper fixed z-30 hidden w-full md:block">
      <div className="relative flex h-[108px] w-full items-center justify-between bg-white px-10 dark:bg-darkblack-600 2xl:px-[76px]">
        <button
          aria-label="none"
          onClick={handleSidebar}
          title="Ctrl+b"
          type="button"
          className="drawer-btn absolute left-0 top-auto rotate-180 transform"
        >
          <span>
            <svg
              width="16"
              height="40"
              viewBox="0 0 16 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#22C55E" />
              <path
                d="M10 15L6 20.0049L10 25.0098"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        {/* page-title */}
        <div>
          <h3 className="text-xl font-bold text-bgray-900 dark:text-bgray-50 lg:text-3xl lg:leading-[36.4px]">
            Dashboard
          </h3>
          <p className="text-xs font-medium text-bgray-600 dark:text-bgray-50 lg:text-sm lg:leading-[25.2px]">
            Let’s check your update today
          </p>
        </div>

        <div className="quick-access-wrapper relative">
          <div className="flex items-center space-x-[43px]">
            <div className="hidden items-center space-x-5 xl:flex">
              <div
                onClick={() => setPopup(false)}
                id="noti-outside"
                className={`fixed left-0 top-0  h-full w-full ${
                  popup ? "block" : "hidden"
                }`}
              ></div>
              <ModeToggler />
              <ToggleBtn
                name="notification"
                clickHandler={handlePopup}
                icon={
                  <svg
                    className="fill-bgray-900 dark:fill-white"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path /* notification icon path */ d="M..." />
                  </svg>
                }
              >
                <NotificationPopup
                  active={popup?.notification}
                  handlePopup={handlePopup}
                />
              </ToggleBtn>
            </div>
            <div className="hidden h-[48px] w-[1px] bg-bgray-300 dark:bg-darkblack-400 xl:block"></div>
            {/* author */}
            {/* Pass user from AuthContext directly */}
            {user ?<Author showProfile={handlePopup} user={user} /> : <div>Please log in</div>}
          </div>

          {user ?<ProfilePopup active={popup?.profile} handlePopup={handlePopup} user={user} handleLogout={handleLogout} /> : <div></div>}
        </div>
      </div>
    </header>
  );
}

HeaderOne.propTypes = {
  handleSidebar: ProtoTypes.func,
};

export default HeaderOne;