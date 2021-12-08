import MainComponent from "../components/MainPage/MainComponent.js";
import Layout from "../components/Layout";
import Link from 'next/link';
import { css, jsx }from '@emotion/react';
import { useEffect, useState } from "react";
import { API } from "../utils/api.js";
import { useRouter } from "next/router";
import { decode, getToken, validate } from '../utils/token';
import { getMainData } from "../utils/api-tools.js";

export default function MainPage()
{
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [lectureInfo, setLectureInfo] = useState([]);

    useEffect(() => {
        if(!window) return;

        if(!validate()) {
            router.push('/login');
            return;
        }
        getMainData()
        .then((res) => {
            setLectureInfo(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <Layout>
            <MainComponent 
                userID={userId} 
                lectureInfo={lectureInfo}/>
        </Layout>
    );
}