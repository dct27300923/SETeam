import LectureComponent from "../components/LecturePage/LectureComponent.js";
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import { css, jsx }from '@emotion/react';

export default function LecturePage()
{
    const router = useRouter();
    return (
        <Layout>
            <LectureComponent 
                userID={router.query["id"]}
                subject={router.query["subject"]}
            />
        </Layout>
    );
}