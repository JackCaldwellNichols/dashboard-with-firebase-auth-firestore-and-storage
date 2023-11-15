import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { db, auth, storage } from "../../Firebase/Firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title, type }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("paused");
              break;
            case "running":
              console.log("running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleProductAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, type), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, type, res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={type === "users" ? handleAdd : handleProductAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={percentage !== null && percentage < 100}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
