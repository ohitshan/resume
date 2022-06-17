import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import type { Session } from "next-auth";
import axios from "axios";
import { ResumeType, UserType } from "../../type";

interface props {
  session: Session | null;
  user: UserType;
}

function UserProfile({ session, user }: props) {
  return (
    <div>
      <Head>
        <title>Resume-gd</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <Layout user={user}>
        <div></div>
      </Layout>
    </div>
  );
}

export default UserProfile;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { name, email, image } = session?.user!;
  const userRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/mydata`,
    { name: name, email: email }
  );

  return {
    props: {
      session,
      user: userRes.data,
    },
  };
};
