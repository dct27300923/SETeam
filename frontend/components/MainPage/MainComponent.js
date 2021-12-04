import React from 'react';
import styles from "../../styles/MainComponent.module.css";
import ContainerComponent from "../ContainerComponent.js"
import Link from 'next/link';

function MainComponent(props)
{
    let lectureList = [];

    for (let i = 0; i < props.lectureInfo.length; i++)
    {
        let name = <p className="subjectName">{props.lectureInfo[i]["과목"]}</p>;
        let status = <div className={styles.status}>
            <div className={styles.watched}>
                <p>수강</p>
                <div className={styles.circle} style={
                    {
                        backgroundColor: props.lectureInfo[i]["수강"]==0?"red":(props.lectureInfo[i]["수강"]==1?"grey":"blue")
                    }
                }></div>
            </div>
            <div className={styles.assignment}>
                <p>과제</p>
                <div className={styles.circle} style={
                    {
                        backgroundColor: props.lectureInfo[i]["과제"]==0?"red":props.lectureInfo[i]["과제"]==1?"grey":"blue"
                    }
                }></div>
            </div>
        </div>
        let content = 
        <Link
            href={{
                pathname: '/LecturePage',
                query: {
                    id: props.userID,
                    subject: props.lectureInfo[i]["과목"]
                }
            }}
        >
            <a>
                <div className={styles.content}>
                    {name}
                    {status}
                </div>
            </a>
        </Link>
        lectureList.push(content)
    }

    let mainPage = 
    <>
        <p style={{
            padding: "20px 0px"
        }}>수강 과목</p>
        <div className={styles.lectureList}>
            {lectureList}
        </div>
    </>;
    return (
        <ContainerComponent content={mainPage} />
    );
}

export default MainComponent;