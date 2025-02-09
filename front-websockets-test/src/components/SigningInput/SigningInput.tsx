import { SyntheticEvent } from 'react';
import styles from './SigningInput.module.scss';

type Props = {
    type: string;
    name: string,
    id: string,
    placeholder: string;
    value: string;
    onChange: (e: SyntheticEvent) => void;
}

const SigningInput = ({type, name, id, placeholder, value, onChange}: Props) => {
    return (
        <input className={styles.input} type={type} name={name} id={id} placeholder={placeholder} value={value} onChange={onChange}/>
    )
}

export default SigningInput;