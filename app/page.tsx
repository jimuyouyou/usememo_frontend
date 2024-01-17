import Header from "./ui/Header";
import Footer from "./ui/Footer";

const Layout: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Header />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <p>
          Welcome to our app! The benefits of space repetition, custom learning
          experiences, instant memory, and interactive study.
        </p>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
