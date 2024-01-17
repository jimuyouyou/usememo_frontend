import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul className="relative flex h-16 items-center justify-between">
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/community">Community</Link></li>
          <li><Link href="/feedback">Feedback</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
