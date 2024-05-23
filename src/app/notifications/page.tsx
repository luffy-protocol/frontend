"use client";

import getFollowingNotifications from "@/utils/notificationHelpers/notifyFollowing";
import removeNotifications from "@/utils/notificationHelpers/removeNotification";
import React, { useEffect, useState } from "react";

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
    <div className="border p-4 mb-2 flex justify-between items-center bg-white shadow-md text-black font-stalinist">
      <div>{`User ${notification.followingId} started following you.`}</div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => onClose(notification.id)}
      >
        Close
      </button>
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
    <div className="p-5">
      <div className="text-2xl font-bold mb-4">Notifications</div>
      <div>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClose={handleCloseNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
