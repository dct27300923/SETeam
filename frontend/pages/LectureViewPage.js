/** @jsxImportSource @emotion/react */
import { css, jsx }from '@emotion/react';
import { useState,useEffect,useRef} from "react";
import { useRouter } from 'next/router';
import style from '../styles/LectureViewPage.module.css';
import {CreateBookmark, getLectureResource, getMainData, PatchLectureResource} from "../utils/api-tools";
import { getToken, validate, decode } from "../utils/token";
import CommonHead from "../components/CommonHead";

//Header 
function LectureViewHeader(){

  const [userId, setUserId] = useState("");
  const [loading,setLoading] = useState(true);
  const [lectureInfo,setLectureInfo] = useState([]);
  const router = useRouter();


//get lectureId from currentURL
  const getLectureId = ()=>{
    const url = window.location.search;
    for(let i = 0 ; i<url.length;i++){
      if(url[i]==='&'){
        return url[i-1];
      }
    }
  }
//get lecture data using getMainData()
  useEffect(()=>{
    if(!validate()) {
      router.push("/login");
      return;
    }


    const { userId } = decode(getToken());
    setUserId(userId);
    getMainData().then((result)=>setLectureInfo(result[getLectureId()-1].title)).then(setLoading(false));
  },[]);


//default header
  function HeaderDefault(){
    return(
      <div>
      <h1>강의정보를 불러오는 중입니다.
      <span className={style.playtime}>00:00</span>
      <span className={style.progressMessage}>
        학생: default</span>
      </h1>
      </div>

    )
  }
//header after loading
  function HeaderAfterLoading(){

    return(
      <div>
      <h1>{lectureInfo}
        <span className={style.playtime}>01:00</span>
        <span className={style.progressMessage}>
        학생: {userId}</span>
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

//main
function LectureViewerMain(){

  const [description,setDescription] = useState("");
  const saveDescription = (event)=>{setDescription(event.target.value)};
  const [bookmark,setBookmark] = useState([]);
  const [currentTime,setCurrentTime] = useState("");
  const [lectureURL,setLectureURL] = useState("");
  const [loading,setLoading] = useState(true);
  const [resourceId,setResourceId] = useState("");
  const router = useRouter();
  const getCurrentTime = (event)=>{
    setCurrentTime(event.target.currentTime);
  }
  
  const videoRef = useRef(null);
  const textRef = useRef(null);



  //attendanceSec patch 
  function patchAttendanceSec(){

    function windowClose(){
      window.opener=null;
      window.open('','_self');
      window.close();
  }
    const message = "종료버튼을 누르면 시청시간이 반영 됩니다";
    const submitAnswer = window.confirm(message);


    if(submitAnswer){
      PatchLectureResource(resourceId,currentTime);
      windowClose();
    }else{
      return;
    }
  }

  useEffect(()=>{
    if(!validate()) {
      router.push("/login");
      return;
    }
  },[])

  useEffect(() => {
    const lectureResourceId = router.query.lectureResourceId;
    setResourceId(lectureResourceId);
    if(!lectureResourceId){
      return;
    }
    getLectureResource(lectureResourceId).then((response)=>setLectureURL(response[0].url)).then(setLoading(false));
  }, [router.query.lectureResourceId]);

//make bookmark function
  const makeBookMark = ()=>{
    const bookmarkContainer = {
      "bookmarkSec":currentTime,
      "content":description,
    };
    textRef.current.value="";
    setDescription("");
    setBookmark((currentArray)=>[bookmarkContainer, ... currentArray]);
  }

//post bookmark function
  const postBookmark = ()=>{
    for(let i = 0 ; i < bookmark.length ; i++){
      const {bookmarkSec,content} = bookmark[i];
      CreateBookmark(resourceId,bookmarkSec,content);

    }
  }

//bookmark timejump function
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
        width="100%"
        height="100%"
        onTimeUpdate={getCurrentTime}
        className={style.player}
        type="video/mp4">
      </video>
    </div>
    <div id={style.bookmark}>
      <div className="card mb-4">
        <div className="card-header">북마크</div>
        <div className="card-body">
        <textarea
        ref = {textRef}
        className={style.bookmarkDescription}
        onChange={saveDescription}
        placeholder="bookmark description"/>
      </div>
      </div>
      <div css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}>
      <button id={style.bookmarkButton} className="btn btn-primary btn-icon-split"
              onClick={makeBookMark}>
                <span className="icon text-white-50">
                  <i className="fas fa-bookmark"></i>
                </span>
                <span className="text">북마크 생성</span>
      </button>
      <button id={style.bookmarkButton} className="btn btn-success btn-icon-split"
                onClick={postBookmark}>                
                <span className="icon text-white-50">
                <i className="fas fa-arrow-right"></i></span>
              <span className="text">북마크 전송</span>
        </button>
        <button
      onClick={patchAttendanceSec}>강의종료
      </button>      
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

//footer
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
      <CommonHead />
      <LectureViewHeader/>
      <LectureViewerMain/>
      <LectureViewerFooter/>
    </div>
  );
}
export default LectureViewPage;