import { Avatar, Modal } from "antd";
import { useState } from "react";
import { ResumeType } from "../type";

interface resumeProps {
  resume: ResumeType;
}

function UserModal({ resume }: resumeProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <div
        className="absolute px-10 top-[-35px] cursor-pointer hover:scale-125"
        onClick={showModal}
      >
        <Avatar size={70} src={resume?.user?.image} />
      </div>

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
        footer={null}
      >
        <Avatar
          className={`hover:cursor-pointer`}
          size={70}
          src={resume?.user?.image}
        />
        <div className="my-2">{resume?.user?.name}</div>
        <div>
          연락처 :
          {resume?.isPrivate
            ? " 비공개"
            : resume?.user?.email || " 카카오톡 검수 전 이메일 제공 x"}
        </div>
      </Modal>
    </>
  );
}

export default UserModal;
