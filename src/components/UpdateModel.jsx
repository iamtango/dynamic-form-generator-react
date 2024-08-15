import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TrashIcon } from "@heroicons/react/20/solid";
import * as Yup from "yup";
import AddFieldModal from "./AddFieldModal";

const UpdateModel = ({
  postTopic,
  setPostTopic,
  setShowPostModal,
  modelName,
  validationSchema,
}) => {
  const [open, setOpen] = useState(true);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    postTopic.department || ""
  );
  useEffect(() => {
    const dynamicFieldNames = Object.keys(postTopic).filter((key) =>
      key.startsWith("customField_")
    );
    if (dynamicFieldNames.length > 0) {
      const existingFields = dynamicFieldNames.map((name) => ({
        label: name.replace("customField_", "").replace(/_/g, " "),
        type: "text",
      }));
      setDynamicFields(existingFields);
    }
  }, [postTopic]);

  const addField = (field) => {
    setDynamicFields((prevFields) => [...prevFields, field]);
  };
  const removeField = (index) => {
    setDynamicFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      e.stopPropagation();
    }
  };

  const handleSubmit = (values) => {
    setPostTopic(values);
    setOpen(false);
    setShowPostModal(false);
  };

  return (
    <>
      <AddFieldModal
        isOpen={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onAddField={addField}
      />

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            setShowPostModal(false);
          }}
          onClick={handleClickOutside}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel
                  ref={dialogRef}
                  className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3  sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-center text-gray-900">
                        {modelName}
                      </Dialog.Title>
                      <div className="space-y-4 sm:px-3">
                        <Formik
                          initialValues={postTopic}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}>
                          {({
                            isSubmitting,
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                          }) => (
                            <Form className="mt-2" onSubmit={handleSubmit}>
                              <div className="border-b border-gray-900/10 pb-2">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">
                                  Update Info
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600 border-b-2 pb-1"></p>

                                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="name"
                                      className="block text-sm font-medium leading-6 text-gray-900">
                                      Name
                                      <span className="text-red-600 text-xl">
                                        *
                                      </span>
                                    </label>
                                    <Field
                                      type="text"
                                      id="name"
                                      name="name"
                                      placeholder="Enter your Name"
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      value={values.name}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name="name"
                                      component="div"
                                      className="text-red-600"
                                    />
                                  </div>
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium leading-6 text-gray-900">
                                      Email
                                      <span className="text-red-600 text-xl">
                                        *
                                      </span>
                                    </label>
                                    <Field
                                      type="email"
                                      id="email"
                                      name="email"
                                      placeholder="Enter your Email"
                                      autoComplete="given-email"
                                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      value={values.email}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-red-600"
                                    />
                                  </div>

                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="department"
                                      className="block text-sm font-medium leading-6 text-gray-900">
                                      Department:
                                      <span className="text-red-600 text-xl">
                                        *
                                      </span>
                                    </label>
                                    <Field
                                      as="select"
                                      id="department"
                                      name="department"
                                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      value={values.department}
                                      onChange={(e) => {
                                        handleChange(e);
                                        setSelectedDepartment(e.target.value);
                                      }}>
                                      <option value="">
                                        Select Department
                                      </option>
                                      {[
                                        {
                                          id: 1,
                                          name: "HSC/Diploma/UG/PG",
                                        },
                                        {
                                          id: 2,
                                          name: "Government",
                                        },
                                      ].map((topic) => (
                                        <option
                                          key={topic.id}
                                          value={topic.name}>
                                          {topic.name}
                                        </option>
                                      ))}
                                    </Field>
                                    <ErrorMessage
                                      name="department"
                                      component="div"
                                      className="text-red-600"
                                    />
                                  </div>

                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="qualification"
                                      className="block text-sm font-medium leading-6 text-gray-900">
                                      Highest Qualification:
                                      <span className="text-red-600 text-xl">
                                        *
                                      </span>
                                    </label>
                                    <Field
                                      type="text"
                                      id="qualification"
                                      name="qualification"
                                      placeholder="Enter your highest qualification"
                                      autoComplete="highest-qualification"
                                      className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      value={values.qualification}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name="qualification"
                                      component="div"
                                      className="text-red-600"
                                    />
                                  </div>
                                  {selectedDepartment === "Government" && (
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="idProof"
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                        ID Proof:
                                        <span className="text-red-600 text-xl">
                                          *
                                        </span>
                                      </label>
                                      <Field
                                        type="text"
                                        id="idProof"
                                        name="idProof"
                                        placeholder="Enter ID Proof"
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={values.idProof}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                      <ErrorMessage
                                        name="idProof"
                                        component="div"
                                        className="text-red-600"
                                      />
                                    </div>
                                  )}
                                  {dynamicFields.map((field, index) => (
                                    <div
                                      key={index}
                                      className="mt-4 sm:col-span-3 relative">
                                      <label
                                        htmlFor={`customField_${field.label}`}
                                        className="block text-sm font-medium leading-6 text-gray-900">
                                        {field.label}
                                      </label>
                                      {field.type === "text" && (
                                        <Field
                                          type="text"
                                          id={`customField_${field.label}`}
                                          name={`customField_${field.label}`}
                                          placeholder={`Enter ${field.label}`}
                                          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                      )}
                                      {field.type === "textarea" && (
                                        <Field
                                          as="textarea"
                                          id={`customField_${field.label}`}
                                          name={`customField_${field.label}`}
                                          placeholder={`Enter ${field.label}`}
                                          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          onBlur={handleBlur}
                                          onChange={handleChange}
                                        />
                                      )}
                                      {field.type === "select" && (
                                        <Field
                                          as="select"
                                          name={`customField_${field.label}`}
                                          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                          <option value="">
                                            Select an option
                                          </option>
                                          {field.options.map((opt, i) => (
                                            <option key={i} value={opt}>
                                              {opt}
                                            </option>
                                          ))}
                                        </Field>
                                      )}
                                      {field.type === "checkbox" && (
                                        <div className="flex flex-wrap gap-4 mt-1">
                                          {field.options.map((opt, i) => (
                                            <div
                                              key={i}
                                              className="flex items-center mt-2">
                                              <Field
                                                type="checkbox"
                                                name={`customField_${field.label}`}
                                                value={opt}
                                                className="h-4 w-4 text-indigo-600 px-1.5 border-gray-300  focus:ring-indigo-500"
                                              />
                                              <label
                                                htmlFor={`customField_${field.label}_${i}`}
                                                className="ml-2 text-sm  text-gray-600">
                                                {opt}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      {field.type === "radio" && (
                                        <div className="flex flex-wrap gap-4 mt-1">
                                          {field.options.map((opt, i) => (
                                            <div
                                              key={i}
                                              className="flex items-center mt-2">
                                              <Field
                                                type="radio"
                                                name={`customField_${field.label}`}
                                                value={opt}
                                                className="h-4 w-4 text-indigo-600 px-1.5 border-gray-300 focus:ring-indigo-500"
                                              />
                                              <label
                                                htmlFor={`customField_${field.label}_${i}`}
                                                className="ml-2 text-sm text-gray-600">
                                                {opt}
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      <button
                                        type="button"
                                        className="absolute top-0 right-0 mt-2 mr-2 text-red-600 hover:text-red-800"
                                        onClick={() => removeField(index)}>
                                        <TrashIcon className="h-4" />

                                        <span className="sr-only">Delete</span>
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className=" flex justify-end gap-x-2 mt-4 sm:col-span-6">
                                <button
                                  type="button"
                                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  onClick={() => setIsAddFieldModalOpen(true)}>
                                  Add Field
                                </button>
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  className="rounded-md bg-[#DD0426] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#dd0425d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  onClick={() => {
                                    setOpen(false);
                                    setShowPostModal(false);
                                  }}
                                  ref={cancelButtonRef}>
                                  Cancel
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default UpdateModel;
