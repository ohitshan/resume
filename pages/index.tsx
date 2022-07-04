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
import { useEffect, useState } from "react";
import UserModal from "../components/UserModal";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { handleSearchTerm } from "../atoms/searchTerm";

interface props {
  session: Session | null;
  user: UserType;
  resumes: ResumeType[];
}

const Home = ({ session, user, resumes }: props) => {
  const term = useRecoilValue(handleSearchTerm);
  const [Resumes, setResumes] = useState(resumes);
  console.log(resumes, Resumes);
  useEffect(() => {
    const getNewResumes = async () => {
      let body = { term };
      try {
        const ResumesRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes/getResume`,
          body
        );
        setResumes(ResumesRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (term.trim().length > 0) {
      getNewResumes();
    }
  }, [term]);

  return (
    <div className="">
      <Head>
        <title>Resume</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <Layout user={user}>
        <div className="relative grid grid-cols-1 justify-start mx-auto mt-[80px] max-w-[1200px] px-4 lg:grid-cols-3 sm:gird-cols-2 gap-5 gap-y-12">
          {Resumes?.map((resume) => (
            <div
              className="relative flex justify-center col-span-1 w-[100%]"
              key={resume._id}
            >
              <UserModal resume={resume} />

              <Link href={`/user/${resume?.user?._id}`} passHref>
                <div className="pt-10 pb-3 border p-4 w-[100%] min-h-[200px]  cursor-pointer grid grid-rows-3">
                  <div className="row-span-1">
                    <h2 className="text-2lg text-center">
                      {resume.user?.name}
                    </h2>
                    <h1 className="text-2xl text-center">{resume.title}</h1>
                  </div>
                  <div className=" row-span-2 flex flex-col justify-between">
                    <div className="">
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
                    <div className="row-span-1">
                      {resume?.part?.map((part) => (
                        <button
                          key={part}
                          className="border py-1 px-3 mr-2 hover:bg-[blue]/50"
                        >
                          # {part}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
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

  return {
    props: {
      session,
      user: userRes.data,
      resumes: ResumesRes.data,
    },
  };
};
