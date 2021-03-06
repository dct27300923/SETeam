/** @jsxImportSource @emotion/react */
import { css, jsx }from '@emotion/react';
import OutlineComponent from "./OutlineComponent.js";
import ContainerComponent from "../ContainerComponent.js";
import styles from "../../styles/LectureComponent.module.css";
import { getBookmarkByLectureId, removeBookmark } from "../../utils/api-tools.js";
import {useState} from 'react';
import Link from "next/link";

function deleteBookmarkFromDB(currentBookmark, bookmarkId)
{
    removeBookmark(bookmarkId);
    // let currentBookmark = getBookmarkFromDB(userID, subject);
    currentBookmark = currentBookmark.slice();
    for (let i=0; i < currentBookmark.length; i++)
    {
        if (currentBookmark[i]["bookmarkId"] == bookmarkId)
        {
            currentBookmark.splice(i,1);
            break;
        }
    }
    return currentBookmark;
}

function create2DArray(row, column)
{
    var arr = new Array(row);
    for (let i=0;i<row;i++)
        arr[i] = new Array(column);
    return arr;
}

function getLectureList(lectureDetail)
{
    let lectureList = create2DArray(16,0);
    let totalLectureCount = lectureDetail.length;
    for (let i=0;i<totalLectureCount;i++)
    {
        let lectureId = lectureDetail[i]['LectureId'];
        let week = lectureDetail[i]['week'];
        let title = lectureDetail[i]['title'];
        let url = lectureDetail[i]['url'];
        let lectureResourseId = lectureDetail[i]['LectureResourceId'];
        lectureList[week-1].push([title,url, lectureResourseId,lectureId]);
    }
    return lectureList;
}

function getAttendanceStatus(attendDetail)
{
    let attendList = [];
    for (let i=0;i<attendDetail.length;i++)
    {
        let attend = attendDetail[i]['attendanceResult'];
        if (attend == 'O')
            attendList.push(1);
        else if (attend == 'X')
            attendList.push(3);
    }
    return attendList;
}

function getBookmark(bookmarks)
{
    let bookmarkList = [];
    for (let i=0;i<bookmarks.length;i++)
    {
        let week = bookmarks[i]['week'];
        let bookmark_sec = bookmarks[i]['bookmark_sec'];
        let title = (bookmarks[i]['title'] + "(" + week + "??????, " + parseInt(bookmark_sec / 60) + "??? " + (bookmark_sec%60) + "???)");
        let content = bookmarks[i]['content'];
        let bookmarkId = bookmarks[i]['bookmarkId'];
        bookmarkList.push({title, content, bookmarkId});
    }
    return bookmarkList;
}

function LectureComponent(props)
{
    let lectureDetail = props.lectureDetail;
    if (lectureDetail == undefined || props.bookmark == undefined)
    {
        return (
            <>
            </>
        );
    }
    const lectureListFromDB = getLectureList(lectureDetail[0]);
    const attendanceStatusFromDB = getAttendanceStatus(lectureDetail[1]);
    const bookmarkFromDB = getBookmark(props.bookmark);
    const [bookmarks, setBookmarks] = useState(bookmarkFromDB);
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    let startDate = new Date(2021, 9, 1);
    let endDate = new Date(year, month, day);
    let thisWeek = parseInt((endDate.getTime() - startDate.getTime())/(1000*60*60*24*7));

    let [mode, SetMode] = useState("lecture");
    // mainWeek
    let mainContainer;
    let mainTitle = <div className={styles.mainTitle}>
        ????????? ??????
    </div>
    let mainLectureContainer;
    let mainLectures = [];
    for (let i=0; i < lectureListFromDB[thisWeek-1].length; i++)
    {
        let lecture = 
        <a target="_blank" href={`/LectureViewPage?lectureId=${lectureListFromDB[thisWeek-1][i][3]}&lectureResourceId=${lectureListFromDB[thisWeek-1][i][2]}`} rel="noopener noreferrer"> 
            {lectureListFromDB[thisWeek-1][i][0]}
        </a>
        // let lecture = <Link
        //     href={{
        //         pathname:"/LectureViewPage",
        //         query:{
        //             lectureId: lectureListFromDB[thisWeek-1][i][3],
        //             lectureResourceId: lectureListFromDB[thisWeek-1][i][2]
        //         }
        // }}>

        // <a>
        //     {lectureListFromDB[thisWeek-1][i][0]}
        // </a>
        //</Link>
        mainLectures.push(lecture);
    }
    mainLectureContainer = <div className={styles.lectureContainer}>
        {mainLectures}
    </div>
    let mainDescription = <div className={styles.description}>
        <div className={styles.title}>{thisWeek}??????</div>
        <div className={styles.lectures}>
            {mainLectureContainer}
        </div>
    </div>

    mainContainer = <div className={styles.container}>
        {mainTitle}
        {mainDescription}
    </div>;
    
    // Attendance
    let attendanceContainer;
    let attendanceTitle = <div className={styles.attendTitle}>
        ?????? ??????
    </div>
    let attendanceComponents = []
    for (let i=0; i<16; i++)
    {
        let attendanceComponent;
        let className = "btn-circle btn-sm fas"
        if (attendanceStatusFromDB[i] == 0) {
            className += " btn-primary";
        } else if (attendanceStatusFromDB[i] == 1) {
            className += " btn-success fa-check";
        } else if (attendanceStatusFromDB[i] == 2) {
            className += " btn-danger";
        } else {
            className += " btn-warning fa-exclamation-triangle";
        }
        attendanceComponent = <div className={styles.attendanceComponent}>
            <div className={className}
                style={{
                    backgroundColor: attendanceStatusFromDB[i]==0?"rgba(0,0,0,0)":
                                    attendanceStatusFromDB[i]==1?"#2276FC":
                                    attendanceStatusFromDB[i]==2?"#7B8CA8":"#F03E2F"
                }}
            />
        </div>

        attendanceComponents.push(attendanceComponent);
    }
    let attendanceStatus = <div className={styles.attendStatus}>
        {attendanceComponents}
    </div>

    attendanceContainer = <div className={styles.attendanceContainer}>
        {attendanceTitle}
        {attendanceStatus}
    </div>

    // Lecture List
    let lecturesContainer;
    let lectures = [];

    for(let week=0; week < lectureListFromDB.length; week++)
    {
        let weekLecture;
        let lectureListContainer;
        let lectureList = [];
        let title = <div className={styles.title}>{(week+1)+"??????"}</div>;

        for(let i=0; i<lectureListFromDB[week].length; i++)
        {
            let lecture = 
                <a target="_blank" href={`/LectureViewPage?lectureId=${lectureListFromDB[week][i][3]}&lectureResourceId=${lectureListFromDB[week][i][2]}`} rel="noopener noreferrer"> 
                    {lectureListFromDB[week][i][0]}
                </a>

            //let lecture = <a href={lectureListFromDB[week][i][1]}>
            //    {lectureListFromDB[week][i][0]}</a>
            lectureList.push(lecture);
        }
        lectureListContainer = <div className={styles.video}>
            {lectureList}
        </div>;

        weekLecture = <div className={styles.lecture}>
            {title}
            {lectureListContainer}
        </div>
        lectures.push(weekLecture);
    }
    lecturesContainer = <div className={styles.lecturesContainer}>
        {lectures}
    </div>

    // bookmark

    let bookmarkContainer;
    let bookmarkComponents = [];

    if (bookmarks.length == 0)
    {
        let emptyComponent = <div className={styles.noBookmark}>???????????? ????????????.</div>;
        bookmarkComponents.push(emptyComponent);
    }
    for (let i=0; i<bookmarks.length; i++)
    {
        let bookmarkComponent;
        let bookmarkTitle = bookmarks[i]["title"];
        let bookmarkDescription = bookmarks[i]["content"];

        bookmarkComponent = <div className={styles.bookmarkComponent}>
            <div className={styles.bookmarkWrapper}>
                <div className={styles.bookmarkTitle}>{bookmarkTitle}</div>
                <a href="#" className={styles.bookmarkDeleteBtn}
                    onClick={function(e){
                        e.preventDefault();
                        let deletedBookmark = deleteBookmarkFromDB(bookmarks, bookmarks[i]['bookmarkId']);
                        setBookmarks(deletedBookmark);
                    }.bind(this)}
                >Delete</a>
            </div>
            <div className={styles.bookmarkDescription}>{bookmarkDescription}</div>
        </div>

        bookmarkComponents.push(bookmarkComponent);
    }

    bookmarkContainer = <div className={styles.bookmarkContainer}>
        {bookmarkComponents}
    </div>;
    // Lecture Page

    let Page;
    if (mode === "lecture")
    {
        Page =
        <>
            <OutlineComponent title="?????? ??????" button="?????????" 
                modeToggle={function(){
                    SetMode(mode==="lecture"?"bookmark":"lecture");
                }.bind(this)}
            />
            {mainContainer}
            {attendanceContainer}
            {lecturesContainer}
        </>;
    }
    else if (mode === "bookmark")
    {
        Page =
        <>
            <OutlineComponent title="?????????" button="?????? ??????" 
                modeToggle={function(){
                    SetMode(mode==="lecture"?"bookmark":"lecture");
                }.bind(this)}
            />
            {bookmarkContainer}
        </>;
    }
    return (
        <ContainerComponent content={Page}/>
    );
}

export default LectureComponent;