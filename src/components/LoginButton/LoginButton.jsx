import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const LoginButton = ({ state, className, onClick }) => {
  return (
    <div className={`login-button ${state} ${className}`} onClick={onClick}>
      <div className="text-wrapper">로그인</div>
    </div>
  );
};

LoginButton.propTypes = {
  state: PropTypes.oneOf(["hover", "default"]),
  onClick: PropTypes.func, // onClick prop 추가
};