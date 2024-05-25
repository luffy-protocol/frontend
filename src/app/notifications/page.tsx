"use client";

import getFollowingNotifications from "@/utils/notificationHelpers/notifyFollowing";
import removeNotifications from "@/utils/notificationHelpers/removeNotification";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface Notification {
  id: number;
  followerId: number;
  followingId: number;
  checked: boolean;
}

interface PageProps {
  params: { id: string };
}
interface NotificationCardProps {
  notification: {
    id: number;
    followerId: number;
    followingId: number;
    checked: boolean;
  };
  onClose: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onClose,
}) => {
  return (
    <div
      className={`flex items-center justify-evenly  bg-no-repeat bg-contain  bg-center w-full h-[80px] xl:h-[100px]`}
      style={{
        backgroundImage: `url('/assets/Notification.png')`,
      }}
    >
      <div className="flex gap-20">
        <div className=" font-stalinist text-xl flex whitespace-nowrap gap-1 items-center">
          {/* {`User ${notification.followingId} started following you.`} */}
          <div>{"User"} </div>
          <div className="text-[#D8485F] ">{notification.followingId}</div>
          <div> {" started following you."}</div>
        </div>
        {/* <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onClose(notification.id)}
        >
          Close
        </button> */}
        <div
          className={`flex justify-center items-center bg-contain bg-no-repeat h-[40px] xl:h-[60px]`}
          style={{
            backgroundImage: `url('/assets/close.png')`,
            width: "100px",
          }}
          onClick={() => onClose(notification.id)}
        ></div>
      </div>
    </div>
  );
};

const Page: React.FC<PageProps> = ({ params }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { message, response } = await getFollowingNotifications(1111);
      console.log(response);
      setNotifications(response);
    };
    fetchNotifications();
  }, []);

  const handleCloseNotification = async (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    const { message, response } = await removeNotifications(id);
    console.log(response);
  };

  return (
    <div className="flex flex-col px-10 items-center bg-no-repeat w-full h-[1350px] overflow-hidden xl:h-[1800px] bg-[url('/assets/BG.svg')]  bg-contain">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-20">
        <div className=" font-stalinist  text-2xl xl:text-4xl text-[#D8485F] self-center">
          Notifications
        </div>
        <div className="flex flex-col gap-6 w-full">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onClose={handleCloseNotification}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
