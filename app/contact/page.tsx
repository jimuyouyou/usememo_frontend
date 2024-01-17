import Header from '../ui/Header';
import Footer from '../ui/Footer';

const Contact: React.FC = () => {
  return (
    <div>
        <Header />
      <section>
        <h1>Contact Us</h1>
        <p>
          Feel free to reach out to us using the following contact information.
          Whether you have questions, feedback, or inquiries, we'd love to hear from you!
        </p>
        <address>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Main Street, Cityville, State, Zip Code</p>
        </address>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
