import ContainerComponent from "../ContainerComponent";
import styles from "../../styles/LectureUploadComponent.module.css";
import {uploadLecture} from "../../utils/api-tools";
import {useState} from 'react';

function uploadLectureToDB(week, title, file)
{

}

function onFileUpload(event)
{
    event.preventDefault();
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('video', file);
    uploadLecture(1, formData, "Hello");
}


export default function LectureUploadComponent()
{
    let outline = <div className={styles.outline}>강의 업로드</div>
    
    let [uploadList, setUploadList] = useState([]);
    let title = <input type="text" placeholder="Title" 
        id="title" className={styles.title}></input>
    let file = <input type="file" id="fileBtn" className={styles.fileBtn}></input>

    let buttons;
    let uploadedFile;
    let addBtn = <button className={styles.addBtn} onClick={function(e){
        uploadList.push(<div>
            {title}
            {file}
        </div>); 
        uploadList = uploadList.slice();
        setUploadList(uploadList);
    }.bind(this)}>추가</button>
    let uploadBtn = <button className={styles.uploadBtn} 
    onClick={function(e){
        let s = document.getElementById("week");
        // 몇주차 강의인지
        let week = s.options[s.selectedIndex].value;
        // 영상 몇개를 넣을건지
        let count = document.getElementsByClassName("LectureUploadComponent_title__4v82a").length;
        for (let i=0; i<count; i++)
        {
            // 타이틀
            //title = document.getElementById("title")[i].value;
            title = document.getElementsByClassName("LectureUploadComponent_title__4v82a")[i].value;
            // mp4 정보
            uploadedFile = document.getElementsByClassName("LectureUploadComponent_fileBtn__QOWrk")[i].files[0];
            uploadLecture(parseInt(week), uploadedFile, title);
        }
        //alert(week);
        //alert(count);
    }.bind(this)}>업로드</button>
    buttons = <div className={styles.buttons}>
        {addBtn}
        {uploadBtn}
    </div>
    let lectureUploadPage = <div>
        {outline}
        {uploadList}
        <select name="week" id="week">
                <option value="1">1주차</option>
                <option value="2">2주차</option>
                <option value="3">3주차</option>
                <option value="4">4주차</option>
                <option value="5">5주차</option>
                <option value="6">6주차</option>
                <option value="7">7주차</option>
                <option value="1">8주차</option>
                <option value="2">9주차</option>
                <option value="3">10주차</option>
                <option value="4">11주차</option>
                <option value="5">12주차</option>
                <option value="6">13주차</option>
                <option value="7">14주차</option>
                <option value="1">15주차</option>
                <option value="2">16주차</option>
            </select>
        {buttons}
    </div>
    return (
        <ContainerComponent content={lectureUploadPage}></ContainerComponent>
    );
}