import MainComponent from "../components/MainPage/MainComponent.js";
import Layout from "../components/Layout";
import Link from 'next/link';
import { css, jsx }from '@emotion/react';

function getLectureInfoFromDB(userID)
{
    // 0 = Red, 1 = Gray, 2 = Blue
    return [
        {
            "과목": "데이터베이스",
            "수강": 0,
            "과제": 2
        },
        {
            "과목": "인공지능",
            "수강": 1,
            "과제": 2
        },
        {
            "과목": "소프트웨어응용",
            "수강": 2,
            "과제": 1
        },
        {
            "과목": "소프트웨어공학",
            "수강": 2,
            "과제": 2
        },
        {
            "과목": "임베디드시스템설계",
            "수강": 0,
            "과제": 1
        },
        {
            "과목": "네트워크보안",
            "수강": 2,
            "과제": 0
        },
    ];
}


export default function MainPage()
{
    return (
        <Layout>
            <MainComponent 
                userID="2017920055" 
                lectureInfo={getLectureInfoFromDB("2017920055")}/>
        </Layout>
    );
}