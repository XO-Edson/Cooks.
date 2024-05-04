import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { setLogin } from "../../ReduxContext/context";

// Define the types for form values
type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: string;
};

type LoginFormValues = {
  email: string;
  password: string;
};

// Define validation schemas
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.mixed().notRequired(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Initial values
const initialValuesRegister: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin: LoginFormValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [page, setPage] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*  const isLogin = page === "login";
  const isRegister = page === "register";
 */
  // Register function
  const register = async (values: RegisterFormValues, onSubmitProps: any) => {
    /* const formData = new FormData();

    // Append values to FormData
    for (const key in values) {
      if (key === "picture") {
        if (values.picture) {
          console.log(values.picture);
          formData.append(key, values.picture);
        } else {
          formData.append(key, values[key] as string);
        }
      }
    }
 */
    //console.log(formData);
    console.log(values);

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        onSubmitProps.resetForm();
        setPage("login"); // Navigate to login page
      } else {
        console.error("Failed to register user:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Login function
  const login = async (values: LoginFormValues, onSubmitProps: any) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const loggedInUser = await response.json();
        onSubmitProps.resetForm();
        dispatch(
          setLogin({ user: loggedInUser.user, token: loggedInUser.token })
        );

        navigate("/home");
      } else {
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (
    values: RegisterFormValues | LoginFormValues,
    onSubmitProps: any
  ) => {
    if (page === "login") {
      await login(values as LoginFormValues, onSubmitProps);
    } else if (page === "register") {
      await register(values as RegisterFormValues, onSubmitProps);
    }
  };

  return (
    <div>
      <nav className=" flex justify-between items-center bg-gray-900 p-4 absolute top-0 left-0 w-full shadow-md">
        <div className="flex items-center ml-2 md:ml-12 gap-x-4">
          <h1
            className=" font-bold text-3xl text-orange-700 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            COOKs.
          </h1>
        </div>
      </nav>
      <>
        {page === "register" && (
          <Formik
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              errors,
              touched,
              values,
              handleBlur,
              handleSubmit,
              handleChange,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-900 p-4 rounded-md"
              >
                <div className="w-full md:max-w-[50%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                  <h3 className=" font-bold col-span-2">
                    Welcome to <span className="text-orange-600">COOKs.</span>
                  </h3>
                  {/* First name input */}
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="input col-span-2 md:col-span-1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName && (
                    <div className="error">{errors.firstName}</div>
                  )}

                  {/* Last name input */}
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="input col-span-2 md:col-span-1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                  />
                  {touched.lastName && errors.lastName && (
                    <div className="error">{errors.lastName}</div>
                  )}

                  {/* Additional fields for registration */}
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="input col-span-2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                  />
                  {touched.location && errors.location && (
                    <div className="error">{errors.location}</div>
                  )}

                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    className="input col-span-2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                  />
                  {touched.occupation && errors.occupation && (
                    <div className="error">{errors.occupation}</div>
                  )}

                  <Dropzone
                    multiple={false}
                    onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section className="input col-span-2 h-20">
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>
                            Drag 'n' drop file here, or click to select files
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>

                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    className="input col-span-2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <div className="error">{errors.email}</div>
                  )}

                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input col-span-2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <div className="error">{errors.password}</div>
                  )}

                  <button
                    type="submit"
                    className="col-span-2 rounded-md bg-orange-700 p-2 hover:bg-orange-600"
                  >
                    SUBMIT
                  </button>

                  <p
                    className="text-xs mt-4 text-gray-200/50 hover:text-gray-50 cursor-pointer"
                    onClick={() => {
                      setPage("login");
                    }}
                  >
                    Already have an account? Login here.
                  </p>
                </div>
              </form>
            )}
          </Formik>
        )}

        {page === "login" && (
          <>
            <Formik
              initialValues={initialValuesLogin}
              validationSchema={loginSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                errors,
                touched,
                values,
                handleBlur,
                handleSubmit,
                handleChange,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="bg-slate-900 p-4 rounded-md"
                >
                  <div className="w-full md:max-w-[50%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                    <h3 className=" font-bold col-span-2">
                      Welcome to <span className="text-orange-600">COOKs.</span>
                    </h3>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      className="input col-span-2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <div className="error">{errors.email}</div>
                    )}

                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input col-span-2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <div className="error">{errors.password}</div>
                    )}

                    <button
                      type="submit"
                      className="col-span-2 rounded-md bg-orange-700 p-2 hover:bg-orange-600"
                    >
                      LOGIN
                    </button>

                    <p
                      className="text-xs mt-4 text-gray-200/50 hover:text-gray-50 cursor-pointer"
                      onClick={() => {
                        setPage("register");
                      }}
                    >
                      Dont have an account? Sign up here.
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </>
        )}
      </>
    </div>
  );
};

export default Form;
