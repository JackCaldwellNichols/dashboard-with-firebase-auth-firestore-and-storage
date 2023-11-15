import React, { useEffect, useState } from "react";
import "./widget.scss";
import {
  AccountBalanceWalletOutlined,
  KeyboardArrowUp,
  MonetizationOnOutlined,
  Person2Outlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const Widget = ({ type }) => {
  let data;
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        query: "users",
        icon: (
          <Person2Outlined
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "View all orders",
        query: "products",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlined
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0,128, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("timeStamp", "<=", today),
        where("timeStamp", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, "users"),
        where("timeStamp", "<=", lastMonth),
        where("timeStamp", ">", prevMonth)
      );
      const lastMonthData = await getDocs(lastMonthQuery);
      const preMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - preMonthData.docs.length) /
          preMonthData.docs.length) *
          100
      );
    };
    fetchData();
  });

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
