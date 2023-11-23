import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/assets/img/logo/log-3.webp';

const footer_widget = [
  {
    id: 1,
    title: 'information',
    lists: [
      { list: 'About Us' },
      { list: 'Careers' },
      { list: 'Delivery Inforamtion' },
      { list: 'Privacy Policy' },
      { list: 'Terms & Condition' },
    ]
  },
  {
    id: 2,
    title: 'Customer Service',
    margin: true,
    lists: [
      { list: 'Shipping Policy' },
      { list: 'Help & Contact Us' },
      { list: 'Returns & Refunds' },
      { list: 'Online Stores' },
      { list: 'Terms & Condition' },
    ]
  },
]

const FooterThree = () => {
  return (
    <>
      <section className="footer__area dark-soft-bg">
        <div className="footer__top pt-100 pb-50">
          <div className="container custom-container-2">
            <div className="row">
              <div className="col-xl-12">
                <div className="footer__social-list mb-60">
                  <ul>
                    <li>
                      <a target="_blank" href="#">Facebook</a>
                    </li>
                    <li>
                      <a target="_blank" href="#">Twitter</a>
                    </li>
                    <li>
                      <a target="_blank" href="#">Instagram</a>
                    </li>
                    <li>
                      <a target="_blank" href="#">Pinterest</a>
                    </li>
                    <li>
                      <a target="_blank" href="#">Youtube</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <div className="footer__widget mb-30">
                  <div className="footer__widget-title mb-25">
                    <Link href="/">
                      <a>
                        <Image className='logo-ft' src={logo} alt="logo" />
                      </a>
                    </Link>
                  </div>
                  <div className="footer__widget-content">
                    <p>CEES is a premium Templates theme with advanced admin module. It’s extremely customizable, easy to use and fully responsive and retina ready.</p>
                    <div className="footer__contact">
                      <ul>
                        <li>
                          <div className="icon">
                            <i className="fal fa-map-marker-alt"></i>
                          </div>
                          <div className="text">
                            <span>Add: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.</span>
                          </div>
                        </li>
                        <li>
                          <div className="icon">
                            <i className="fal fa-envelope-open-text"></i>
                          </div>
                          <div className="text">
                            <span>Email: Contact@basictheme.com</span>
                          </div>
                        </li>
                        <li>
                          <div className="icon">
                            <i className="fal fa-phone-alt"></i>
                          </div>
                          <div className="text">
                            <span>Phone Number: (800) 123 456 789</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {footer_widget.map(item => (
                <div key={item.id} className="col-xl-2 col-lg-3 col-md-3 col-12">
                  <div className="footer__widget mb-30">
                    <div className={`footer__widget-title ${item.margin ? 'mb-25' : ''}`}>
                      <h5>{item.title}</h5>
                    </div>
                    <div className="footer__widget-content">
                      <div className="footer__links">
                        <ul>
                          {item.lists.map((list, index) => (
                            <li key={index}><a href="#">{list.list}</a></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-xl-4 col-lg-3 col-md-6 col-12">
                <div className="footer__widget mb-30">
                  <div className="footer__widget-title mb-25">
                    <h5>newsletter</h5>
                  </div>
                  <div className="footer__widget-content">
                    <p>oin over 1,000 people who get free and fresh content delivered automatically each time we publish.</p>
                    <div className="form-group">
                      <input className="form-control" id="newsletter-input" type="email" name="contact[email]" placeholder="Your email address..." />
                      <button className="ss-btn btnNewsletter" type="submit">Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom footer__bottom-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-7 col-md-8">
                <div className="footer__copyright footer__copyright-3">
                  <p>Copyright © <Link href="/">
                    <a>Outstock</a>
                  </Link>
                    all rights reserved. Powered by
                    <Link href="/">
                      <a>Theme_pure</a>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-md-4">
                <div className="footer__payment">
                  <a href="#"><img src="assets/img/payment/paypal_logo.webp" alt="" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterThree;