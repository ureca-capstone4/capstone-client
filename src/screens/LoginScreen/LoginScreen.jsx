import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DivWrapper } from "../../components/DivWrapper";
import { LoginButton } from "../../components/LoginButton";
import * as logo from '../../../static/img/logo_src.js';
import "./style.css";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate 추가

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://${REACT_APP_BACKEND_IP}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        // 로그인 성공 시 토큰 저장 및 페이지 이동
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/select_profile");
      } else {
        // 로그인 실패 시 에러 메시지 표시
        alert("로그인 실패. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <div className="login-screen">
      <div className="div-2">
        <div className="frame">
          <img className="yellow-bear" alt="Yellow bear" src={logo.character_left} />
          <img className="three-animals" alt="Three animals" src={logo.character_right} />
        </div>

        <div className="login-frame">
          <div className="login-frame-inside">
            <img className="logo-black" alt="Logo black" src={logo.idle_world_black} />

            <div className="login-component">
              <div className="email-password-frame">
                <input
                  className="text-input"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="text-input"
                  placeholder="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <LoginButton
                className="login-button-instance"
                state="default"
                onClick={handleLogin}
              />
            </div>
          </div>

          <DivWrapper className="view" />
        </div>
      </div>
    </div>
  );
};