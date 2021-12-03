import Header from "../Header.js"
import Footer from "../Footer.js"
import OutlineComponent from "./OutlineComponent.js";
import ContainerComponent from "../ContainerComponent.js";
import styles from "../../styles/LectureComponent.module.css";
import {useState} from 'react';

function getLectureListFromDB(userID, subject)
{
    return [
        [
            ["강의1", "https://naver.com"],
            ["강의2", "https://youtube.com"]
        ],
        [
            ["강의1", "https://naver.com"],
            ["강의2", "https://youtube.com"]
        ],
        [
            ["강의1", "https://naver.com"],
            ["강의2", "https://youtube.com"]
        ],
        [
            ["강의1", "https://naver.com"],
            ["강의2", "https://youtube.com"]
        ],
    ];
}

function getAttendanceStatusFromDB(userID, subject)
{
    // 0: None, 1: 출석, 2: 지각, 3: 결석
    return [1,1,2,1,3,1,1,1,2,1,1,1,0,0,0,0];
}

function getBookmarkFromDB(userID, subject)
{
    return [
        {
            "title": "title1...",
            "description": "description1..."
        },
        {
            "title": "title2...",
            "description": "description2..."
        },
        {
            "title": "title3...",
            "description": "description3..."
        },
    ]
}

// TODO: userID, subject, title로 데이터베이스 접근해서 삭제하기.
//      currentBookmark 인자로 받는거 없애기.
function deleteBookmarkFromDB(userID, subject, currentBookmark,title)
{
    /*
        일단 데이터베이스에서 삭제.
        return getBookmarkFromDB(userID,subject);
    */
    // let currentBookmark = getBookmarkFromDB(userID, subject);
    currentBookmark = currentBookmark.slice();
    for (let i=0; i < currentBookmark.length; i++)
    {
        if (currentBookmark[i]["title"] == title)
        {
            currentBookmark.splice(i,1);
            break;
        }
    }
    return currentBookmark;
}

function LectureComponent(props)
{
    const lectureListFromDB = getLectureListFromDB(props.userID, props.subject);
    const attendanceStatusFromDB = getAttendanceStatusFromDB(props.userID, props.subject);
    let [bookmarks, setBookmarks] = useState(getBookmarkFromDB(props.userID, props.subject));
    let [mode, SetMode] = useState("lecture");
    // mainWeek
    let mainContainer;
    let mainTitle = <div className={styles.mainTitle}>
        <p>이번주 강의</p>
    </div>
    let mainLectureContainer;
    let mainLectures = [];
    for (let i=0; i < lectureListFromDB[0].length; i++)
    {
        let lecture = <a href={lectureListFromDB[0][i][1]}>
            {lectureListFromDB[0][i][0]}</a>
        mainLectures.push(lecture);
    }
    mainLectureContainer = <div className={styles.lectureContainer}>
        {mainLectures}
    </div>
    let mainDescription = <div className={styles.description}>
        <div className={styles.title}>12주차</div>
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
        <p>출석 현황</p>
    </div>
    let attendanceComponents = []
    for (let i=0; i<16; i++)
    {
        let attendanceComponent;
        
        attendanceComponent = <div className={styles.attendanceComponent}>
            <div className={styles.circle}
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
        let title = <div className={styles.title}>{(week+1)+"주차"}</div>;

        for(let i=0; i<lectureListFromDB[week].length; i++)
        {
            let lecture = <a href={lectureListFromDB[week][i][1]}>
                {lectureListFromDB[week][i][0]}</a>
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
        let emptyComponent = <div className={styles.noBookmark}>아직 북마크가 없습니다.</div>;
        bookmarkComponents.push(emptyComponent);
    }
    for (let i=0; i<bookmarks.length; i++)
    {
        let bookmarkComponent;
        let bookmarkTitle = bookmarks[i]["title"];
        let bookmarkDescription = bookmarks[i]["description"];

        bookmarkComponent = <div className={styles.bookmarkComponent}>
            <div className={styles.bookmarkWrapper}>
                <div className={styles.bookmarkTitle}>{bookmarkTitle}</div>
                <a href="#" className={styles.bookmarkDeleteBtn}
                    onClick={function(e){
                        e.preventDefault();
                        let deletedBookmark = deleteBookmarkFromDB(props.userID,props.subject,bookmarks, bookmarkTitle);
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
            <OutlineComponent title="강의 개요" button="북마크" 
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
            <OutlineComponent title="북마크" button="강의 개요" 
                modeToggle={function(){
                    SetMode(mode==="lecture"?"bookmark":"lecture");
                }.bind(this)}
            />
            {bookmarkContainer}
        </>;
    }
    return (
        <>
            <Header></Header>
            <ContainerComponent content={Page}/>
            <Footer></Footer>
        </>
    );
}

export default LectureComponent;