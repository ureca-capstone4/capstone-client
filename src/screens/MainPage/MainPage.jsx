import React from "react";
import { SolidInterfaceMenu } from "../../components/SolidInterfaceMenu";
import "./style.css";

export const MainPage = () => {
  return (
    <div className="main-page">
      <div className="div-3">
        <div className="overlap-group-3">
          <div className="rectangle-4" />

          <div className="frame-19">
            <div className="frame-20">
              <img
                className="logo-white-2"
                alt="Logo white"
                src="/img/logo-white-1-3.svg"
              />

              <div className="frame-21">
                <img
                  className="yellow-bear-3"
                  alt="Yellow bear"
                  src="/img/yellow-bear.png"
                />

                <img
                  className="three-animals-3"
                  alt="Three animals"
                  src="/img/three-animals.png"
                />
              </div>
            </div>

            <div className="frame-22">
              <div className="frame-23">
                <div className="frame-24">
                  <div className="text-wrapper-10">파트파트1</div>
                </div>

                <div className="frame-24">
                  <div className="text-wrapper-10">파트파트2</div>
                </div>

                <div className="frame-24">
                  <div className="text-wrapper-10">파트파트3</div>
                </div>
              </div>

              <SolidInterfaceMenu className="solid-interface-menu-instance" />
            </div>
          </div>
        </div>

        <div className="frame-25">
          <div className="text-wrapper-11">오늘은 어떤 책을 읽어볼까?</div>

          <div className="frame-26">
            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark.png"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-1.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-2.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-3.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-4.svg"
            />
          </div>

          <div className="frame-26">
            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-5.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-6.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-7.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-8.svg"
            />

            <img
              className="outline-files-book"
              alt="Outline files book"
              src="/img/outline-files-book-mark-9.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
