import NavBar from "./NavBar";
import type { Session } from "next-auth";
import Advertise from "./Advertise";

interface LayoutProps {
  children: React.ReactNode;
  user: { _id: string; name: string; email: string | null; image: string };
  users?: { _id: string; name: string; email: string | null; image: string }[];
}

export default function Layout({ children, users, user }: LayoutProps) {
  return (
    <>
      <NavBar user={user} />
      <Advertise />
      <main>{children}</main>
    </>
  );
}
