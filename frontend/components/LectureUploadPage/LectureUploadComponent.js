/** @jsxImportSource @emotion/react */
import { css, jsx }from '@emotion/react';
import ContainerComponent from "../ContainerComponent";
import styles from "../../styles/LectureUploadComponent.module.css";
import {uploadLecture} from "../../utils/api-tools";
import {useState} from 'react';

export default function LectureUploadComponent()
{
    let outline = <div>강의 업로드</div>

    let [uploadList, setUploadList] = useState([]);
    let title = <input type="text" placeholder="Title" 
        id="title" className={styles.title}></input>
    let file = <input type="file" id="fileBtn" className={styles.fileBtn}></input>
    let buttons;

    const addUpload = () => {
        uploadList.push(<div className="card">
            <div className="card-header text-info">제목과 파일을 입력해주세요.</div>
            <div className="card-body">
                {title}
                {file}
            </div>
        </div>); 
        uploadList = uploadList.slice();
        setUploadList(uploadList);
    }

    let addBtn = <button className={styles.addBtn} onClick={addUpload}>추가</button>
    let uploadBtn = <button className={styles.uploadBtn} 
    onClick={function(e){
        let s = document.getElementById("week");
        let t = document.getElementById("subject");
        // 몇주차 강의인지
        let week = s.options[s.selectedIndex].value;
        let lectureId = t.options[t.selectedIndex].value;
        // 영상 몇개를 넣을건지
        let titleElements = document.getElementsByClassName("LectureUploadComponent_title__4v82a");
        let fileElements = document.getElementsByClassName("LectureUploadComponent_fileBtn__QOWrk");
        const promises = [];

        for(let i = 0; i < titleElements.length; i++) {
            let title = titleElements[i].value;
            let file = fileElements[i].files[0];
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                console.log(video.duration);
            }
            video.src = URL.createObjectURL(file);
            promises.push(uploadLecture(lectureId, week, file, title));
        }
        Promise.all(promises).then(function(values) {
            console.log(values);
        });
        alert("강의가 업로드 되었습니다.");
    }.bind(this)}>업로드</button>
    buttons = <div className={styles.buttons}>
        {addBtn}
        {uploadBtn}
    </div>
    let lectureUploadPage = <div css={css`
        & > * {
            margin: 20px 0;
        }
    `}>
        <div
            className="card" 
        >
                <div className="card-header py-3">{outline}</div>
                <div className="card-body"             
                    css={css`
                        & > * {
                            margin-right: 10px;
                        }
                `}>
                    <select name="week" id="week" className="btn btn-primary dropdown-toggle">
                        <option value="0" disabled selected>주차 선택</option>
                        <option value="1">1주차</option>
                        <option value="2">2주차</option>
                        <option value="3">3주차</option>
                        <option value="4">4주차</option>
                        <option value="5">5주차</option>
                        <option value="6">6주차</option>
                        <option value="7">7주차</option>
                        <option value="8">8주차</option>
                        <option value="9">9주차</option>
                        <option value="10">10주차</option>
                        <option value="11">11주차</option>
                        <option value="12">12주차</option>
                        <option value="13">13주차</option>
                        <option value="14">14주차</option>
                        <option value="15">15주차</option>
                        <option value="16">16주차</option>
                    </select>
                    <select name="subject" id="subject" className="btn btn-primary dropdown-toggle">
                        <option value="0" disabled selected>과목 선택</option>
                        <option value="1">인공지능</option>
                        <option value="2">소프트웨어응용</option>
                        <option value="3">선형대수</option>
                    </select>
                </div>
        </div>
        {uploadList}
        {buttons}
    </div>
    return (
        <ContainerComponent content={lectureUploadPage}></ContainerComponent>
    );
}