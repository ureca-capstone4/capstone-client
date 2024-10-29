import React from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import "./style.css";

export const BookDetail = () => {
  return (
    <div className="book-detail">
      <div className="div-2">
        <div className="overlap-group-2">
          <div className="rectangle-2" />

          <div className="frame-8">
            <div className="frame-9">
              <img
                className="img"
                alt="Logo white"
                src="/img/logo-white-1.svg"
              />

              <div className="frame-10">
                <img
                  className="yellow-bear-2"
                  alt="Yellow bear"
                  src="/img/yellow-bear.png"
                />

                <img
                  className="three-animals-2"
                  alt="Three animals"
                  src="/img/three-animals.png"
                />
              </div>
            </div>

            <div className="frame-11">
              <div className="frame-12">
                <div className="frame-13">
                  <div className="text-wrapper-6">프로필 변경</div>
                </div>

                <div className="frame-13">
                  <div className="text-wrapper-6">선착순 응모</div>
                </div>

                <div className="frame-13">
                  <div className="text-wrapper-6">유캐포</div>
                </div>
              </div>

              <SolidInterfaceMenu1 className="solid-interface-menu-1-instance" />
            </div>
          </div>
        </div>

        <div className="frame-14">
          <img className="frame-15" alt="Frame" src="/img/frame-33.svg" />

          <div className="frame-16">
            <div className="frame-17">
              <div className="frame-18">
                <div className="text-wrapper-7">제목</div>

                <div className="rectangle-3" />

                <div className="text-wrapper-8">제목제목제목제목제목</div>
              </div>

              <div className="frame-18">
                <div className="text-wrapper-9">저자</div>

                <div className="rectangle-3" />

                <div className="text-wrapper-8">
                  저자저자저자저자저자저자저자
                </div>
              </div>

              <div className="frame-18">
                <div className="text-wrapper-9">줄거리</div>

                <div className="rectangle-3" />

                <div className="text-wrapper-8">
                  줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
