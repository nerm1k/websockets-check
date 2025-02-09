import styles from './SendMessageButton.module.scss';

interface Props {
    onClick: () => void
}

const SendMessageButton = ({onClick}: Props) => {
    return (
        <button className={styles.button} onClick={onClick}>Отправить</button>
    )
}

export default SendMessageButton;