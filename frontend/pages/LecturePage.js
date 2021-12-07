import LectureComponent from "../components/LecturePage/LectureComponent.js";
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import { css, jsx }from '@emotion/react';

import Link from 'next/link';
import { useEffect, useState } from "react";
import { API } from "../utils/api.js";
import { decode, getToken } from '../utils/token';
import { getMainData } from "../utils/api-tools.js";
import { getLectureDetail } from "../utils/api-tools.js";

function getLectureListFromDB(subject)
{
    return [
        //1주차
        [
            ["강의1", "example.txt"],
            ["강의2", "example2.txt"]
        ],
        //2주차
        [
            ["강의3", "example.txt"],
            ["강의4", "example2.txt"]
        ],
        //3주차
        [
            ["강의5", "example.txt"],
            ["강의6", "example2.txt"]
        ],
        //4주차
        [
            ["강의7", "example.txt"],
            ["강의8", "example2.txt"]
        ],
    ];
}

function getAttendanceStatusFromDB(subject)
{
    // 0: None, 1: 출석, 2: 지각, 3: 결석
    return [1,1,2,1,3,1,1,1,2,1,1,1,0,0,0,0];
}

function getBookmarkFromDB(subject)
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

function getLectureID(map, subject)
{
    for (let i=0; i<map.length; i++)
        if (Object.values(map[i])[1] == subject)
            return Object.values(map[i])[0];
}

function create2DArray(row, column)
{
    var arr = new Array(row);
    for (let i=0;i<row;i++)
        arr[i] = new Array(column);
    return arr;
}

// function getLectureID(subject)
// {
//     // for (let i=0; i<map.length; i++)
//     //     if (Object.values(map[i])[1] == subject)
//     //         return Object.values(map[i])[0];
//     if (subject == "인공지능")
//         return 1;
//     else if (subject == "소프트웨어응용")
//         return 2;
//     else if (subject == "선형대수")
//         return 3;  
// }

function getLectureList(lectureInfo)
{
    console.log("lectureInfo: " + Object.keys(lectureInfo[0]));
    let lectureList = create2DArray(16,0);
    let totalLectureCount = lectureInfo.length;
    let weekIdx = 2;
    let titleIdx = 3;
    let urlIdx = 4;
    for (let i=0;i<totalLectureCount;i++)
    {
        let week = Object.values(lectureInfo[i])[weekIdx];
        let title = Object.values(lectureInfo[i])[titleIdx];
        let url = Object.values(lectureInfo[i])[urlIdx];
        lectureList[week-1].push([title,url]);
    }
    //console.log(lectureList);
    return lectureList;
}

export default function LecturePage()
{
    const router = useRouter();
    let subject = router.query["subject"];
    let [lectureMap, setLectureMap] = useState([]);
    let [lectureID, setLectureID] = useState(0);
    let [lectureList, setLectureList] = useState([]);


    // 강의 이름으로 lectureID 가져오기
    useEffect(() => {
        if(!window) return;
        getMainData()
        .then((res) => {
            let id = getLectureID(res, subject);
            setLectureID(id);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);
    // lectureID로 lectureDetail 가져오기
    useEffect(() => {
        if(!window) return;
        getLectureDetail(lectureID)
        .then((res) => {
            console.log(res);
            setLectureList(getLectureList(res[0]));
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <Layout>
            <LectureComponent 
                subject={subject}
                lectureList={lectureList}//getLectureListFromDB(subject)}
                attendanceStatus={getAttendanceStatusFromDB(subject)}
                bookmark={getBookmarkFromDB(subject)}
            />
        </Layout>
    );
}

// export default function LecturePage()
// {
//     const router = useRouter();
//     const [userId, setUserId] = useState('');
//     const [lectureInfo, setLectureInfo] = useState([]);
//     useEffect(() => {
//         if(!window) return;
//         const token = decode(getToken());
//         if(!token) {
//             alert("Forbidden Resource.");
//             router.push("/login");
//             return;
//         }
//         const { email, userId } = token;
//         if(userId) setUserId(userId);
//         new API().get(`/main/${userId}`)
//         .then((res) => {
//             //console.log(res);
//             setLectureInfo(res.result);
//             //alert(JSON.stringify(res.result));
//         })
//         .catch((err) => {
//             console.error(err);
//         })
//     }, []);

//     return (
//         <Layout>
//             <MainComponent 
//                 userID={userId} 
//                 lectureInfo={lectureInfo}/>
                    
//                 {/* getLectureInfoFromDB("2017920055")}/> */}
//         </Layout>
//     );
// }