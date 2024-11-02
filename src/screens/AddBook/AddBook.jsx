import React, { useState } from "react";
import { SolidInterfaceMenu1 } from "../../icons/SolidInterfaceMenu1";
import { useNavigate } from "react-router-dom";
import { useHandler } from '../../handler.js';
import "./style.css";

import * as logo from '../../../static/img/logo_src.js';

export const AddBook = () => {
  const navigate = useNavigate();
  const {
    handleHeaderIcon1,
    handleHeaderIcon2,
    handleHeaderIcon3,
    handleProfileClick
  } = useHandler();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publisher: "",
    story: "",
    summary: "",
    recommendedAge: "",
    bookImageUrl: "https://www.nlcy.go.kr/multiLanguageStory/2010/Nlcy_016_001/Nlcy_016_001.png" // 기본 링크 설정
  });

  const [loading, setLoading] = useState(false); // 로딩 상태 변수 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true); // 요청 시작 시 로딩 상태 true로 설정
    try {
      const response = await fetch("http://localhost:8080/api/v1/books/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: bookData.title,
          story: bookData.story,
          summary: bookData.summary,
          author: bookData.author,
          publisher: bookData.publisher,
          recommendedAge: parseInt(bookData.recommendedAge, 10),
          bookImageUrl: bookData.bookImageUrl,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const formatGraph = (value, total = 100) => {
          const position = Math.round((value / total) * 10);
          const graph = '='.repeat(10);
          
          const formattedGraph = graph.substring(0, position) + '*' + graph.substring(position + 1);
          
          return formattedGraph; // 최종 그래프 문자열 반환
        };
  
        const eiValue = data.ei; 
        const snValue = data.sn; 
        const tfValue = data.tf; 
        const jpValue = data.jp; 
  
        // 팝업 메시지 구성
        const popupMessage = `
          "${data.title}" 이(가) 성공적으로 저장되었습니다.


          I ${formatGraph(eiValue)} E
          N ${formatGraph(snValue)} S
          F ${formatGraph(tfValue)} T
          P ${formatGraph(jpValue)} J
          
          AI에 기반하여
          해당 도서는 ${data.mbti}로 분석되었습니다.
        `;
  
        alert(popupMessage); 

        setBookData({
          title: "",
          author: "",
          publisher: "",
          story: "",
          summary: "",
          recommendedAge: "",
          bookImageUrl: "https://www.nlcy.go.kr/multiLanguageStory/2010/Nlcy_016_001/Nlcy_016_001.png"
        });
      } else {
        alert("책 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청에 실패했습니다.");
    } finally {
      setLoading(false); // 요청 완료 후 로딩 상태 false로 설정
    }
  };

  return (
    <div className="add-book">
      {loading && (
        <div className="loading-popup">
          책 분석중...
        </div>
      )}
      <div className="div">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="frame">
            <div className="frame-2">
              <img
                className="logo-white"
                alt="Logo white"
                src={logo.idle_world_white}
              />
              <div className="frame-3">
                <img
                  className="yellow-bear"
                  alt="Yellow bear"
                  src={logo.character_left}
                />
                <img
                  className="three-animals"
                  alt="Three animals"
                  src={logo.character_right}
                />
              </div>
            </div>
            <div className="frame-4">
              <div className="frame-5">
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
              </div>
              <SolidInterfaceMenu1 className="solid-interface-menu-1" />
            </div>
          </div>
        </div>

        <div className="frame-6">
          <div className="frame-7">
            <div className="frame-wrapper">
              <div className="frame-8">
                {[
                  { label: "제목", name: "title", placeholder: "제목 입력란" },
                  { label: "저자", name: "author", placeholder: "저자 입력란" },
                  { label: "출판사", name: "publisher", placeholder: "출판사 입력란" },
                  { label: "줄거리", name: "summary", placeholder: "줄거리 입력란" },
                  { label: "내용", name: "story", placeholder: "내용 입력란" },
                  { label: "연령대", name: "recommendedAge", placeholder: "연령대 입력란" }
                ].map(({ label, name, placeholder }) => (
                  <div className="frame-9" key={name}>
                    <div className="text-wrapper-2">{label}</div>
                    <div className="rectangle-2" />
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      className="text-wrapper-3"
                      value={bookData[name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="view" onClick={handleSubmit}>
              <div className="text-wrapper-6">책 등록</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};