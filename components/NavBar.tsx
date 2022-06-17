import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import { Avatar } from "antd";
import Link from "next/link";
import type { Session } from "next-auth";

interface props {
  session?: Session | null;
  user?: { _id: string; name: string; email: string | null; image: string };
}

function NavBar({ session, user }: props) {
  return (
    <div className="flex justify-between items-center mx-auto max-w-6xl px-5 pt-3">
      <div className="flex items-center space-x-3">
        <Link href={"/"}>
          <img
            src={"/resume.png"}
            alt="Logo"
            width={60}
            height={60}
            className={`hover:cursor-pointer `}
          />
        </Link>
        <h1 className="text-4xl">Resume</h1>
      </div>
      <div className="flex space-x-3  items-center">
        <SearchIcon className="h-8 w-8" />
        {user ? (
          <Link href={"/myprofile"}>
            <Avatar
              className={`hover:cursor-pointer `}
              size={36}
              src={user.image}
            />
          </Link>
        ) : (
          <Link href={"/login"}>
            <div className={`hover:cursor-pointer`}>회원가입/로그인</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
