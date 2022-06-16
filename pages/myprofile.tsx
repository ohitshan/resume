import Head from "next/head";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import type { Session } from "next-auth";
import NavBar from "../components/NavBar";
import { CameraFilled } from "@ant-design/icons";
import { Avatar, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
const { Option } = Select;
interface props {
  session: Session | null;
  user?: { _id: string; name: string; email: string | null; image: string };
  resume: {
    _id: string;
    user: string;
    title: string;
    content: string;
    career: string;
    education: string;
    part: any;
    field: "개발" | "서비스";
  };
}

const field = ["개발", "서비스"];
const part = { 개발: ["hi", "bi"], 서비스: ["nm", "hg"] };

type PartName = keyof typeof part;
function Myprofile({ session, user, resume }: props) {
  const [file, setFile] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>();
  const [profileChanged, setProfileChanged] = useState(false);
  const [User, setUser] = useState(user);
  const [finishEdit, setFinishEdit] = useState(true);
  const [school, setSchool] = useState(resume?.education);
  const [career, setCareer] = useState(resume?.career);
  const [FieldName, setFieldName] = useState(resume?.field);
  const [Field, setField] = useState(part[resume?.field as PartName]);
  const [Part, setPart] = useState(resume?.part);
  const [title, setTitle] = useState(resume?.title);
  const [resumeContent, setResumeContent] = useState(resume?.content);
  const [height, setHeight] = useState("1200px");
  useEffect(() => {
    if (!profileChanged) return;
    async function getUpdatedUser() {
      const { name, email, image } = session?.user!;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/mydata`,
          {
            name: name,
            email: email,
            image: image,
          }
        );
        setUser(res.data);
        setProfileChanged(false);
        setFile(null);
        setImageSrc("");
      } catch (err) {
        console.log(err);
      }
    }
    getUpdatedUser();
  }, [profileChanged]);

  // useEffect(() => {
  //   setHeight(`${window.outerHeight}px`);
  // }, [height]);
  const year = [
    "신입",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10년 이상",
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "resume");
    try {
      const uploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CLOUDINARY}`,
        data
      );
      const { url } = uploadRes.data;
      const { name, email, image } = session?.user!;
      console.log(name, email, image);
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        name: name,
        email: email,
        image: image,
        newimage: url,
      });
      setProfileChanged(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOk = () => {
    if (file.length === 0) {
      alert("choose the pic");
      return;
    }

    setIsModalVisible(false);
    handleCreate();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(imageSrc!);
    setImageSrc("");
  };

  const EditPost = async () => {
    let body = {
      user: user?._id,
      title: title,
      content: resumeContent,
      education: school,
      field: FieldName,
      part: Part,
      career: career,
    };

    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes/edit`,
      body
    );
    try {
      setFinishEdit(true);
    } catch (err) {
      console.log(err);
    }
  };

  const cancleEdit = async () => {
    const resumeRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes`,
      { user: user?._id }
    );
    console.log(resumeRes.data);
    setFinishEdit(true);
    setResumeContent(resumeRes.data?.content || "");
    setTitle(resumeRes.data?.title || "");
    setFieldName(resumeRes.data?.field || "");
    setCareer(resumeRes?.data?.career || "신입");
    setPart(resumeRes.data?.part);
  };

  const partChange = (value: PartName) => {
    setPart(value);
  };

  return (
    <div className="">
      <Head>
        <title>Resume</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <NavBar user={user} />

      <div
        className="bg-[#E7EAD9] px-10 py-10 "
        style={{ minHeight: `${height}` }}
      >
        <h1 className="text-2xl max-w-6xl mx-auto">My Profile</h1>
        <div className="grid max-w-6xl mx-auto mt-3 grid-cols-4 gap-5">
          <div className="col-span-1">
            <div className="border border-[#D9D9D9]  bg-white flex flex-col justify-center items-center pt-5">
              <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="relative">
                  <div
                    className="absolute right-[-5px] top-[-15px] text-[20px] cursor-pointer"
                    onClick={deleteFileImage}
                  >
                    X
                  </div>
                  <label
                    className="input-file-button"
                    htmlFor="input-file"
                    style={{
                      border: "1px solid #D9D9D9",
                      cursor: "pointer",
                      padding: "30px 20px",
                      display: "block",
                    }}
                  >
                    Upload
                  </label>
                </div>

                <input
                  id="input-file"
                  type="file"
                  onChange={(e) => {
                    setImageSrc(URL.createObjectURL(e.target.files?.[0]!));
                    setFile(e.target.files?.[0]);
                  }}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <div className="pt-3">
                  {imageSrc && <img src={imageSrc} alt="preview-img" />}
                </div>
              </Modal>
              <div className="relative p-2 " onClick={showModal}>
                <Avatar
                  className={`hover:cursor-pointer absolute`}
                  size={70}
                  src={user?.image}
                />
                <CameraFilled
                  style={{
                    color: "gray",
                    width: "30px",
                    height: "30px",
                    borderRadius: "30px",
                    paddingTop: "6.5px",
                    position: "absolute",
                    left: "50px",
                    background: "white",
                    top: "45px",
                    boxShadow: "1px 1px 1px gray",
                    cursor: "pointer",
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold my-2">
                {session?.user?.name}
              </h2>
              <h6>{session?.user?.email}</h6>
            </div>
          </div>
          <div className="col-span-3">
            <div className="border border-[#D9D9D9]  p-3 bg-white space-y-5">
              <div className="flex justify-between px-2 items-center">
                <h1 className="text-2xl font-bold">MY RESUME</h1>
                <EditOutlined
                  className="text-[18px] cursor-pointer "
                  onClick={() => setFinishEdit(false)}
                  style={{ color: "#08c" }}
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="school">학교</label>
                <input
                  id="school"
                  disabled={finishEdit}
                  className="p-2"
                  value={school}
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="field">분야</label>
                <Select
                  id="field"
                  disabled={finishEdit}
                  className="p-2 bg-[#FAFAFA] text-[black]"
                  onChange={(value: PartName) => {
                    {
                      setFieldName(value);
                      setField(part[value]);
                      // setPart(part[value][0]);
                    }
                  }}
                  defaultValue={FieldName}
                  value={FieldName}
                >
                  {field?.map((field) => (
                    <option key={field}>{field}</option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="part">직무</label>
                <Select
                  onChange={partChange}
                  disabled={finishEdit}
                  mode="multiple"
                  value={Part}
                >
                  {Field?.map((field) => (
                    <Option key={field}>{field}</Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="career">경력</label>
                <select
                  id="career"
                  disabled={finishEdit}
                  className="p-2 bg-[#FAFAFA] text-[black]"
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                >
                  {year?.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="title">제목</label>
                <input
                  id="title"
                  className="w-[100%] p-2 mb-2"
                  disabled={finishEdit}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="content">내용</label>
                {finishEdit ? (
                  <textarea
                    id="content"
                    className="w-[100%] p-2 overflow-hidden"
                    disabled={finishEdit}
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    rows={5}
                  />
                ) : (
                  <TextareaAutosize
                    id="content"
                    className="w-[100%] p-2 "
                    disabled={finishEdit}
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    minRows={5}
                  />
                )}
              </div>
              {!finishEdit && (
                <div className="w-[100%] text-center">
                  <button
                    onClick={cancleEdit}
                    className="bg-[#028858] border p-2 text-white mx-auto"
                  >
                    취소
                  </button>
                  <button
                    className="bg-[#028858] border p-2 text-white mx-auto"
                    onClick={EditPost}
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;

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

  const ResumeRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/resumes`,
    { user: userRes.data._id }
  );
  return {
    props: {
      session,
      user: userRes.data,
      resume: ResumeRes.data,
    },
  };
};
