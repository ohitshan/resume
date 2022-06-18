import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import { Avatar, Input, Popover } from "antd";
import Link from "next/link";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { handleSearchTerm } from "../atoms/searchTerm";
const { Search } = Input;
interface props {
  session?: Session | null;
  user?: { _id: string; name: string; email: string | null; image: string };
}

function NavBar({ session, user }: props) {
  const [searchTerm, setSearchTerm] = useRecoilState(handleSearchTerm);
  const [showSearch, setShowSearch] = useState(false);
  const onSearch = (value: string) => setSearchTerm(value);

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
        {showSearch ? (
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
            className="searchInput"
          />
        ) : null}
        <SearchIcon
          className="h-8 w-8 hover:cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        />
        {user ? (
          <Popover
            content={
              <div className="text-center hover:cursor-pointer space-y-2">
                <Link href={"/myprofile"}>
                  <div className="hover:underline">설정</div>
                </Link>
                <div className="hover:underline" onClick={() => signOut()}>
                  로그아웃
                </div>
              </div>
            }
            placement="bottom"
          >
            <Avatar
              className={`hover:cursor-pointer `}
              size={36}
              src={user.image}
            />
          </Popover>
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
