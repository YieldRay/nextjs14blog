import clsx from "clsx"
import styles from "./FancyButton.module.css"

export default function FancyButton({ children, active, onClick }: any) {
    // MIT LICENSE
    // https://uiverse.io/alexmaracinaru/brown-bobcat-65
    return (
        <button
            className={clsx(styles.cta, active && styles.active)}
            onClick={onClick}
        >
            <span>{children}</span>
        </button>
    )
}
