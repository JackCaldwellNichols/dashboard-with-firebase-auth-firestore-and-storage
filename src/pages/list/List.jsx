import React from "react";
import "./list.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTable from "../../components/datatable/DataTable";

const List = ({ title, type }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable title={title} type={type} />
      </div>
    </div>
  );
};

export default List;
