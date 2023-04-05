import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { IoIosCall, IoIosVideocam } from "react-icons/io";
import { FiPlus, FiCamera } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { postData, socket } from "../../helper/HttpServices";

export default function Chat() {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState([]);
  const params = useParams();
  const { auth } = useSelector((state) => state);
  const chatWindowRef = useRef(null);

  const handleMessageSend = () => {
    console.log(params.id);
    // console.log(auth);
    postData("/send-message", {
      sender: auth.user._id,
      receiver: params.id,
      message: text,
    }).then((res) => {
      setConversation(res.conversation.messages);
      // console.log();
    });
  };

  const fetchData = () => {
    console.log("calling...");
  };

  const handleSelectImage = () => {
    postData("/send-message", {
      sender: auth.user._id,
      receiver: params.id,
      message: text,
    }).then((res) => {
      console.log(res);
    });
    // console.log(params.id);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat window when messages change
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [conversation]);

  useEffect(() => {
    socket.on("UPDATE", (data) => {
      console.log(data);

      fetchData();
    });
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`container ${styles.header_body}`}>
          <div className={styles.img_container}>
            <img src="/img/profile.jpg" />
            <h5>James Roriguez</h5>
          </div>
          <div className={styles.call_icon}>
            <IoIosCall size={30} color="#000000" />
            <IoIosVideocam size={30} color="#000000" />
          </div>
        </div>
      </div>

      <div ref={chatWindowRef} className={styles.conversations}>
        <div className="container">
          {conversation.map((msg, index) => (
            <p
              key={index}
              className={msg.sender === auth.user._id ? "text-right" : ""}
            >
              {msg.message}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={`container ${styles.footer_item}`}>
          <FiPlus size={35} color="#000000" />
          <div className={styles.input_div}>
            <input type="text" onChange={(e) => setText(e.target.value)} />
          </div>
          {!text && text?.length === 0 && (
            <span className="pointer" onClick={handleSelectImage}>
              <FiCamera size={25} color="#000000" />
            </span>
          )}
          {text && text?.length !== 0 && (
            <span className="pointer" onClick={handleMessageSend}>
              <AiOutlineSend size={25} color="#000000" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
