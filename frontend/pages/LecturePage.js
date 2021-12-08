import LectureComponent from "../components/LecturePage/LectureComponent.js";
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import { css, jsx }from '@emotion/react';

import Link from 'next/link';
import { useEffect, useState } from "react";
import { API } from "../utils/api.js";
import { decode, getToken } from '../utils/token';
import { getBookmarkByLectureId, getMainData } from "../utils/api-tools.js";
import { getLectureDetail } from "../utils/api-tools.js";

// function getLectureID(map, subject)
// {
//     //console.log("map: "+map[0][0]);
//     console.log("subject: "+subject);
//     for (let i=0; i<map.length; i++)
//         if (Object.values(map[i])[1] == subject)
//             return Object.values(map[i])[0];
// }

function create2DArray(row, column)
{
    var arr = new Array(row);
    for (let i=0;i<row;i++)
        arr[i] = new Array(column);
    return arr;
}

function getLectureID(subject)
{
    // for (let i=0; i<map.length; i++)
    //     if (Object.values(map[i])[1] == subject)
    //         return Object.values(map[i])[0];
    if (subject == "인공지능")
        return 1;
    else if (subject == "소프트웨어응용")
        return 2;
    else if (subject == "선형대수")
        return 3;  
}

 function getLectureList(lectureInfo)
{
    //console.log("lectureInfo: " + Object.keys(lectureInfo[0]));
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

function getAttendanceList(attendInfo)
{
    let totalAttendaceCount = attendInfo.lenth;
    let attendStateIdx = 2;
    let attendList = [];
    for (let i=0;i<totalAttendaceCount;i++)
    {
        let attend = Object.values(attendInfo[i])[attendStateIdx];
        if (attend == 'O')
            attendList.push(1);
        else
            attendList.push(3);
    }
}

export default function LecturePage()
{
    const router = useRouter();
    let subject = router.query["subject"];
    const [lectureDetail, setLectureDetail] = useState();
    const [bookmark, setBookmark] = useState();
    const [lectureID, setLectureID] = useState();
    const id = getLectureID(subject);

    useEffect(() => {
        if(!window) return;
        // getMainData()
        // .then((res) => {
        //     const id = getLectureID(res, subject);
        //     setLectureID(id);//getLectureID(res, subject));
        // });
        getLectureDetail(id)
        .then((res) => {
            setLectureDetail(res);
        });
        getBookmarkByLectureId(id)
        .then((res) => {
            setBookmark(res);
        });
    }, []);
    return (
        <Layout>
            <LectureComponent
                lectureDetail={lectureDetail}
                bookmark={bookmark}
                //subject={subject}
                //lectureList={lectureList}//getLectureListFromDB(subject)}
                //attendanceStatus={getAttendanceStatusFromDB(subject)}
                //bookmark={getBookmarkFromDB(subject)}
            />
        </Layout>
    );
}