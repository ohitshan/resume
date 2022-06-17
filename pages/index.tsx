import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import axios from "axios";
import { UserType, ResumeType } from "../type";
import { Avatar, Modal } from "antd";
import { useState } from "react";
import UserModal from "../components/UserModal";

interface props {
  session: Session | null;
  user: UserType;
  resumes: ResumeType[];
}

const Home = ({ session, user, resumes }: props) => {
  return (
    <div className="">
      <Head>
        <title>Resume</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <Layout user={user}>
        <div className="grid grid-cols-1 justify-start mx-auto mt-[80px]  max-w-[1200px] px-4 lg:grid-cols-3 sm:gird-cols-2 gap-5 gap-y-12">
          {resumes?.map((resume) => (
            <div
              className="relative flex justify-center col-span-1 w-[100%]"
              key={resume._id}
            >
              <UserModal resume={resume} />
              <div className="my-4 border p-4 w-[100%] min-h-[200px]">
                <h2 className="text-2lg text-center">{resume.user?.name}</h2>
                <h1 className="text-2xl text-center">{resume.title}</h1>
                <div>
                  {resume?.content?.split("\n").length <= 5 ? (
                    resume?.content?.split("\n")?.map((line: string, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))
                  ) : resume?.content?.length >= 400 ? (
                    `${resume?.content?.slice(0, 400)}...`
                  ) : (
                    <div>
                      {resume?.content
                        ?.split("\n")
                        ?.slice(0, 4)
                        .map((line: string, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      ...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
  const userRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/mydata`,
    { name: session?.user.name, email: session?.user?.email }
  );
  const ResumesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes`
  );
  console.log(ResumesRes.data);
  return {
    props: {
      session,
      user: userRes.data,
      resumes: ResumesRes.data,
    },
  };
};
