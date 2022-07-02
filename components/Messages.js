import { useMoralis } from "react-moralis";
import React, { useState, useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import { MdSend } from "react-icons/md";

const Messages = () => {
  const styles = {
    container: `h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden`,
    recentTitle: `text-2xl font-bold text-center mb-[20px] text-center mt-[40px]`,
    button: `block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2`,
  };

  const { user, setUserData, userError } = useMoralis();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const { assets, messages } = useContext(AmazonContext);
  const [message, setmessage] = useState();
  console.log(messages);
  const handleSubmit = async () => {
    const Message = Moralis.Object.extend("messages");
    const myDetails = new Message();
    if (message) {
      myDetails.set("message", message);
    }

    myDetails.set("name", user.attributes.name);
    myDetails.set("userId", user.id);
    myDetails.set("profile", user.attributes.profileImg);

    await myDetails.save();
  };

  return (
    <div className={styles.container}>
      <div className="h-full px-10 py-4">
        <>
          {messages.map((messages) => {
            let messageCheck = "";

            if (user.id === messages.attributes.userId) {
              return (
                <div className="w-full flex flex-start overflow-y-auto">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <img
                        className="h-5 w-5 overflow-hidden rounded-full"
                        src={messages.attributes.profile}
                        alt=""
                      />
                      <p className="font-semibold ml-3 text-sm text-slate-600">
                        {messages.attributes.name}{" "}
                        <span className="text-slate-400 text-xs">3:21 PM</span>
                      </p>
                    </div>

                    <div className="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
                      <p className=" text-sm text-slate-500">
                        {messages.attributes.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="w-full flex justify-end mt-3">
                  <div className="w-1/2 ">
                    <div className="flex items-center justify-end">
                      <p className="font-semibold mr-3 text-sm text-slate-600">
                        {messages.attributes.name}{" "}
                        <span className="text-slate-400 text-xs">3:25 PM</span>
                      </p>

                      <img
                        className="h-5 w-5 overflow-hidden rounded-full"
                        src={messages.attributes.profile}
                        alt=""
                      />
                    </div>

                    <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
                      <p className=" text-sm text-white">
                        {messages.attributes.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </>
      </div>

      <div className="  w-full  px-5 py-3">
        <div className="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg">
          <input
            type="text"
            className="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Type your message"
            onChange={(event) => setmessage(event.currentTarget.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <div className="flex items-center space-x-4">
            <button type="submit" variant="contained" onClick={handleSubmit}>
              <MdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
