import React, { useState } from "react";
import { useFormik } from "formik";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import ErrorMsg from "./error-msg";
import { contactSchema } from "./validation-schema";

const ContactForm = () => {
  const [contact , setContact] = useState({name :"" , email: "" , message: ""}); 
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(contact)
    try {
      emailjs.send("service_nhrofl9", "template_lr3t0ky", contact, "R6xfuGtEjoTL5HzM8");
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while sending the message.",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };


  

  return (
    <>
      <form onSubmit={handleOnSubmit}  id="contact-form">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="contact__input">
              <label>
                Nom <span className="required">*</span>
              </label>
              <input
                id="name"
                
                onChange={e=>{setContact({...contact , nom: e.target.value})}}
                
                type="text"
              />
              
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact__input">
              <label>
                Email: <span className="required">*</span>
              </label>
              <input
                id="email"
                
                onChange={e=>{setContact({...contact , email: e.target.value})}}
               
                type="email"
              />
             
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__input">
              <label>Message:</label>
              <textarea
                id="message"
                cols="30"
                rows="10"
                name="message"
                
                onChange={e=>{setContact({...contact , message: e.target.value})}}
                
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__submit">
              <button type="submit" className="os-btn os-btn-black">
              Envoyer Message 
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
