import { useState } from "react";
import { EnvelopeFill } from "react-bootstrap-icons";
import {
  PhoneFill,
  Facebook,
  Twitter,
  Pinterest,
  Linkedin,
} from "react-bootstrap-icons";

export default function ContactUs() {
  const [errors, setErrors] = useState(new Map<string, string>());
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  //const [valid, setValid] = useState("false");
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const errorMessages: Map<string, string> = new Map<string, string>([
    ["name", "Please enter your name"],
    ["email", "Please enter email"],
    ["emailInvalid", "Invalid email address"],
    ["phone", "Please enter phone"],
    ["phoneInvalid", "Invalid phone number"],
    ["message", "Please enter your message"],
  ]);

  /* useEffect(() => {
    handleFormErrors();
  }, []);*/

  const isValidEmail = (email: string | undefined) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email ?? "");
  };

  const isValidPhone = (phone: string) => {
    return /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i.test(phone);
  };

  const handleFormErrors = () => {
    let allerrors = new Map<string, string>();
    if (contact.name == "") {
      allerrors.set("name", errorMessages.get("name") ?? "");
    }

    if (contact.email == "") {
      allerrors.set("email", errorMessages.get("email") ?? "");
    } else {
      if (!isValidEmail(contact.email)) {
        allerrors.set("email", errorMessages.get("emailInvalid") ?? "");
      }
    }
    if (contact.phone == "") {
      allerrors.set("phone", errorMessages.get("phone") ?? "");
    } else {
      if (!isValidPhone(contact.phone)) {
        allerrors.set("phone", errorMessages.get("phoneInvalid") ?? "");
      }
    }

    if (contact.message == "") {
      allerrors.set("message", errorMessages.get("message") ?? "");
    }
    console.log(allerrors);

    setErrors(allerrors);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const elemname = e.currentTarget.name;
    const value = e.currentTarget.value;
    let elemErrors = errors;
    if (e.currentTarget.checkValidity()) {
      elemErrors.set(elemname, "");
    } else {
      elemErrors.set(elemname, errorMessages.get(elemname) ?? "");
    }
    setErrors(elemErrors);
    setContact((prev) => ({ ...prev, [elemname]: value }));
    //handleFormErrors();
  };

  const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const elemname = e.currentTarget.name;
    const value = e.currentTarget.value;
    let elemErrors = errors;
    if (e.currentTarget.checkValidity()) {
      elemErrors.set(elemname, "");
    } else {
      elemErrors.set(elemname, errorMessages.get(elemname) ?? "");
    }
    setErrors(elemErrors);
    setContact((prev) => ({ ...prev, [elemname]: value }));
    //handleFormErrors();
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormErrors();
    if (errors.size > 0) {
      alert("Please fix the errors first");
      return;
    }
    alert(
      "Your message has been sent successfully. We will get back to you soon"
    );
  };

  return (
    <section className="contact d-flex flex-column align-items-center ">
      <div className="contact-overlay d-flex flex-column align-items-center">
        <div className="contact-header d-flex flex-column align-items-center">
          <h2>Contact Us</h2>
          <h3 className="py-4">We’d love to hear from you! </h3>
          <p className="py-5">
            Questions, feedback, or just want to say hello? Drop us a message
            and we’ll get back to you as soon as we can.
          </p>
        </div>

        <article className="contact-us d-flex white-bg p-5 text-start">
          <div className="contact-list d-flex flex-column">
            <h6 className="mb-3">Contact information</h6>
            <div className="contact-list-items ">
              <EnvelopeFill />
              <p>admin@savorysecrets.com</p>
              <PhoneFill />
              <p>(510)3661232</p>
              <Facebook />
              <p>www.facebook.com/savorysecrets</p>
              <Pinterest />
              <p>www.pinterest.com</p>
              <Linkedin />
              <p>www.linkedin.com/savorysecrets</p>
              <Twitter />
              <p>twitter.com/savorysecrets</p>
            </div>
          </div>
          <div className="contact-form d-flex gap-5 border border-secondary rounded-5 overflow-hidden align-items-center ">
            <form
              className="w-100 d-flex gap-5 flex-column"
              onSubmit={handleSubmitForm}
            >
              <div className="d-flex gap-3">
                <label htmlFor="name" className="form-label">
                  Name*:
                </label>

                <input
                  id="name"
                  name="name"
                  value={contact.name}
                  type="text"
                  placeholder="Enter Full Name"
                  required
                  className={
                    errors.get("name")
                      ? "form-control border border-danger"
                      : "form-control border border-secondary"
                  }
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-flex gap-3">
                <label htmlFor="email" className="form-label">
                  Email*:
                </label>

                <input
                  id="email"
                  name="email"
                  value={contact.email}
                  type="email"
                  placeholder="Enter Email"
                  required
                  className={
                    errors.get("email")
                      ? "form-control border border-danger"
                      : "form-control border border-secondary"
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex gap-3">
                <label htmlFor="phone" className="form-label">
                  Phone*:
                </label>

                <input
                  id="phone"
                  name="phone"
                  value={contact.phone}
                  type="text"
                  placeholder="Enter Phone no .((xxx)xxx-xxx)"
                  required
                  className={
                    errors.get("phone")
                      ? "form-control border border-danger"
                      : "form-control border border-secondary"
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex gap-3">
                <label htmlFor="msg" className="form-label">
                  Message*:
                </label>

                <textarea
                  id="msg"
                  name="message"
                  value={contact.message}
                  placeholder="Enter your message here"
                  required
                  className={
                    errors.get("message")
                      ? "form-control border border-danger"
                      : "form-control border border-secondary"
                  }
                  onChange={handleTextAreaChange}
                />
              </div>
              <div className="d-flex gap-3 justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
                <button type="reset" className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </section>
  );
}
