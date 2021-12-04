import styles from "../../styles/OutlineComponent.module.css";

export default function OutlineComponent(props)
{
    return (
        <div className={styles.outline}>
            <p>{props.title}</p>
            <a href="#" onClick={function(e){
                e.preventDefault();
                props.modeToggle();
            }.bind(this)}>{props.button}</a>
        </div>
    );
}