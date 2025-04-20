import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../assets/AddItem.css';

const AddItem = ({ onAddItem, fields = [] }) => {
  const [showForm, setShowForm] = React.useState(false);

  const validationSchema = Yup.object(
    fields.reduce(
      (acc, field) => {
        acc[field] = Yup.string().required(`${field} is required`);
        return acc;
      },
      {}
    )
  );

  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
    validationSchema,
    onSubmit: (values) => {
      onAddItem(values);
      setShowForm(false); 
      formik.resetForm();
    },
  });

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="add-button">
        Добавить
      </button>

      {showForm && (
        <div className="form-container">
          {fields.map((field) => (
            <div key={field}>
              <input
                type="text"
                name={field}
                placeholder={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
              />
              {formik.errors[field] && formik.touched[field] && (
                <div className="error">{formik.errors[field]}</div>
              )}
            </div>
          ))}
          <button type="submit" onClick={formik.handleSubmit}>
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddItem;