import { useState, useEffect } from "react";
import "./single.scss";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const Single = ({ type }) => {
  const path = useLocation();
  const id = path.pathname.split("/")[2];
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getProduct();
  }, [id, type]);

  console.log(data);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {type === "users" ? (
          <>
            <div className="top">
              <div className="left">
                <div className="editBtn">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img className="itemImg" src={data?.img} alt="" />
                  <div className="details">
                    <h1 className="itemTitle">{data.displayName}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email: </span>
                      <span className="itemValue">{data.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone: </span>
                      <span className="itemValue">{data.phoneNumber}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address: </span>
                      <span className="itemValue">{data.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country: </span>
                      <span className="itemValue">{data.country}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="User Spending (Last 6 months)" />
              </div>
            </div>
            <div className="bottom">
              <h1 className="title">Last Transactions</h1>
              <List />
            </div>
          </>
        ) : (
          <>
            <div className="top">
              <div className="left">
                <div className="editBtn">Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img className="itemImg" src={data?.img} alt="" />
                  <div className="details">
                    <h1 className="itemTitle">{data.title}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Description: </span>
                      <span className="itemValue">{data.description}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Price: </span>
                      <span className="itemValue">${data.price}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">In Stock: </span>
                      <span className="itemValue">{data.stock}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="User Spending (Last 6 months)" />
              </div>
            </div>
            <div className="bottom">
              <h1 className="title">Last Transactions</h1>
              <List />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
