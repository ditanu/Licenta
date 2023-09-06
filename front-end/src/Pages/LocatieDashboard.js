import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UsersDashboard.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import ModalLocatie from "../components/ModalLocatie";

const LocatieDashboard = () => {
  // if (!localStorage.getItem("id")) navigate("/");
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend API
    fetch("http://localhost:8080/api/locatie")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.nume.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const updateUser = (updatedUser) => {
    const indexToUpdate = users.findIndex((obj) => obj.id === updatedUser.id);
    const newUsers = [...users];
    newUsers[indexToUpdate] = updatedUser;
    setUsers(newUsers);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nume",
        accessor: "nume",
      },
      {
        Header: "Număr locuri",
        accessor: "nrLocuri",
      },
      {
        Header: "Stradă",
        accessor: "strada",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleOpenModal(row.original.id)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDeleteUser(row.original.id)}>
              <FaTrash />
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: filteredUsers });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleOpenModal = (userId, user) => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios
        .delete(`http://localhost:8080/api/locatie/${userId}`)
        .then((res) => {
          toast.success("Locație ștearsă cu succes!");
        });

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
      toast.warning("Locația nu a putut fii ștearsă!");
    }
  };
  const renderUsers = () =>
    filteredUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.nume}</td>
        <td>{user.nrLocuri}</td>
        <td>{user.strada}</td>
        <td>
          <button
            style={{ backgroundColor: "#3f51b5" }}
            onClick={() => handleOpenModal(user.id, user)}
          >
            <FaEdit />
          </button>
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
              placeholder="Caută după nume"
              style={{ textAlign: "center" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        {isEditing ? (
          <ModalLocatie
            user={editedUser}
            setIsEditing={setIsEditing}
            updateUser={updateUser}
          />
        ) : null}
      </div>
    </>
  );
};

export default LocatieDashboard;
