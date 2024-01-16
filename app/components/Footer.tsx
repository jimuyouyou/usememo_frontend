import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer>
      <nav>
      <ul className="relative flex h-16 items-center justify-between">
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/community">Community</Link></li>
          <li><Link href="/feedback">Feedback</Link></li>
          <li><Link href="/help">Help</Link></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
