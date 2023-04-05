import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../helper/HttpServices";

export default function ChatList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData("/users")
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="v-container vh100 overflow-y">
      <div className="search-box">
        <input placeholder="Search for a user" />
      </div>
      <div className="chat-list">
        {users.map((user, index) => (
          <Link key={index} to={`/chat/${user._id}`}>
            <div className="list-card py-3 d-flex flex-row">
              <div className="avatar">
                <img src="/img/profile.jpg" />
              </div>
              <div className="chat-info">
                <h5>{user.userName}</h5>
                <h6>Hi how are you ?</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
