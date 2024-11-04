import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

import girlPic1 from '../../../static/img/profile/girl-pink.png'; // 경로 수정
import girlPic2 from '../../../static/img/profile/girl-purple.png'; // 경로 수정
import boyPic1 from '../../../static/img/profile/boy-green.png'; // 경로 수정
import boyPic2 from '../../../static/img/profile/boy-blue.png'; // 경로 수정

import * as logo from '../../../static/img/logo_src.js';
import * as icon from '../../../static/img/icon_src.js';
import * as profile from '../../../static/img/profile_src.js';
import * as shape from '../../../static/img/shape_src.js';

export const SelectProfile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  // 사용할 프로필 이미지 배열
  const girlProfileImages = [girlPic1, girlPic2];
  const boyProfileImages = [boyPic1, boyPic2];

  // 성별에 따른 랜덤 프로필 이미지를 선택하는 함수
  const getProfileImageByGender = (gender) => {
    const images = gender === 'girl' ? girlProfileImages : boyProfileImages;
    return images[Math.floor(Math.random() * images.length)];
  };

  // 로그인 화면으로 이동하는 함수
  const handleGoBack = () => {
    navigate("/login_screen");
  };

  // 프로필 생성 화면으로 이동하는 함수
  const handleCreateProfile = () => {
    navigate("/create_profile");
  };

  // 자녀 프로필 가져오기
  useEffect(() => {
    const fetchProfiles = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is not available.");
        return;
      }

      console.log("Access Token:", accessToken); // 토큰 출력 로그 추가
      
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/kids`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        // 응답이 성공적인지 확인하고, 데이터가 배열인지 체크
        const { kidsProfiles } = response.data; // kidsProfiles 추출
        console.log("Received kidsProfiles:", kidsProfiles); // 응답 데이터 로그 추가
        
        if (Array.isArray(kidsProfiles)) {
          setProfiles(kidsProfiles); // kidsProfiles 배열을 상태에 설정
        } else {
          throw new Error("Response data is not an array.");
        }
      } catch (error) {
        console.error("서버 오류입니다.", error);
      }
    };

    fetchProfiles();
  }, []);

  // 프로필 선택 핸들러
  const handleSelectProfile = (id, name, gender) => {
    // 성별에 따른 랜덤 프로필 이미지 선택
    const profileImageUrl = getProfileImageByGender(gender);

    // 선택한 프로필 정보들을 localStorage에 저장
    localStorage.setItem("kidId", id);
    localStorage.setItem("kidProfileImageUrl", profileImageUrl); // 여기서 해당 프로필 이미지로 저장
    localStorage.setItem("kidName", name);

    navigate("/main_page"); // 메인 페이지로 이동
  };

  return (
    <div className="select-profile">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="polygon" alt="Polygon" src={shape.triangle_yellow_left} />
            <div className="ellipse" />

            <div className="div" />
            <div className="profile-autolayer">
              {profiles.map((profile) => (
                <div
                  className="profile-button"
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id, profile.name, profile.gender)}
                >
                  <img
                    className="boy-blue"
                    alt={profile.name}
                    src={getProfileImageByGender(profile.gender)} // 성별에 따라 랜덤 이미지 사용
                  />
                  <div className="text-wrapper">{profile.name}</div>
                </div>
              ))}

              {/* 프로필이 3명 이하일 때만 "프로필 생성" 버튼 표시 */}
              {profiles.length <= 3 && (
                <div className="create-profile">
                  <img
                    className="img"
                    alt="Create profile"
                    src={profile.create_profile}
                    onClick={handleCreateProfile}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="empty-space">빈칸</div>
                </div>
              )}
            </div>

            <img
              className="logo-white"
              alt="Logo white"
              src={logo.idle_world_white}
            />
          </div>
          <img
            className="go-back"
            alt="Go back"
            src={icon.go_back}
            onClick={handleGoBack}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};