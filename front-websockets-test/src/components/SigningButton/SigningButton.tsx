import styles from './SigningButton.module.scss';

interface Props {
    type: 'submit' | 'reset' | 'button';
    text: string;
}

const SigningButton = ({type, text}: Props) => {
    return (
        <button className={styles.button} type={type}>{text}</button>
    )
}

export default SigningButton;