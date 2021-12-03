import { useState,useEffect } from "react";
import style from './LectureViewPage.module.css';
import close from './icon/close.png';


//header
function LectureViewHeader(){

  function windowClose(){
      window.opener=null;
      window.open('','_self');
      window.close();
 }

//강의명, 강의 시간, 상태 여부 받아와서 업데이트해주기

  return(
    <div id={style.lectureViewPageHeader}>
      <h1>LectureView Example
        <span className={style.playtime}>00:00</span>
        <span className={style.progressMessage}>
          출석처리 기간입니다.</span>
        <button
        className={style.closeButton}
        onClick={windowClose}>
          <img src={close} alt="close">
          </img>
        </button>
      </h1>
    </div>
  );
}

function LectureViewerMain(){
  //서버에서 영상주소 받아와서 추가해야 함
  return(
    <div id={style.lectureViewerMain}>
      <video id="video"
        controls preload
        width="100%"
        height="100%"
        className={style.player}>
        <source src="https://helloryu.s3.ap-northeast-2.amazonaws.com/test.mp4" 
        type="video/mp4"/>
      </video>
    </div>
  )
}


function LectureViewerFooter(){
  return(
    <div id={style.lectureViewerFooter}>
      <div className={style.progressDate}>출석인정기간입니다.</div>
    </div>
  )
}

function LectureViewPage(){
  return(
    <div>
      <LectureViewHeader/>
      <LectureViewerMain/>
      <LectureViewerFooter/>
    </div>
  );
}
export default LectureViewPage;