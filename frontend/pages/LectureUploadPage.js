import LectureUploadComponent from "../components/LectureUploadPage/LectureUploadComponent.js";
import Layout from "../components/Layout.js";
import { css, jsx }from '@emotion/react';

export default function LectureUploadPage()
{
    return (
        <Layout>
            <LectureUploadComponent></LectureUploadComponent>
        </Layout>
    );
}