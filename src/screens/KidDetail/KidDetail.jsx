import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandler } from '../../handler.js';
import axios from "axios";
import "./style.css";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import * as logo from '../../../static/img/logo_src.js';
import * as shape from '../../../static/img/shape_src.js';

export const KidDetail = () => {
  const navigate = useNavigate();
  const {
    handleHeaderIcon1,
    handleHeaderIcon2,
    handleHeaderIcon3,
    handleProfileClick
  } = useHandler();

  // KidDetail 컴포넌트 내에 추가
  const handleTestPageClick = () => {
    navigate("/test_page"); // test-page로 리다이렉트
  };

  const handleDeletePersonalityClick = async () => {
    const kidId = localStorage.getItem("kidId");
  
    if (kidId) {
      try {
        const response = await axios.put(
          `http://${process.env.REACT_APP_BACKEND_IP}/api/v1/kids/${kidId}/personalities`
        );
        console.log("삭제 성공:", response.data); // 삭제 성공 응답 확인
      } catch (error) {
        console.error("MBTI 내역 삭제 중 오류 발생:", error);
        if (error.response) {
          console.error("오류 응답 데이터:", error.response.data); // 에러 응답 확인
        }
      }
    } else {
      console.warn("kidId not found in local storage.");
    }
  };

  const [kidProfileImageUrl, setKidProfileUrl] = useState("");
  const [kidName, setKidName] = useState("");
  const [personalityHistory, setPersonalityHistory] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 변수 추가

  useEffect(() => {
    const profileImage = localStorage.getItem("kidProfileImageUrl");
    const name = localStorage.getItem("kidName");
    const kidId = localStorage.getItem("kidId");

    if (profileImage) setKidProfileUrl(profileImage);
    if (name) setKidName(name);

    const fetchData = async () => {
      if (kidId) {
        try {
          const response = await axios.get(
            `http://${process.env.REACT_APP_BACKEND_IP}/api/v1/kids/${kidId}/personalityHistories`
          );
          console.log("API 응답:", response.data); // 응답 확인
          if (response.data && response.data.histories) {
            setPersonalityHistory(response.data.histories);
          } else {
            console.error("Received data is null or undefined.");
          }
        } catch (error) {
          console.error("Error fetching personality history:", error);
          if (error.response) {
            console.error("Error response data:", error.response.data); // 에러 응답 확인
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("kidId not found in local storage.");
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);

  const getGraphData = () => {
    if (!personalityHistory || personalityHistory.length === 0) {
      return {
        labels: ["E-I", "S-N", "T-F", "J-P"],
        datasets: [],
      };
    }
  
    const monthColors = [
      "#f79393", 
      "#ff7b00", 
      "#ffe500",
      "#6cff85",
      "#2eaafc",
    ];
  
    // 최근 5개 데이터 가져오기
    const recentData = personalityHistory.slice(-5);
  
    const datasets = recentData.map((data, index) => ({
      label: new Date(data.createdAt).toLocaleDateString("ko-KR", { month: "long" }),
      data: [data.ei, data.sn, data.tf, data.jp],
      borderColor: monthColors[index % monthColors.length],
      backgroundColor: monthColors[index % monthColors.length],
      fill: false,
    }));
  
    return {
      labels: ["E-I", "S-N", "T-F", "J-P"],
      datasets,
    };
  };
  
  // 로딩 중 화면 표시
  if (loading) {
    return <div className="loading">로딩중...</div>; // 로딩중 메시지 추가
  }

  return (
    <div className="kid-detail">
      <div className="div">
        <div className="overlap">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-2">
              <img className="logo-white" alt="Logo white" src={logo.idle_world_white} />
              <div className="frame-3">
                <img className="yellow-bear" alt="Yellow bear" src={logo.character_left} />
                <img className="three-animals" alt="Three animals" src={logo.character_right} />
              </div>
            </div>
            <div className="frame-4">
            <div className="frame-24">
                  <div className="text-wrapper-10" onClick={handleHeaderIcon1} style={{ cursor: 'pointer' }}>
                    책 고를까?
                  </div>
                </div>
                <div className="frame-24">
                  <div className="text-wrapper-10" onClick={handleHeaderIcon2} style={{ cursor: 'pointer' }}>
                    유캐포~
                  </div>
                </div>
                <div className="frame-24">
                  <button className="text-wrapper-10" onClick={handleHeaderIcon3}>
                    선물 응모해!
                  </button>
                </div>
                <div className="profile-picture-container" onClick={handleProfileClick}>
                <img className="kid-profile" alt="아이 프로필" src={kidProfileImageUrl} style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="overlap-group">
          <div className="frame-6">
            <div className="frame-7">
              <div className="frame-8">
              <div className="text-wrapper-2" onClick={handleTestPageClick} style={{ cursor: 'pointer' }}>
                MBTI 검사
              </div>
              </div>
              <div className="frame-9">
              <div className="frame-9">
                  <div className="text-wrapper-3" onClick={handleDeletePersonalityClick} style={{ cursor: 'pointer' }}>
                    MBTI 내역 삭제
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-10">
              <div className="frame-11">
                <img className="boy-blue" alt="Boy blue" src={kidProfileImageUrl} />
                <div className="name-field-wrapper">
                  <div className="name-field"><div className="text-wrapper-4">{kidName}</div></div>
                </div>
              </div>
              <div className="image-container">
                <img className="imgggg" alt="Rectangle" src={shape.rectangle_mbti} />
                <div className="graph-container">
                  <Line
                    data={getGraphData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        title: { display: false },
                      },
                      scales: {
                        y: {
                          min: 0,
                          max: 100,
                          title: {
                            display: false,
                          },
                        },
                        x: {
                          title: {
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="ellipse" />
              <div className="frame-12">
                {personalityHistory.slice(-5).map((history, index) => (
                  <div className={`frame-${13 + index}`} key={index}>
                    <div className="text-wrapper-5">
                      {new Date(history.createdAt).getMonth() + 1}월
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};