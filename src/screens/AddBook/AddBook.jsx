import React from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import "./style.css";

export const AddBook = () => {
  return (
    <div className="add-book">
      <div className="div">
        <div className="overlap-group">
          <div className="rectangle" />

          <div className="frame">
            <div className="frame-2">
              <img
                className="logo-white"
                alt="Logo white"
                src="/img/logo-white-1-3.svg"
              />

              <div className="frame-3">
                <img
                  className="yellow-bear"
                  alt="Yellow bear"
                  src="/img/yellow-bear.png"
                />

                <img
                  className="three-animals"
                  alt="Three animals"
                  src="/img/three-animals.png"
                />
              </div>
            </div>

            <div className="frame-4">
              <div className="frame-5">
                <div className="div-wrapper">
                  <div className="text-wrapper">프로필 변경</div>
                </div>

                <div className="div-wrapper">
                  <div className="text-wrapper">선착순 응모</div>
                </div>

                <div className="div-wrapper">
                  <div className="text-wrapper">유캐포</div>
                </div>
              </div>

              <SolidInterfaceMenu1 className="solid-interface-menu-1" />
            </div>
          </div>
        </div>

        <div className="frame-6">
          <div className="frame-7">
            
            {/* 여기에 북 커버 넣으면 됨 */}
            <img className="img" alt="Rectangle" src="/img/rectangle-2.svg" /> 

            <div className="frame-wrapper">
              <div className="frame-8">
                <div className="frame-9">
                  <div className="text-wrapper-2">제목</div>
                  <div className="rectangle-2" />
                    <input
                        type="text"
                        placeholder="제목 입력란"
                        className="text-wrapper-3"
                      /> 
                </div>

                <div className="frame-9">
                  <div className="text-wrapper-4">저자</div>

                  <div className="rectangle-2" />
                    <input
                       type="text"
                       placeholder="저자 입력란"
                       className="text-wrapper-3"
                    /> 
                </div>

                <div className="frame-9">
                  <div className="text-wrapper-4">줄거리</div>

                  <div className="rectangle-2" />

                  <input
                        type="text"
                        placeholder="줄거리 입력란"
                        className="text-wrapper-3"
                  /> 
                </div>

                <div className="frame-9">
                  <div className="text-wrapper-4">내용</div>

                  <div className="rectangle-2" />
                  <input
                        type="text"
                        placeholder="내용 입력란"
                        className="text-wrapper-3"
                  /> 
                </div>

                <div className="frame-9">
                  <div className="text-wrapper-5">MBTI</div>

                  <div className="rectangle-2" />
                  <input
                        type="text"
                        placeholder="MBTI 자동 입력"
                        className="text-wrapper-3"
                  /> 
                </div>
              </div>
            </div>
          </div>

          <div className="view">
            <div className="text-wrapper-6">책 등록</div>
          </div>
        </div>
      </div>
    </div>
  );
};
