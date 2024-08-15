import React, { useState } from "react";
import SearchModel from "./SearchModel";
import { TrashIcon, ArrowUpOnSquareIcon } from "@heroicons/react/20/solid";
import DeleteConfirmModel from "./DeleteConfirmModel";
import UpdateModel from "./UpdateModel";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  department: Yup.string().required("Department is required"),
  qualification: Yup.string().required("Qualification is required"),
});

const Table = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track the ID of the item to delete
  const [searchText, setSearchText] = useState(""); // Search text
  const [editingId, setEditingId] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Vedang",
      email: "test@example.com",
      department: "HSC/Diploma/UG/PG",
      qualification: "HSC",
    },
  ]);

  const handleAddDetails = () => {
    setEditingId(null);
    setShowPostModal(true);
  };

  const handleHelpTopicSubmit = (values) => {
    if (editingId) {
      setData(
        data.map((item) =>
          item.id === editingId ? { ...item, ...values } : item
        )
      );
    } else {
      setData([...data, { id: data.length + 1, ...values }]);
    }
    setShowPostModal(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteSubmit = () => {
    try {
      setData(data.filter((item) => item.id !== deleteId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (id) => {
    try {
      console.log("handleUpdate ->", id);
      setEditingId(id);
      setShowPostModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveJson = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadJson = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json") {
      alert("Please upload a valid JSON file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        setData(json);
      } catch (error) {
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const filteredData = data.filter((item) =>
    [item.name, item.email, item.department, item.qualification].some((field) =>
      field.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const TableBodyData = (data) => {
    return (
      <>
        {data.map((row, i) => (
          <tr key={row.id} className="border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {i + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {row.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {row.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {row.department}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {row.qualification}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm flex gap-2 text-gray-500">
              <button
                type="button"
                className="block rounded-md px-2 py-1 text-center text-black hover:text-green-600 text-sm font-semibold focus-visible:outline-indigo-600"
                onClick={() => handleUpdate(row.id)}>
                <ArrowUpOnSquareIcon className="h-6" />
              </button>

              <button
                type="button"
                className="block rounded-md px-2 py-1 text-center text-sm font-semibold text-black hover:text-red-700 focus-visible:outline-indigo-600"
                onClick={() => handleDelete(row.id)}>
                <TrashIcon className="h-6" />
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Dynamic Form Generator
            </h1>
          </div>
          <SearchModel
            searchText={searchText}
            setSearchText={setSearchText}
            myData={data}
            setFilterData={() => {}}
          />
          <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-gray-800 hover:bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleAddDetails}>
              Add Details
            </button>
            <button
              type="button"
              className="block rounded-md bg-green-800 hover:bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSaveJson}>
              Save JSON
            </button>
            <label className="block rounded-md bg-blue-800 hover:bg-blue-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Load Data
              <input
                type="file"
                accept=".json"
                onChange={handleLoadJson}
                className="sr-only"
              />
            </label>
          </div>
        </div>
        <div className="overflow-x-auto mt-2 shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {[
                  "ID",
                  "Name",
                  "Email",
                  "Department",
                  "Qualification",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{TableBodyData(searchText ? filteredData : data)}</tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing {searchText ? filteredData.length : data.length} results
        </div>
      </div>
      {showPostModal && (
        <UpdateModel
          postTopic={
            editingId ? data.find((item) => item.id === editingId) : {}
          }
          setPostTopic={handleHelpTopicSubmit}
          setShowPostModal={setShowPostModal}
          modelName={editingId ? "Update Details" : "Add New Record"}
          validationSchema={validationSchema}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModel
          modelName={"Delete Info"}
          handleDeleteSubmit={handleDeleteSubmit}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};

export default Table;
