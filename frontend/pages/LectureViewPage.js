import { getRoles } from "@testing-library/dom";
import { useState,useEffect} from "react";
import style from './LectureViewPage.module.css';
import close from './style/close.png';

//header
function LectureViewHeader(){

  function windowClose(){
      window.opener=null;
      window.open('','_self');
      window.close();
  }
  //강의명, 강의 시간, 상태 여부 받아와서 업데이트해주기
  
  const [loading,setLoading] = useState(true);
  const [lectureInfo,setLectureInfo] = useState([]);
  const getLectureInfo = async() =>{
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
    const json = await response.json();
    setLectureInfo(json.data.movies[0]);
    setLoading(false);
  }
  useEffect(()=>{
    getLectureInfo();
  },[]);

  console.log(lectureInfo);


  function HeaderDefault(){
    return(
      <div>
      <h1>강의정보를 불러오는 중입니다.
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
    )
  }
  
  return(
    <div id={style.lectureViewPageHeader}>
      {loading ? <HeaderDefault/> : 
        <div>
          <h1>{lectureInfo.title}
            <span className={style.playtime}>55555</span>
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
      }
    </div>);

}

function LectureViewerMain(){
  
  //위에서 받아온 url 주소로 넘겨주기
  //버튼 누르면 timeline 받아오고 옆에 띄워줌
  //저장해서 서버로 post 하면 될듯
  const [description,setDescription] = useState("");
  const saveDescription = (event)=>{setDescription(event.target.value)};
  const [bookmark,setBookmark] = useState([]);
  const [timeArray,setTimeArray] = useState([]);
  const [currentTime,setCurrentTime] = useState("");
  
  const getCurrentTime = (event)=>{
    setCurrentTime(event.target.currentTime);
  }
  
  
  const onClick = ()=>{
    //만들었으면 <li> 형태로 시각적으로 보이게 해주기. 박스안 내용 리셋하기.
    //버튼을 새로 만들어서 bookmark 배열을 json화해서 post 요청하도록 하면 될듯?
    const bookmarkContainer = {
      "bookmarkSec":currentTime,
      "content":description,
    };
    setDescription("");
    setTimeArray((currentArray)=>[currentTime,...currentArray]);
    setBookmark((currentArray)=>[bookmarkContainer, ... currentArray]);
  
  }

  return(
    <div>
    <div id={style.lectureViewerMain}>
      <video id="video"
        controls preload="true"
        width="100%"
        height="100%"
        onTimeUpdate={getCurrentTime}
        className={style.player}>
        <source src="https://helloryu.s3.ap-northeast-2.amazonaws.com/test.mp4" 
        type="video/mp4"/>
      </video>
    </div>
    <div id={style.bookmark}>
      <h1>북마크</h1>
      <div>
      <textarea
      className={style.bookmarkDescription}
      onChange={saveDescription}
      placeholder="bookmark description"/>
      </div>
      <div>
        <button id={style.bookmarkButton}
                onClick={onClick}>북마크 생성</button>
      </div>
      <hr/>
    </div>
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