import React from "react";
import { useTable } from "react-table";
import { IoLocateSharp } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

function TheatreTable() {
  // if (!localStorage.getItem("id")) navigate("/");
  const [data, setData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/trupa");
      const response2 = await fetch("http://localhost:8080/api/utilizator");
      const json = await response.json();
      const json2 = await response2.json();
      setData(json);
      setUsers(json2);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      data.filter((teatru) =>
        teatru.nume.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  async function handleActivateDeactivate(rowData) {
    const response = await fetch(
      `http://localhost:8080/api/trupa/${rowData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: !rowData.active,
        }),
      }
    );
    const json = await response.json();
    const status = response.status;
    if (status === 200) {
      toast.success("Trupa a fost activată/dezactivată!");
    } else {
      toast.warning("Trupa nu a putut fii activată/dezactivată!");
    }

    setData((prevState) =>
      prevState.map((d) => (d.id === rowData.id ? json : d))
    );
  }
  const columns = React.useMemo(
    () => [
      {
        Header: "Nume",
        accessor: "nume",
      },
      {
        Header: "Nr. Membrii",
        accessor: "nrMembrii",
      },
      {
        Header: "Descriere",
        accessor: "descriere",
      },
      {
        Header: "Utilizator ID",
        accessor: "utilizatorId",
      },
      {
        Header: "Activ",
        accessor: "active",
        Cell: ({ value }) => (value ? "Da" : "Nu"),
      },
      {
        Header: "Activează/Dezactivează",
        Cell: ({ row }) => (
          <button
            onClick={() => handleActivateDeactivate(row.original)}
            style={{ backgroundColor: "#3f51b5" }}
          >
            <IoLocateSharp />
          </button>
        ),
      },
    ],
    [selectedRow]
  );

  const tableInstance = useTable({ columns, data: filteredUsers });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <Navbar />
      <div
        className="dashboard-table-container"
        style={{ display: "flex", justifyContent: "center", marginTop: 25 }}
      >
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
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TheatreTable;
