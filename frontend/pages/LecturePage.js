import LectureComponent from "../components/LecturePage/LectureComponent.js";
import {useRouter} from 'next/router';

export default function LecturePage()
{
    const router = useRouter();
    return (
        <>
        {/* <Header></Header> */}
        <LectureComponent 
            userID={router.query["id"]}
            subject={router.query["subject"]}
        />
        {/* <Footer></Footer> */}
        </>
    );
}