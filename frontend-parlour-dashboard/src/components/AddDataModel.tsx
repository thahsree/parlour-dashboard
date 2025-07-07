// AddDataModel.tsx
"use client";
import { Dispatch, SetStateAction } from "react";

type Field = {
  name: string;
  label: string;
  type: string;
};

type Props<T> = {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
  fields: Field[];
  onSubmit: () => void;
  title: string;
};

const AddDataModel = <T extends Record<string, any>>({
  formData,
  setFormData,
  fields,
  onSubmit,
  title,
}: Props<T>) => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-4"
      >
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1">{field.label}</label>
            <input
              className="p-2 border rounded"
              type={field.type}
              value={formData[field.name]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.value,
                }))
              }
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDataModel;
