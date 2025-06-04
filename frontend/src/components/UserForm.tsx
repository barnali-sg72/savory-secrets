import { useEffect, useState } from "react";
import { Result, User, UserContext, UserContextType } from "../App";
import { useNavigate } from "react-router-dom";
import React from "react";

type Props = {
  mode: string;
};

export default function UserForm(props: Props) {
  //const [mode, setMode] = useState("");
  const [errors, setErrors] = useState(new Map<string, string>());
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const userContext: UserContextType = React.useContext(
    UserContext
  ) as UserContextType;
  //const pageLayout: PageLayoutType = useOutletContext();
  const [currentUser, setCurrentUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {
          id: "",
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          email: "",
          phone: "",
        }
  );

  const errorMessages: Map<string, string> = new Map<string, string>([
    ["firstname", "Please enter first name"],
    ["lastname", "Please enter last name"],
    ["username", "Please enter username"],
    ["password", "Please enter password"],
    ["email", "Please enter email"],
    ["emailInvalid", "Invalid email address"],
    ["phone", "Please enter phone"],
    ["phoneInvalid", "Invalid phone number"],
  ]);

  useEffect(() => {
    handleFormErrors();
  }, [currentUser]);

  const navigate = useNavigate();

  const handleFormErrors = () => {
    let allerrors = new Map<string, string>();
    if (currentUser?.firstname === "") {
      allerrors.set("firstname", errorMessages.get("firstname") ?? "");
    }
    if (currentUser?.lastname === "") {
      allerrors.set("lastname", errorMessages.get("lastname") ?? "");
    }
    if (currentUser?.username === "") {
      allerrors.set("username", errorMessages.get("username") ?? "");
    }
    if (currentUser?.password === "") {
      allerrors.set("password", errorMessages.get("password") ?? "");
    }
    if (currentUser?.email === "") {
      allerrors.set("email", errorMessages.get("email") ?? "");
    } else {
      if (!isValidEmail(currentUser?.email)) {
        allerrors.set("email", errorMessages.get("emailInvalid") ?? "");
      }
    }
    if (currentUser?.phone === "") {
      allerrors.set("phone", errorMessages.get("phone") ?? "");
    } else {
      if (!isValidPhone(currentUser?.phone)) {
        allerrors.set("phone", errorMessages.get("phoneInvalid") ?? "");
      }
    }

    setErrors(allerrors);
  };

  const isValidEmail = (email: string | undefined) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email ?? "");
  };

  const isValidPhone = (phone: string | undefined) => {
    return /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i.test(phone ?? "");
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (e.currentTarget.checkValidity()) {
      errors.set(name, "");
    } else {
      errors.set(name, errorMessages.get(name) ?? "");
    }
    setCurrentUser((prev) => (prev ? { ...prev, [name]: value } : null));
    //handleFormErrors();
  };
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.size > 0) {
      alert("Please fix the errors first");
      return;
    }
    const result: Promise<any> = userContext.saveUser(currentUser, props.mode);
    result
      .then((value: Result) => {
        //alert(value);
        if (value.error) {
          setError(value.message);
        } else {
          setSuccess(value.message);
        }
        //pageLayout.displayMessage(false, value);

        window.scrollTo(0, 0);
      })
      .catch((err) => {
        alert(err);
        //pageLayout.displayMessage(true, err);
        setError(err);
        window.scrollTo(0, 0);
      });
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (localStorage.getItem("user")) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="d-flex flex-column signup px-5">
      <div className="message">
        {success ? (
          <p className="alert alert-success fw-bold" role="alert">
            {success}
          </p>
        ) : error ? (
          <p className="alert alert-danger fw-bold" role="alert">
            {error}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="form-header mb-3 mt-1">
        <div className="px-0">
          <h4 className="py-2 ms-2 text-white">
            {props.mode === "signup"
              ? "Enter your information"
              : "Edit your information"}
          </h4>
        </div>
      </div>

      <div className="d-flex justify-content-center userform">
        <div className="recipe-layout">
          <form className="recipe-form mt-1" onSubmit={handleSubmitForm}>
            <div className="row">
              <div className="col-md-12">
                <div className="row mb-3 mt-4">
                  <div className="col-md-3">
                    <label htmlFor="firstname" className="form-label">
                      First Name*
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={currentUser?.firstname}
                      required
                      className={
                        errors.get("firstname")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("firstname")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name*
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      required
                      value={currentUser?.lastname}
                      className={
                        errors.get("lastname")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("lastname")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="username" className="form-label">
                      Username*
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={currentUser?.username}
                      required
                      className={
                        errors.get("username")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("username")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="password" className="form-label">
                      Password*
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={currentUser?.password}
                      required
                      className={
                        errors.get("password")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("password")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="email" className="form-label">
                      Email Address*
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={currentUser?.email}
                      className={
                        errors.get("email")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("email")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="phone" className="form-label">
                      Phone No.((xxx)xxx-xxx)*
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      value={currentUser?.phone}
                      className={
                        errors.get("phone")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("phone")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md">
                    <div className="mb-5 justify-center" role="group">
                      <button type="submit" className="btn btn-primary me-1">
                        {props.mode === "signup" ? "Sign Up" : "Save"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/*function useOutletContext(): PageLayoutType {
  throw new Error("Function not implemented.");
}*/
