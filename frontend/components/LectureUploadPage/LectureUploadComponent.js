import ContainerComponent from "../ContainerComponent";
import styles from "../../styles/LectureUploadComponent.module.css";
import {useState} from 'react';

function uploadLectureToDB(week, title, file)
{

}

export default function LectureUploadComponent()
{
    let outline = <div className={styles.outline}>강의 업로드</div>
    
    let [uploadList, setUploadList] = useState([]);
    let title = <input type="text" placeholder="Title" 
        className={styles.title}></input>
    let file = <input type="file" className={styles.fileBtn}></input>

    let buttons;
    let addBtn = <button className={styles.addBtn} onClick={function(e){
        uploadList.push(<div>
            {title}
            {file}
        </div>);
        uploadList = uploadList.slice();
        setUploadList(uploadList);
    }.bind(this)}>추가</button>
    let uploadBtn = <button className={styles.uploadBtn} onClick={function(e){
        let s = document.getElementById("week");
        let week = s.options[s.selectedIndex].value;
        let count = document.getElementsByClassName("LectureUploadComponent_title__4v82a").length;
        for (let i=0; i<count; i++)
        {
            title = document.getElementsByClassName("LectureUploadComponent_title__4v82a")[i].value;
            //uploadLectureToDB(week, title, )
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