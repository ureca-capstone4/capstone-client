import React from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import "./style.css";

export const Draw = () => {
  return (
    <div className="draw">
      <div className="div-2">
        <div className="overlap-group-2">
          <div className="rectangle-3" />

          <div className="frame-10">
            <div className="frame-11">
              <img
                className="logo-white-2"
                alt="Logo white"
                src="/img/logo-white-1-2.svg"
              />

              <div className="frame-12">
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

            <div className="frame-13">
              <div className="frame-14">
                <div className="frame-15">
                  <div className="text-wrapper-7">프로필 변경</div>
                </div>

                <div className="frame-15">
                  <div className="text-wrapper-7">선착순 응모</div>
                </div>

                <div className="frame-15">
                  <div className="text-wrapper-7">유캐포</div>
                </div>
              </div>

              <SolidInterfaceMenu1 className="solid-interface-menu-1-instance" />
            </div>
          </div>
        </div>

        <div className="frame-16">
          <div className="frame-17">
            <div className="login-section-wrapper">
              <div className="login-section">
                <div className="frame-18">
                  <div className="email-field">
                    <input
                    className="text-wrapper-8"
                    placeholder="이름"
                    />
                  </div>

                  <div className="password-field">
                  <input
                    className="text-wrapper-9"
                    placeholder="핸드폰 번호"
                    />
                  </div>
                </div>

                <div className="login-button">
                  <div className="text-wrapper-10">응모하기</div>
                </div>
              </div>
            </div>
          </div>

          <div className="view-2">
            <div className="text-wrapper-11">어제 응모 결과 보기</div>
          </div>
        </div>
      </div>
    </div>
  );
};
