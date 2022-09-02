import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks";
import { userDataAction } from "../../features/user/userSlice";
import Logo from "./../../assets/logo/logo.png";
import {
  Apps,
  FavoriteBorder,
  Notifications,
  Person,
  Search
} from "@mui/icons-material";
import ChatIcon from "../../components/ChatIcon/ChatIcon";
import Messages from "../../components/Messages/Messages";
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    useUserData(navigate, dispatch, userDataAction);
  }, []);
  useEffect(() => {
    const previousCurrent = sessionStorage.getItem("current");
    if (previousCurrent) setCurrent(Number(previousCurrent));
  }, []);
  const navigations: {
    icons: any;
    name: string;
  }[] = [
    {
      icons: <Apps className="text-[2em]" />,
      name: "Home"
    },
    {
      name: "Favorite",
      icons: <FavoriteBorder className="text-[2em]" />
    },
    {
      icons: <Notifications className="text-[2em]" />,
      name: "Notifications"
    },
    {
      icons: <ChatIcon className="w-8" />,
      name: "Messages"
    },
    {
      icons: (
        <>
          {userData?.profile == "icon" ? (
            <Person className="text-[2.5em]" />
          ) : (
            <div className="border-2 rounded-full p-[0.1em]">
              <img src={userData?.profile} className="w-10 rounded-full" />
            </div>
          )}
        </>
      ),
      name: "Account"
    }
  ];
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row-reverse">
      <div className="h-[93vh] min-h-[40em] w-full overflow-auto md:h-screen flex flex-col">
        <div className="flex p-4 justify-between shadow-md md:shadow-none md:h-[8%] md:border-b md:min-h-[5em] md:px-5">
          <div
            className="w-10 flex items-center md:hidden"
            onClick={() => {
              setCurrent(0);
              sessionStorage.setItem("current", "0");
            }}
          >
            <img src={Logo} />
          </div>
          <div className="hidden md:flex ">
            {navigations.map((data, index) => {
              return (
                <div key={index}>
                  {index === current && (
                    <div
                      className="flex items-center justify-center h-full space-x-3"
                      key={index}
                    >
                      <div>{data.icons}</div>
                      <h1 className="text-[1.5em] font-medium">{data.name}</h1>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-end border p-2 rounded-md md:w-[20em] xl:w-[25em] max-h-[3em]">
              <input
                className="w-[95%] outline-none"
                placeholder="Search Twencon"
              />
              <Search className="text-[1.5em] cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="h-[92%]">{current === 3 && <Messages />}</div>
      </div>
      <div className="bg-white h-[7vh] min-h-[4em] w-full flex px-4 border-t-2 md:w-[4%] md:h-screen md:px-0 md:flex-col md:border-t-0 md:border-r md:min-w-[5em]">
        <div className="hidden md:flex md:h-[8%] items-center justify-center">
          <div
            className="w-10 flex items-center cursor-pointer"
            onClick={() => {
              setCurrent(0);
              sessionStorage.setItem("current", "0");
            }}
          >
            <img src={Logo} />
          </div>
        </div>
        <div className="h-full w-full flex-shrink flex items-center justify-between md:flex-col md:justify-center md:items-center md:h-[80%] md:space-y-10">
          {navigations.map((data, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => {
                  setCurrent(index);
                  sessionStorage.setItem("current", index.toString());
                }}
              >
                {data.icons}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
