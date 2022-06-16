import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
function Advertise() {
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    setShowing(true);
  }, []);
  function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
      <div onClick={onClick}>
        <RightOutlined className="!w-7 !h-7 text-3xl z-50 !text-[gray] absolute top-[150px] right-2" />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
      <div onClick={onClick}>
        <LeftOutlined className="!w-7 !h-7 text-3xl z-50 !text-[gray] absolute top-[150px]" />
      </div>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (!showing) {
    return null;
  }

  return (
    <div>
      <Slider {...settings}>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[640px]">
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=KRkMypRF8qk"}
                width={"100%"}
                playing
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl text-[#f7f7f7]">비디오 사이트</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                node.js, mongodb
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                React, Redux
              </div>
              <div className="mt-2 text-[#f7f7f7]">강의를 보며 클론코딩</div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://www.github.com/ohitshan/youtube"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/youtube
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[640px]">
              <ReactPlayer
                url="https://www.youtube.com/embed/O-iRyqtxFnk?enablejsapi=1&origin=http://localhost:3000"
                width={"100%"}
                playing
              />
            </div>
            <div className="hidden md:block ">
              <h1 className="text-2xl text-[#f7f7f7]">쇼핑몰 사이트</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                node.js, mongodb
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                React, Redux
              </div>
              <div className="mt-2 text-[#f7f7f7]">강의를 보며 클론코딩</div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://www.github.com/ohitshan/shopping"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/shopping
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[640px]">
              <ReactPlayer
                url="https://www.youtube.com/embed/aelFzvw2Qgs?enablejsapi=1&origin=http://localhost:3000"
                width={"100%"}
                playing
              />
            </div>
            <div className="hidden md:block ">
              <h1 className="text-2xl text-[#f7f7f7]">My space</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                node.js, mongodb
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                React, Redux
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                강의를 보며 배운것들을 바탕으로 연습
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://www.github.com/ohitshan/mySpace"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/mySpace
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[640px]">
              <ReactPlayer
                url="https://www.youtube.com/embed/4OX6zi9EMTU?enablejsapi=1&origin=http://localhost:3000"
                width={"100%"}
                playing
              />
            </div>
            <div className="hidden md:block ">
              <h1 className="text-2xl text-[#f7f7f7]">Qickstarter Part.1</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                node.js, mongodb
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                React, Redux-Toolkit, Typescript
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                <a href="https://www.kickstarter.com" target={"_blank"}>
                  kickstarter.com
                </a>{" "}
                클론코딩
                <br />
                backend : myspace에서 만들어 놓은 back을 수정하여 제작
                <br />
                frontend : redux에 대해 추가로 알아보던 중 Redux-Toolkit
                알게되어 사용. Typescript 사용
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://www.github.com/ohitshan/Qickstarter"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/Qickstarter
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[640px]">
              <ReactPlayer
                url="https://www.youtube.com/embed/Dkvt8B8W3xY?enablejsapi=1&origin=http://localhost:3000"
                width={"100%"}
                playing
              />
            </div>
            <div className="hidden md:block ">
              <h1 className="text-2xl text-[#f7f7f7]">Qickstarter Part.2</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                node.js, mongodb
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                React, Redux-Toolkit, Typescript
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                <a href="https://www.kickstarter.com" target={"_blank"}>
                  kickstarter.com
                </a>{" "}
                클론코딩
                <br />
                backend : myspace에서 만들어 놓은 back을 수정하여 제작
                <br />
                frontend : redux에 대해 추가로 알아보던 중 Redux-Toolkit
                알게되어 사용. Typescript 사용
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://www.github.com/ohitshan/Qickstarter"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/Qickstarter
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[550px]">
              <img src="./fakeflix.png" width={"100%"} />
            </div>
            <div className="hidden md:block ">
              <h1 className="text-2xl text-[#f7f7f7]">Netflix 클론코딩</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                Firebase
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                Next.Js , Typescript , Recoil
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                <a href="https://fakeflix-nu.vercel.app" target={"_blank"}>
                  https://fakeflix-nu.vercel.app
                </a>
                <br />
                서버사이드 렌더링의 개념을 알기 위해
                <br />
                강의를 보며 클론코딩
                <br />
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://github.com/ohitshan/fakeflix"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/fakeflix
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#364d79] flex flex-col justify-center items-center mx-auto space-x-10 md:flex-row">
            <div className="w-[100%] sm:w-[550px]">
              <img src="./linkedIn.png" width={"100%"} />
            </div>
            <div className="hidden md:block ">
              <h1 className="text-2xl text-[#f7f7f7]">LinkedIn 클론코딩</h1>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Backend : </span>
                Mongodb
              </div>
              <div className="text-[#f7f7f7]">
                <span className="text-xl">Frontend : </span>
                Next.JS, Next-Auth, Recoil
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                <a
                  href="https://linkedin-clone-ruddy.vercel.app"
                  target={"_blank"}
                >
                  https://linkedin-clone-ruddy.vercel.app
                </a>
                <br />
                데이터베이스 연결과 Next-Auth를 이용한 인증 공부를 위해
                <br />
                강의를 보며 클론코딩
                <br />
              </div>
              <div className="mt-2 text-[#f7f7f7]">
                github :{" "}
                <a
                  href="https://github.com/ohitshan/linkedin-clone"
                  target={"_blank"}
                >
                  https://github.com/ohitshan/linkedin-clone
                </a>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Advertise;
