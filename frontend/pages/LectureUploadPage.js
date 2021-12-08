import LectureUploadComponent from "../components/LectureUploadPage/LectureUploadComponent.js";
import Layout from "../components/Layout.js";
import { useRouter } from  'next/router';
import { css, jsx }from '@emotion/react';
import { useEffect } from "react";
import { validate } from '../utils/token';

export default function LectureUploadPage()
{
    const router = useRouter();
    useEffect(() => {
        if(!validate()) {
            router.push("/login");
            return;
        }      
    }, []);
    return (
        <Layout>
            <LectureUploadComponent></LectureUploadComponent>
        </Layout>
    );
}