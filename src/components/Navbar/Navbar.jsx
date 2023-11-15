import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { DarkModeContext } from "../../context/DarkModeContext";
import {
  ChatBubbleOutline,
  DarkModeOutlined,
  LanguageOutlined,
  ListOutlined,
  Notifications,
  SearchOutlined,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { db, auth } from "../../Firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(DarkModeContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", currentUser.uid));
        setUser(snapshot.data());
      }
    });
  }, [currentUser]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search" />
          <SearchOutlined />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlined className="icon" />
          </div>
          <div className="item">
            <DarkModeOutlined
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <Notifications className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutline className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
          <div className="item">
            <img src={user.img} alt="user" className="user" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
