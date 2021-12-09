import { useState,useEffect,useRef} from "react";
import { useRouter } from 'next/router';
import style from '../styles/LectureViewPage.module.css';
import {CreateBookmark, getLectureResource, getMainData, login} from "../utils/api-tools";
import { getToken, validate, decode } from "../utils/token";
import CommonHead from "../components/CommonHead";

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
  const router = useRouter();

  //강의 정보 받아오기 
  useEffect(()=>{
    if(!validate()) {
      router.push("/login");
      return;
    }
    const { userId } = decode(getToken());
    setUserId(userId);
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
  const router = useRouter();

  const getCurrentTime = (event)=>{
    setCurrentTime(event.target.currentTime);
  }
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(()=>{
    if(!validate()) {
      router.push("/login");
      return;
    }

  },[])

  useEffect(() => {
    const lectureResourceId = router.query.lectureResourceId;
    if(!lectureResourceId){
      return;
    }
    getLectureResource(lectureResourceId).then((response)=>setLectureURL(response[0].url)).then(setLoading(false));
  }, [router.query.lectureResourceId]);

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
      <div>
      <button id={style.bookmarkButton} className="btn btn-primary btn-icon-split"
              onClick={onClick}>
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
      <CommonHead />
      <LectureViewHeader/>
      <LectureViewerMain/>
      <LectureViewerFooter/>
    </div>
  );
}
export default LectureViewPage;