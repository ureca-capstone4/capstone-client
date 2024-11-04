import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useHandler } from '../../handler.js';
import "./style.css";
import * as logo from '../../../static/img/logo_src.js';

export const DrawResult = () => {
  const navigate = useNavigate();
  const {
    handleHeaderIcon1,
    handleHeaderIcon2,
    handleHeaderIcon3,
    handleProfileClick
  } = useHandler();

  const [kidProfileImageUrl, setKidProfileUrl] = useState("");
  const [submissionResults, setSubmissionResults] = useState([]);
  const [drawDate, setDrawDate] = useState("");

  useEffect(() => {
    const profileImage = localStorage.getItem("kidProfileImageUrl");
    if (profileImage) {
      setKidProfileUrl(profileImage);
    }
  }, []);
  
  // Function to mask phone number
  const maskPhoneNumber = (phoneNum) => {
    return phoneNum.replace(/(\d{3})-\d{4}-(\d{4})/, '$1-****-$2');
  };

  // Function to format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: 'long', day: 'numeric' }; // 예: 'November 3'
    return date.toLocaleDateString('ko-KR', options); // 한국어 형식
  };

  const fetchResults = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Access Token:", accessToken);
  
      const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/submissions/results`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("API Response Data:", response.data);
  
      if (Array.isArray(response.data.submissions)) {
        const formattedResults = response.data.submissions.map(result => ({
          id: result.id,
          timeStamp: result.timeStamp,
          userId: result.userId,
          name: result.name,
          phoneNum: maskPhoneNumber(result.phoneNum),
        }));
        
        // Set the draw date using the timestamp of the first submission
        if (formattedResults.length > 0) {
          setDrawDate(formatDate(formattedResults[0].timeStamp));
        }

        setSubmissionResults(formattedResults);
      } else {
        console.error("Expected an array but got:", response.data.submissions);
      }
    } catch (error) {
      console.error("Error fetching submission results", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="draw-result">
      <div className="div-2">
        <div className="overlap-group-2">
          <div className="rectangle-3" />

          <div className="frame-10">
            <div className="frame-11">
              <img
                className="logo-white-2"
                alt="Logo white"
                src={logo.idle_world_white}
              />
              <div className="frame-12">
                <img
                  className="yellow-bear-2"
                  alt="Yellow bear"
                  src={logo.character_left}
                />
                <img
                  className="three-animals-2"
                  alt="Three animals"
                  src={logo.character_right}
                />
              </div>
            </div>

            <div className="frame-13">
              <div className="frame-14">
                <div className="frame-24">
                  <div className="text-wrapper-100" onClick={handleHeaderIcon1} style={{ cursor: 'pointer' }}>
                    책 고를까?
                  </div>
                </div>
                <div className="frame-24">
                  <div className="text-wrapper-100" onClick={handleHeaderIcon2} style={{ cursor: 'pointer' }}>
                    유캐포~
                  </div>
                </div>
                <div className="frame-24">
                  <button className="text-wrapper-100" onClick={handleHeaderIcon3}>
                    선물 응모해!
                  </button>
                </div>
              </div>

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

          <div className="submission-results">
            <h3>{drawDate} 선착순 응모 당첨자</h3> {/* 포맷된 날짜 사용 */}
            <div className="results-grid">
              {submissionResults.slice(0, 100).map((result, index) => (
                <div className="result-item" key={index}>
                  {result.name} ({result.phoneNum})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};