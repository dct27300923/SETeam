import { useState,useEffect,useRef} from "react";
import style from '../styles/LectureViewPage.module.css';
import {CreateBookmark, getLectureResource, getMainData, login} from "../utils/api-tools";

//header
function LectureViewHeader(){

  function windowClose(){
      window.opener=null;
      window.open('','_self');
      window.close();
  }

  const [userId, setUserId] = useState('');
  const [loading,setLoading] = useState(true);
  const [lectureInfo,setLectureInfo] = useState([]);

  //강의 정보 받아오기 
  useEffect(()=>{
    login("abc@gmail.com","1234").then((result)=>setUserId(result.userId));
    getMainData().then((result)=>setLectureInfo(result[1].title)).then(setLoading(false));
  },[]);


  function HeaderDefault(){
    return(
      <div>
      <h1>강의정보를 불러오는 중입니다.
      <span className={style.playtime}>00:00</span>
      <span className={style.progressMessage}>
        학생: default</span>
      <button
      className={style.closeButton}
      onClick={windowClose}>
      </button>
      </h1>
      </div>

    )
  }

  function HeaderAfterLoading(){

    return(
      <div>
      <h1>{lectureInfo}
        <span className={style.playtime}>01:00</span>
        <span className={style.progressMessage}>
        학생: {userId}</span>
        <button
        className={style.closeButton}
        onClick={windowClose}>
        </button>
      </h1>
    </div>
    )
  }

  return(
    <div id={style.lectureViewPageHeader}>
      {loading?<HeaderDefault/>:<HeaderAfterLoading/>}
    </div>
  );
}


function LectureViewerMain(){

  const [description,setDescription] = useState("");
  const saveDescription = (event)=>{setDescription(event.target.value)};
  const [bookmark,setBookmark] = useState([]);
  const [currentTime,setCurrentTime] = useState("");
  const [lectureURL,setLectureURL] = useState("");
  const [loading,setLoading] = useState(true);


  const getCurrentTime = (event)=>{
    setCurrentTime(event.target.currentTime);
  }
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(()=>{
    getLectureResource(2).then((response)=>setLectureURL(response[0].url)).then(setLoading(false));
  },[])

  const onClick = ()=>{
    const bookmarkContainer = {
      "bookmarkSec":currentTime,
      "content":description,
    };
    textRef.current.value="";
    setDescription("");
    setBookmark((currentArray)=>[bookmarkContainer, ... currentArray]);
  }

  const postBookmark = ()=>{
    for(let i = 0 ; i < bookmark.length ; i++){
      const {bookmarkSec,content} = bookmark[i];
      CreateBookmark(2,bookmarkSec,content);
    }
  }

  const timeJump = (event)=>{
    const bookmarkTime = event.target.title;
    videoRef.current.currentTime = bookmarkTime;
  }


  return(
    <div>
    <div id={style.lectureViewerMain}>
      <video id="video"
        ref ={videoRef}
        src={loading ? null : lectureURL}
        controls
        muted
        width="100%"
        height="100%"
        onTimeUpdate={getCurrentTime}
        className={style.player}
        type="video/mp4">
      </video>
    </div>
    <div id={style.bookmark}>
      <h1>북마크</h1>
      <div>
      <textarea
      ref = {textRef}
      className={style.bookmarkDescription}
      onChange={saveDescription}
      placeholder="bookmark description"/>
      <button id={style.bookmarkButton}
              onClick={onClick}>북마크 생성</button>
      </div>

      <div>
        <button id={style.bookmarkButton}
                onClick={postBookmark}>북마크 전송</button>
      </div>
      <hr/>
      <ol>
      {bookmark.map((item,index)=><li key={index} title={item.bookmarkSec}
      onClick={timeJump}>시간: {item.bookmarkSec},
      내용: {item.content}</li>)}
      </ol>
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