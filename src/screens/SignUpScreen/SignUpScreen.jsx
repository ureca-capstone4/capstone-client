import React, { useState } from "react"; // useState 추가
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./style.css";

import * as logo from '../../../static/img/logo_src.js';
import * as icon from '../../../static/img/icon_src.js';

export const SignUpScreen = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 추가
  const [password, setPassword] = useState(""); // 비밀번호 상태 추가
  const [name, setName] = useState(""); // 이름 상태 추가
  const [phoneNumber, setPhoneNumber] = useState(""); // 핸드폰 번호 상태 추가
  const navigate = useNavigate(); // navigate 훅 사용

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phoneNum: phoneNumber
        })
      });

      const data = await response.json();

      if(response.ok){
        alert("회원가입 성공");
        navigate("/login_screen");
      } else {
        alert("회원가입 실패");
      } 

    } catch (error) {
      console.error("회원가입 중 오류 발생", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className="sign-up-screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="frame-2">
              <img
                className="img"
                alt="Yellow bear"
                src={logo.character_left}
              />
              <img
                className="three-animals-2"
                alt="Three animals"
                src={logo.character_right}
              />
            </div>

            <div className="sign-up-frame">
              <div className="sign-up-frame-inside">
                <img
                  className="logo-black-2"
                  alt="Logo black"
                  src={logo.idle_world_black}
                />

                <div className="sign-up-component">
                  <div className="sign-up-component-2">
                    <input
                      className="email-field"
                      placeholder="이메일"
                      value={email} // 이메일 상태 연결
                      onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
                    />

                    <input
                      className="text-input-wrapper"
                      placeholder="비밀번호"
                      type="password" // 비밀번호 입력으로 설정
                      value={password} // 비밀번호 상태 연결
                      onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
                    />

                    <input
                      className="text-input-wrapper"
                      placeholder="이름"
                      value={name} // 이름 상태 연결
                      onChange={(e) => setName(e.target.value)} // 상태 업데이트
                    />

                    <input
                      className="text-input-wrapper"
                      placeholder="핸드폰번호"
                      value={phoneNumber} // 핸드폰 번호 상태 연결
                      onChange={(e) => setPhoneNumber(e.target.value)} // 상태 업데이트
                    />
                  </div>

                  <div className="sign-up-button" onClick={handleSignUp}>
                    <div className="text-wrapper-2">회원가입</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img
            className="go-back"
            alt="Go back"
            src={icon.go_back}
            onClick={handleGoBack}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};