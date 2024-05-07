import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { setLogout } from "../../ReduxContext/context";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { user } = useSelector((state: InitialState) => state);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const LogOut = () => {
    dispatch(setLogout());
    setToggleMenu((prev) => !prev);
    navigate("/");
  };

  return (
    <nav className=" flex justify-between items-center bg-gray-900 p-4 absolute top-0 left-0 w-full shadow-md">
      <div className="flex items-center ml-2 md:ml-12 gap-x-4">
        <h1
          className=" font-bold text-3xl text-orange-700 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          COOKs.
        </h1>
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 rounded-md text-black outline-none border-none "
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" -ml-6 text-slate-800 cursor-pointer"
          />
        </div>
      </div>

      <div className="mr-12 gap-x-2 hidden md:flex md:items-center">
        <ul className=" flex gap-x-3">
          <li>
            <FontAwesomeIcon icon={faMessage} />
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} />
          </li>
        </ul>

        <div className=" relative">
          <h2
            className=" bg-slate-700 rounded-md px-4 py-1 select-none cursor-pointer"
            onClick={() => setToggleDropdown((menu) => !menu)}
          >
            Menu
            <FontAwesomeIcon icon={faChevronDown} className=" ml-2" />
          </h2>

          {/* Dropdown Menu */}
          {toggleDropdown ? (
            <div className=" bg-slate-700 p-2 text-right absolute w-full mt-2 rounded-md">
              <p>Settings</p>
              <p onClick={LogOut} className=" cursor-pointer">
                LogOut
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="md:hidden" onClick={() => setToggleMenu((menu) => !menu)}>
        <FontAwesomeIcon icon={faBars} size="xl" className="cursor-pointer" />
      </div>

      {/* Mobile Nav */}
      {toggleMenu ? (
        <div className="absolute top-20 right-2 bg-slate-700 p-4 md:hidden w-[50%] rounded-md">
          <ul className=" flex flex-col gap-x-3 ">
            <li>
              <FontAwesomeIcon icon={faMessage} className=" cursor-pointer" />
            </li>
            <li>
              <FontAwesomeIcon icon={faBell} className=" cursor-pointer" />
            </li>
          </ul>
          <p>Settings</p>
          <p onClick={LogOut} className=" cursor-pointer">
            LogOut
          </p>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
