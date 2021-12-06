import LectureComponent from "../components/LecturePage/LectureComponent.js";
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import { css, jsx }from '@emotion/react';

import Link from 'next/link';
import { useEffect, useState } from "react";
import { API } from "../utils/api.js";
import { decode, getToken } from '../utils/token';
import { getLectureResource } from "../utils/api-tools.js";

function getLectureListFromDB(userID, subject)
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

export default function LecturePage()
{
    const router = useRouter();
    let id = router.query["id"];
    let subject = router.query["subject"];
    return (
        <Layout>
            <LectureComponent 
                userID={id}
                subject={subject}
                lectureList={getLectureListFromDB(id, subject)}
                attendanceStatus={getAttendanceStatusFromDB(id, subject)}
                bookmark={getBookmarkFromDB(id, subject)}
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