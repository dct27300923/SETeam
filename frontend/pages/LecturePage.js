import LectureComponent from "../components/LecturePage/LectureComponent.js";
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import { css, jsx }from '@emotion/react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { API } from "../utils/api.js";
import { decode, getToken, validate } from '../utils/token';
import { getBookmarkByLectureId, getLectureResource, getMainData } from "../utils/api-tools.js";
import { getLectureDetail } from "../utils/api-tools.js";

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

export default function LecturePage()
{
    const router = useRouter();
    
    const [subject, setSubject] = useState(undefined);
    const [lectureDetail, setLectureDetail] = useState();
    const [bookmark, setBookmark] = useState();
    const id = getLectureID(subject);

    useEffect(() => {
        if(!validate()) {
            router.push("/login");
            return;
        }
        let subject = router.query["subject"];
        setSubject(subject);
        console.log()
        // subject is undefined or string
    }, [router]);

    useEffect(() => {
        if(!subject) return;

        getLectureDetail(id)
        .then((res) => {
            setLectureDetail(res);
        });
        getBookmarkByLectureId(id)
        .then((res) => {
            console.log("bookmark: "+res);
            setBookmark(res);
        });
    }, [subject]);
    
    return (
        <Layout>
            {subject !== undefined &&
            <LectureComponent
                lectureDetail={lectureDetail}
                bookmark={bookmark}
            />}
        </Layout>
    );
}