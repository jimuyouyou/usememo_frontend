import Header from './components/Header';
import Footer from './components/Footer';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <p>Welcome to our app! The benefits of space repetition, custom learning experiences, instant memory, and interactive study.</p>
      <Footer />
    </div>
  );
};

export default Layout;
