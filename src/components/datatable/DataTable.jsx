import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, productColumns } from "../../data";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

const DataTable = ({ title, type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, type),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, type, id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="link" to={`/${type}/${params.row.id}`}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable ">
      <div className="dataTableTitle">
        {title}
        <Link className="link" to={`/${type}/new`}>
          <button>Add New</button>
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={
          type === "users"
            ? userColumns.concat(actionColumn)
            : productColumns.concat(actionColumn)
        }
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[9]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
