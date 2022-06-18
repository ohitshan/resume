import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import type { Session } from "next-auth";
import axios from "axios";
import { ResumeType, UserType } from "../../type";
import { Avatar } from "antd";
import SuggestionModal from "../../components/SuggestionModal";

interface props {
  session: Session | null;
  user: UserType;
  resume: ResumeType;
}

function UserProfile({ session, user, resume }: props) {
  return (
    <div>
      <Head>
        <title>Resume-{resume?.user?.name}</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <Layout user={user}>
        <div className="bg-[#E7EAD9] px-3 py-10 md:px-10 grid max-w-[1200px] mx-auto mt-10 grid-cols-1 gap-5 md:grid-cols-3">
          <div className="col-span-1 md:col-span-1 ">
            <div className="border border-[#D9D9D9]  bg-white flex flex-col justify-center items-center py-5">
              <div className="relative p-2 ">
                <Avatar size={70} src={resume?.user?.image} />
              </div>
              <h2 className="text-lg font-semibold my-2">
                {resume?.user?.name}
              </h2>
              <h6>
                {resume?.user?.email || "카카오톡은 검수 전 이메일제공 x"}
              </h6>
              <div className="my-2">학교 : {resume?.education}</div>
              <div className="my-2">분야 : {resume?.field}</div>
              <div className="my-2">
                직무 :{" "}
                {resume?.part.map((part) => (
                  <span className="mx-1">{part}</span>
                ))}
              </div>
              <div className="my-2">
                경력 : {resume?.career}
                {resume?.career === "신입" ? null : "년"}
              </div>

              <SuggestionModal session={session} resume={resume} user={user} />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 min-h-[350px] bg-white  space-y-2 border border-[#D9D9D9]">
            <div
              id="title"
              className="p-3 text-2xl mt-2  text-center font-bold"
            >
              {resume?.title}
            </div>
            <div className=" px-5">
              {resume?.content?.split("\n").map((line: string, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UserProfile;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const session = await getSession(context);
  const resumeRes = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes/getResume/?id=${context?.query?.id}&type=single`
  );

  if (session) {
    const { name, email } = session?.user!;
    const userRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/mydata`,
      { name: name, email: email }
    );

    return {
      props: {
        session,
        user: userRes.data,
        resume: resumeRes.data[0],
      },
    };
  }

  return {
    props: {
      session,
      resume: resumeRes.data[0],
    },
  };
};
