import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandler } from '../../handler.js';
import { Frame28 } from "../../icons/Frame28";
import { Frame29 } from "../../icons/Frame29";
import "./style.css";

import * as logo from '../../../static/img/logo_src.js';
import * as icon from '../../../static/img/icon_src.js';

export const BookDetail = () => {
  const navigate = useNavigate();
  const {
    handleHeaderIcon1,
    handleHeaderIcon2,
    handleHeaderIcon3,
    handleProfileClick
  } = useHandler();

  const [kidProfileImageUrl, setKidProfileUrl] = useState("");
  const [kidId, setKidId] = useState("");
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [author, setAuthor] = useState("");

  // kidProfileImageUrl을 localStorage에서 불러옴
  useEffect(() => {
    const profileImage = localStorage.getItem("kidProfileImageUrl");
    if (profileImage) {
      setKidProfileUrl(profileImage);
    }
  }, []);

  // kidId를 localStorage에서 불러옴
  useEffect(() => {
    const kidId = localStorage.getItem("kidId");
    if (kidId) {
      setKidId(kidId);
    }
  }, []);

  // bookId를 localStorage에서 불러옴
  useEffect(() => {
    const bookId = localStorage.getItem("bookId");
    if (bookId) {
      setBookId(bookId);
    }
  }, []);

  // 책 상세정보를 백엔드에서 불러옴
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/books?bookId=${bookId}&kidId=${kidId}`);
        if (!response.ok) throw new Error("책 상세정보를 가져오는 데 실패했습니다.");

        const data = await response.json();

        setTitle(data.title);
        setStory(data.story);
        setAuthor(data.author);
        // 다른 상태 변수도 필요에 따라 설정
      } catch (error) {
        console.error("책 상세정보를 가져오는 중 오류 발생:", error);
      }
    };

    if (bookId && kidId) {
      fetchBookDetail();
    }
  }, [bookId, kidId]);

  // 좋아요 버튼 클릭 시 처리 함수
  const handleLikeBook = async () => {
    try {
      const reqBody = { kidId: Number(kidId) }; // 요청 본문 생성
      const response = await fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/books/${bookId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) throw new Error("책 좋아요 요청에 실패했습니다.");
      console.log("책을 좋아요했습니다.");
    } catch (error) {
      console.error("책 좋아요 처리 중 오류 발생:", error);
    }
  };

  // 싫어요 버튼 클릭 시 처리 함수
  const handleDislikeBook = async () => {
    try {
      const reqBody = { kidId: Number(kidId) }; // 요청 본문 생성
      const response = await fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/books/${bookId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) throw new Error("책 싫어요 요청에 실패했습니다.");
      console.log("책을 싫어요했습니다.");
    } catch (error) {
      console.error("책 싫어요 처리 중 오류 발생:", error);
    }
  };

  return (
    <div className="book-detail">
      <div className="div-2">
        <div className="overlap-group-2">
          <div className="rectangle-2" />
          <div className="frame-8">
            <div className="frame-9">
              <img className="img" alt="로고" src={logo.idle_world_white} />
              <div className="frame-10">
                <img className="yellow-bear-2" alt="노란 곰" src={logo.character_left} />
                <img className="three-animals-2" alt="세 마리 동물" src={logo.character_right} />
              </div>
            </div>

            <div className="frame-22">
              <div className="frame-23">
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
              <div className="profile-picture-container" onClick={handleProfileClick}>
                <img className="kid-profile" alt="아이 프로필" src={kidProfileImageUrl} style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="frame-14">
          <div className="frame-77">
            <img className="yellow-box" alt="프레임" src={icon.book_cover} />
            <div className="frame-88"> 
              <button className="icon-button" onClick={handleLikeBook} style={{ background: 'none', border: 'none', padding: 0 }}>
                <Frame28 className="icon-instance-node" />
              </button>
              <button className="icon-button" onClick={handleDislikeBook} style={{ background: 'none', border: 'none', padding: 0 }}>
                <Frame29 className="icon-instance-node" />
              </button>
            </div>
          </div>

          <div className="frame-16">
            <div className="frame-17">
              <div className="frame-18">
                <div className="text-wrapper-7">제목</div>
                <div className="rectangle-3" />
                <div className="text-wrapper-8">{title}</div>
              </div>

              <div className="frame-18">
                <div className="text-wrapper-9">저자</div>
                <div className="rectangle-3" />
                <div className="text-wrapper-8">{author}</div>
              </div>

              <div className="frame-18">
                <div className="text-wrapper-9">줄거리</div>
                <div className="rectangle-3" />
                <div className="text-wrapper-8">{story}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};