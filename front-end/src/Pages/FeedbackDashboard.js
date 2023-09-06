import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UsersDashboard.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const FeedbackDashboard = () => {
  // if (!localStorage.getItem("id")) navigate("/");
  const [users, setUsers] = useState([]);
  const [scenete, setScenete] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch users from backend API
    axios.get("http://localhost:8080/api/feedback").then((res) => {
      setUsers(res.data);
    });
    axios.get("http://localhost:8080/api/sceneta").then((res) => {
      setScenete(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Observații",
        accessor: "observatii",
      },
      {
        Header: "Nota Scenetă",
        accessor: "notaSceneta",
      },
      {
        Header: "Sceneta",
        accessor: "scenetaId",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleDeleteUser(row.original.id)}>
              <FaTrash />
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: users });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleDeleteUser = async (userId) => {
    try {
      await axios
        .delete(`http://localhost:8080/api/feedback/${userId}`)
        .then((res) => {
          toast.success("Feedback șters cu succes!");
        });

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
      toast.warning("Feedback-ul nu a putut fii ștearsă!");
    }
  };

  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const sceneta = scenete.find((s) => s.id === user.scenetaId);
    return sceneta && sceneta.nume.toLowerCase().includes(filter.toLowerCase());
  });

  const renderUsers = () =>
    filteredUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.observatii}</td>
        <td>{user.notaSceneta}</td>
        <td>{scenete.find((el2) => el2.id === user.scenetaId)?.nume}</td>
        <td>
          <button
            style={{ backgroundColor: "#3f51b5" }}
            onClick={() => handleDeleteUser(user.id)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <div>
        <Navbar></Navbar>

        <div className="dashboard-table-container" style={{ marginTop: 25 }}>
          <ToastContainer autoClose={2000} />
          <div className="search-container">
            <input
              type="text"
              placeholder="Caută după numele scenetei"
              value={filter}
              style={{ textAlign: "center", width: "15rem" }}
              onChange={handleInputChange}
            />
          </div>

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
            <tbody>{renderUsers()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FeedbackDashboard;
