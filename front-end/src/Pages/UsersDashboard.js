import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./UsersDashboard.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUsersComponent from "../components/ModalUsers";
import Navbar from "../components/Navbar";

const UsersDashboard = () => {
  // if (!localStorage.getItem("id")) navigate("/");
  const [users, setUsers] = useState([]);
  const [keys, setKeys] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend API
    fetch("http://localhost:8080/api/utilizator")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.nume.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.prenume.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const updateUser = (updatedUser) => {
    const indexToUpdate = users.findIndex((obj) => obj.id === updatedUser.id);
    const newUsers = [...users];
    newUsers[indexToUpdate] = updatedUser;
    setUsers(newUsers);
  };

  const userTypes = ["User", "Admin"];

  const columns = useMemo(
    () => [
      {
        Header: "Nume",
        accessor: "nume",
      },
      {
        Header: "Prenume",
        accessor: "prenume",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Telefon",
        accessor: "telefon",
      },
      {
        Header: "Tip User",
        accessor: "tipDeUser",
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
      await axios.delete(`http://localhost:8080/api/utilizator/${userId}`);
      toast.success("User șters cu succes!");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
      toast.warning("User-ul nu a putut fi șters!");
    }
  };

  const renderUsers = () =>
    filteredUsers.map((user) => (
      <tr key={user.id}>
        <td>{user.nume}</td>
        <td>{user.prenume}</td>
        <td>{user.email}</td>
        <td>{user.telefon}</td>
        <td>{userTypes[user.tipDeUser] || ""}</td>
        <td>
          <button
            onClick={() => handleOpenModal(user.id, user)}
            style={{ backgroundColor: "#3f51b5" }}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            style={{ backgroundColor: "#3f51b5" }}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.nume.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.prenume.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  return (
    <>
      <div>
        <Navbar />
        <div className="dashboard-table-container" style={{ marginTop: 25 }}>
          <ToastContainer autoClose={2000} />
          <div className="search-container">
            <input
              type="text"
              placeholder="Caută după (pre)nume"
              value={searchQuery}
              style={{ textAlign: "center" }}
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
            <tbody {...getTableBodyProps()}>{renderUsers()}</tbody>
          </table>
        </div>
        {isEditing && (
          <ModalUsersComponent
            user={editedUser}
            setIsEditing={setIsEditing}
            updateUser={updateUser}
          />
        )}
      </div>
    </>
  );
};

export default UsersDashboard;
