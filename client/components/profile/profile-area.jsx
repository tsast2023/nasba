import ProfileForm from "../common/form/profile-form";

const ProfileArea = () => {
  return (
    <>
      <section className="contact__area pb-100 pt-95">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="contact__info">
                <h3>Welcome, Username</h3>
                <ul className="mb-55">
                  <img
                    src="/assets/img/profile/default.jpg"
                    alt="Profile Image"
                  />
                </ul>
                <p>
                  E-nasba is a premium Templates theme with advanced admin
                  module. It's extremely customizable, easy to use and fully
                  responsive and retina ready. Vel illum dolore eu feugiat nulla
                  facilisis at vero eros et accumsan et iusto odio dignissim qui
                  blandit praesent luptatum zzril delenit augue duis dolore te
                  feugait nulla facilisi.
                </p>
                <div className="contact__social">
                  <ul>
                    <li>
                      <a href="/wishlist">
                        <i className="fas fa-list"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/cart">
                        <i className="fas fa-cart-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact__form">
                <h3>Update My Info</h3>
                <ProfileForm />
                <p className="ajax-response"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileArea;
