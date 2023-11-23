import ContactForm from "../common/form/contact-form";

const contactInfo = [
  {
    icon: "fal fa-map-marker-alt",
    title: "adresse :",
    subtitle: "Imm Zarrouk, 19 Av, Abou Hamed Ghazeli, 4002 Sousse",
  },
  {
    icon: "fal fa-envelope-open-text",
    title: "Email:",
    subtitle: "Contact@erentheme.com",
  },
  {
    icon: "fal fa-phone-alt",
    title: "Numero :",
    subtitle: "+21629750707",
  },
];

const ContactArea = () => {
  return (
    <>
      <section className="contact__area pb-100 pt-95">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="contact__info">
                <h3>retrouvez-nous ici</h3>
                <ul className="mb-55">
                  {contactInfo.map((item) => (
                    <li key={item.title} className="d-flex mb-35">
                      <div className="contact__info-icon mr-20">
                        <i className={item.icon}></i>
                      </div>
                      <div className="contact__info-content">
                        <h6>{item.title}</h6>
                        <span>{item.subtitle}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>
                e-nasba, nous sommes ravis d'entendre parler de vous.
                 Que ce soit pour des demandes de produits sur mesure,
                  des préoccupations concernant une commande,
                 n'hésitez pas à nous contacter.
                </p>

                <div className="contact__social">
                  <ul>
                    {/* <li><a href="#"><i className="fab fa-dribbble"></i></a></li> */}
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-tiktok"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact__form">
                <h3>Contact</h3>
                {/* contact form stat */}
                <ContactForm />
                {/* contact form stat */}
                <p className="ajax-response"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
