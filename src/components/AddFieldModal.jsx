import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const AddFieldModal = ({ isOpen, onClose, onAddField }) => {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [options, setOptions] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef(null);

  const handleAddField = () => {
    setError("");

    if (!label.trim()) {
      setError("Label is required.");
      return;
    }

    if (type === "select" || type === "checkbox" || type === "radio") {
      const processedOptions = options
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt.length > 0);

      if (processedOptions.length === 0) {
        setError("At least one option is required.");
        return;
      }

      onAddField({
        label,
        type,
        options: processedOptions,
      });
    } else {
      onAddField({
        label,
        type,
        options: [],
      });
    }

    setLabel("");
    setType("text");
    setOptions("");
    onClose();
  };

  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      e.stopPropagation();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={() => {}}>
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClickOutside}
        />
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 text-center">
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
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:max-w-sm sm:w-full sm:p-6">
              <Dialog.Title
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900">
                Add New Field
              </Dialog.Title>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Label
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Add Label"
                  className="mt-1 block w-full px-1.5 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Field Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500">
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="select">Dropdown</option>
                </select>
              </div>
              {(type === "select" ||
                type === "checkbox" ||
                type === "radio") && (
                <div className="mt-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    placeholder="Option1, Option2"
                    className="mt-1 block w-full px-1.5  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500"
                  />
                </div>
              )}
              {error && (
                <div className="mt-2 text-sm text-red-600">{error}</div>
              )}
              <div className="flex justify-end gap-x-2 mt-4">
                <button
                  type="button"
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                  onClick={handleAddField}>
                  Submit Field
                </button>
                <button
                  type="button"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                  onClick={onClose}>
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddFieldModal;
