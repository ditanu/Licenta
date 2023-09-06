import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UsersDashboard.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUsersComponent from "../components/ModalUsers";
import Navbar from "../components/Navbar";

const BileteRezervateDashboard = () => {
  // if (!localStorage.getItem("id")) navigate("/");
  const [users, setUsers] = useState([]);
  const [utilizator, setUtilizator] = useState([]);
  const [scenete, setScenete] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    // Fetch users from backend API
    axios.get("http://localhost:8080/api/utilizator").then((res) => {
      setUtilizator(res.data);
    });
    axios.get("http://localhost:8080/api/utilizator/bilete").then((res) => {
      setUsers(res.data);
    });
    axios.get("http://localhost:8080/api/sceneta").then((res) => {
      setScenete(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nume Utilizator",
        accessor: "utilizatorId",
      },
      {
        Header: "Nume Sceneta",
        accessor: "scenetaId",
      },
      {
        Header: "Locuri Rezervate",
        accessor: "locuri_rezervate",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: users });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const renderUsers = () =>
    users.map((user) => (
      <tr key={user.id}>
        <td>
          {utilizator.find((el2) => el2.id == user.utilizatorId)?.nume +
            " " +
            utilizator.find((el2) => el2.id == user.utilizatorId)?.prenume}
        </td>
        <td>{scenete.find((el2) => el2.id == user.scenetaId)?.nume}</td>
        <td>{user.locuri_rezervate}</td>
      </tr>
    ));

  return (
    <>
      <div>
        <Navbar />
        <div className="dashboard-table-container" style={{ marginTop: 25 }}>
          <ToastContainer autoClose={2000} />

          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>{renderUsers()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BileteRezervateDashboard;
