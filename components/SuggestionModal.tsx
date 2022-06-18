import { Button, Modal, Popover } from "antd";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ResumeType, UserType } from "../type";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

interface Props {
  session: Session | null;
  user: UserType;
  resume: ResumeType;
}

function SuggestionModal({ session, user, resume }: Props) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [suggestionContent, setSuggestionContent] = useState("");
  const [isInLastDay, setIsInLastDay] = useState(false);

  const sendsuggestion = async () => {
    if (!session) return router.push("/login");
    try {
      const isHave = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/suggestions?userFrom=${user?._id}&userTo=${resume?.user?._id}`
      );
      const recentTime = new Date(isHave.data?.[0]?.createdAt).getTime();
      const days = (Date.now() - recentTime) / 1000 / 60 / 60 / 24;
      console.log(days);
      if (days < 1) {
        setIsInLastDay(true);
      }
      setIsModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOk = async () => {
    let body = {
      userFrom: user?._id,
      userTo: resume?.user?._id,
      content: suggestionContent,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/suggestions`,
        body
      );
      setIsModalVisible(false);
      setSuggestionContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <button
        className="mt-4 bg-[#028858] py-2 px-4 text-white"
        onClick={sendsuggestion}
      >
        제안 보내기
      </button>
      <Modal
        title={`To : ${resume?.user?.name}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        footer={[
          <Button key="back" onClick={handleCancel} className="mr-3">
            Cancle
          </Button>,
          <Popover
            overlayInnerStyle={{ background: "gray" }}
            content={
              <div className=" text-white">
                하루가 지나야 다시 보낼수 있습니다.
              </div>
            }
          >
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              disabled={isInLastDay}
            >
              Send
            </Button>
          </Popover>,
        ]}
        centered={true}
      >
        <TextareaAutosize
          id="content"
          className="w-[100%] px-1 border-none outline-none "
          value={suggestionContent}
          onChange={(e) => setSuggestionContent(e.target.value)}
          minRows={5}
        />
      </Modal>
    </div>
  );
}

export default SuggestionModal;
