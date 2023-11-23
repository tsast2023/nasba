import { useFormik } from "formik";

import ErrorMsg from "./error-msg";
import { contactSchema } from "./validation-schema";

const ContactForm = () => {
  // contact form
  const handleOnSubmit = (values, { resetForm }) => {
    alert(`${values.name + "\n" + values.email + "\n" + values.msg}`);
    resetForm();
  };
  // use formik
  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    initialValues: { name: "", email: "", msg: "" },
    validationSchema: contactSchema,
    onSubmit: handleOnSubmit,
  });
  return (
    <>
      <form onSubmit={handleSubmit} id="contact-form">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="contact__input">
              <label>Username </label>
              <input
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact__input">
              <label>Email </label>
              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__input">
              <label>Password </label>
              <input
                id="msg"
                value={values.msg}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </div>
          </div>
          <div className="col-xl-12">
            <div className="contact__input">
              <label>Confirm Password </label>
              <input
                id="msg"
                value={values.msg}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__submit">
              <button type="submit" className="os-btn os-btn-black">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
