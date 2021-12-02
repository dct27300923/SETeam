import styles from "../styles/ContainerComponent.module.css";


export default function ContainerComponent(props)
{
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {props.content}
            </div>
        </section>
    );
}