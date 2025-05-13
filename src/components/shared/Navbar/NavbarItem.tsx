import Link from 'next/link';

interface NavbarItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function NavbarItem({ href, label, onClick }: NavbarItemProps) {
  return (
    <Link
      href={href}
      className="text-heading-white [text-shadow:0_4px_24px_0px_#040B3080] transition-colors duration-300 ease-in-out"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
