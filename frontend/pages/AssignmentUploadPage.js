import style from '../styles/AssignmentUpload.module.css';
import { useState,useEffect,useRef} from "react";
import {CreateBookmark, login} from "../utils/api-tools";
//header
function AssignmentUploadHeader(){
  return(
    <div id={style.assignmentHeader}>
    </div>
  );
}

//main
function AssignmentUploadMain(){

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [uploadFile,setUploadFile] = useState(null);
  const saveTitle = (event)=>{setTitle(event.target.value)};
  const saveDescription = (event)=>{setDescription(event.target.value)};
  const handleFileUpload = (event)=>{setUploadFile(event.target.files[0])};
  const descriptionRef = useRef(null);
  const titleRef = useRef(null);
  const [userId, setUserId] = useState('');
  
  useEffect(()=>{
    login("abc@gmail.com","1234").then((result)=>setUserId(result.userId));

  },[]);
 

  // form submit event 
  // 제출 버튼 누르면 북마크 api post하게 해놨습니다.
  // 파일 업로드는 하지 않습니다.
  const onSubmit = (event)=>{
    event.preventDefault();
    if(title==="" || description===""){
      alert("제목 혹은 내용을 입력하세요.");
      return;
    }
    const message = "제출하시겠습니까?";
    const submitAnswer = window.confirm(message);
    
    //if press confirm button
    if(submitAnswer){
      CreateBookmark(2,title,description);
    }else{
      return;
    }
    descriptionRef.current.value="";
    titleRef.current.value="";
    setDescription("");
    setTitle("");
  };

  return (
    <div id={style.assignmentMain}>
      <div className={style.mainWrap}>
        <div><h1>과제 업로드</h1></div>
        <form onSubmit={onSubmit}>
        <div>
          <input
          type="number"
          ref = {titleRef}
          onChange={saveTitle}
          className={style.titleBox} 
          placeholder="Title number..."/>
        </div>
        <div>
          <textarea
          ref = {descriptionRef}
          onChange={saveDescription}
          className={style.descriptionBox}
          placeholder="Description..."/>
        </div>
        <div>
          <input 
          className={style.fileUpload}
          onChange={handleFileUpload}
          type="file"/>
        </div>
        <div>
          <input 
          className={style.uploadButton}
          type="submit"/>
        </div>
        </form>
      </div>
    </div>
  );
}

//footer 
function AssignmentFooter(){
  return(
    <div id={style.assignmentFooter}>
      <div className={style.footerWrap}>
        <ul className={style.policy}>
        <a href="http://www.uos.ac.kr/kor/html/site/personalInfo/personalInfo.do" target="_blank">
          <li><strong>개인정보방침</strong></li></a>
          <a href="http://www.uos.ac.kr/kor/html/site/email/email.do" target="_blank">
          <li>이메일무단수집거부</li></a>
          <li>02504 서울특별시 동대문구 서울시립대로 163(전동동)90</li>
          <li>전화 : 02-6490-6114</li>
        </ul>
        <p className={style.copyright}>Copyright© 2014 The University of Seoul. All Rights Reserved.</p>
      </div>
    </div>
  );
}

function AssignmentUploadPage(){
  return (
    <div> 
      <AssignmentUploadHeader/>
      <AssignmentUploadMain/>
      <AssignmentFooter/>
    </div>
  );
}

export default AssignmentUploadPage;