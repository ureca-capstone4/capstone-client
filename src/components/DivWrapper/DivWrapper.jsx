import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "./style.css";

export const DivWrapper = ({ className }) => {
  const navigate = useNavigate(); // useNavigate hook 사용

  const handleDivClick = () => {
    navigate("/signup_screen"); // '/signup' 경로로 이동
  };

  return (
    <div className={`div-wrapper ${className}`} onClick={handleDivClick}> {/* 클릭 이벤트 추가 */}
      <div className="div">회원가입</div>
    </div>
  );
};