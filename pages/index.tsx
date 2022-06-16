import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import axios from "axios";

interface props {
  session: Session | null;
  user: { _id: string; name: string; email: string | null; image: string };
  users: { _id: string; name: string; email: string | null; image: string }[];
}

const Home = ({ session, user, users }: props) => {
  console.log(user);
  return (
    <div className="">
      <Head>
        <title>Resume</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <Layout user={user}>
        <div className="flex justify-center mx-auto mt-10 bg-[black] max-w-[1200px]">
          fkd
        </div>
      </Layout>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);
  // const usersRes = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
  // );
  const userRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/mydata`,
    { name: session?.user.name, email: session?.user?.email }
  );
  console.log(userRes);
  return {
    props: {
      session,
      user: userRes.data,
      // users: usersRes.data,
    },
  };
};
