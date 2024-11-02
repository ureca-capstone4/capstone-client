import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import "./style.css";

export const Draw = () => {
  const navigate = useNavigate();
  
  const handleDrawButtonClick = () => {
    navigate("/draw");
  };

  const handleTextClick = () => {
    navigate("/main_page");
  };

  const handleYukaepoClick = () => {
    navigate("/add_book");
  };

  const handleProfileClick = () => {
    navigate('/kid_detail');
  };

  const [kidProfileImageUrl, setKidProfileUrl] = useState("");

  // kidProfileImageUrl을 localStorage에서 불러옴
  useEffect(() => {
    const profileImage = localStorage.getItem("kidProfileImageUrl");
    if (profileImage) {
      setKidProfileUrl(profileImage);
    }
  }, []);

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
                <div className="frame-24">
                  <div className="text-wrapper-100" onClick={handleTextClick} style={{ cursor: 'pointer' }}>
                    책 고를까?
                  </div>
                </div>
                <div className="frame-24">
                  <div className="text-wrapper-100" onClick={handleYukaepoClick} style={{ cursor: 'pointer' }}>
                    유캐포~
                  </div>
                </div>
                <div className="frame-24">
                  <button className="text-wrapper-100" onClick={handleDrawButtonClick}>
                    선물 응모해!
                  </button>
                </div>
              </div>

              {/*<SolidInterfaceMenu1 className="solid-interface-menu-1-instance" />*/}
              {/* 프로필 사진 추가 */}
              <div className="profile-picture-container" onClick={handleProfileClick}>
                <img
                  className="kid-profile"
                  alt="아이 프로필"
                  src={kidProfileImageUrl}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
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