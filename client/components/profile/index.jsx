import React from "react";
import Footer from "../../layout/footers/footer-2";
import Header from "../../layout/headers/header";
import Breadcrumb from "../common/breadcrumb";
import ProfileArea from "./profile-area";

const index = () => {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb
          img="/assets/img/page-title/page-title-2.jpg"
          title={"My Profile"}
          subtitle={"profile"}
        />
        <ProfileArea />
      </main>
      <Footer />
    </>
  );
};

export default index;
