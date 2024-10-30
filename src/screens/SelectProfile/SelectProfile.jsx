import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import { Goback1 } from "../../../static/img/goback-1.svg";
import "./style.css";

export const SelectProfile = () => {
  const [profiles, setProfiles] = useState([]);

  // 백엔드에서 프로필 데이터 가져오기 (예시)
  useEffect(() => {
    setProfiles([
      { id: 1, name: "파랑이", image: "/img/boy-blue.png" },
      { id: 2, name: "노랑이", image: "/img/yellow-boy.png" },
      { id: 3, name: "빨강이", image: "/img/red-boy.png" },
    ]);
  }, []);

  return (
    <div className="select-profile">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="polygon" alt="Polygon" src="/img/polygon-1.svg" />
            <div className="ellipse" />
            <div className="div" />

            <div className="profile-autolayer">
              {profiles.map((profile) => (
                <div className="profile-button" key={profile.id}>
                  <img
                    className="boy-blue"
                    alt={profile.name}
                    src={profile.image}
                  />
                  <div className="text-wrapper">{profile.name}</div>
                </div>
              ))}

              {/* 프로필 버튼이 3개 이하일 경우만 "프로필 생성" 버튼 표시 */}
              {profiles.length <= 3 && (
                <div className="create-profile">
                  <img
                    className="img"
                    alt="Create profile"
                    src="/img/createprofilebutton.png"
                  />
                  <div className="empty-space">보라아</div>
                </div>
              )}
            </div>

            <img
              className="logo-white"
              alt="Logo white"
              src="/img/logowhite.svg"
            />
          </div>

          {/* Link 컴포넌트를 사용하여 로그인 페이지로 이동 */}
          <Link to="/login_screen" className="go-back">
            <Goback1 />
          </Link>
        </div>
      </div>
    </div>
  );
};