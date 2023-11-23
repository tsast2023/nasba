import SEO from '../components/seo';
import Wrapper from '../layout/wrapper';
import ContactMain from '../components/profile';

const Contact = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Profile'} />
      <ContactMain/>
    </Wrapper>
  );
};

export default Contact;