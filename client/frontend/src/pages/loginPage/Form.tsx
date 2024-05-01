import { useState } from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../ReduxContext/context";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Lastname is required"),
  location: yup.string().required("Lastname is required"),
  occupation: yup.string().required("Lastname is required"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Lastname is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

function Form() {
  const [page, setPage] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = page === "login";
  const isRegister = page === "register";

  const handleFormSubmit = async (values, onSubmit) => {
    console.log("sub");
  };

  return (
    <Formik
      onsubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div></div>
        </form>
      )}
    </Formik>
  );
}

export default Form;
