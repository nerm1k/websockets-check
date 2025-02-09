import { SyntheticEvent } from 'react';
import styles from './Textarea.module.scss';

interface Props {
    value: string,
    onChange: (e: SyntheticEvent) => void
}

const Textarea = ({value, onChange}: Props) => {
    return (
        <textarea className={styles.textarea} value={value} onChange={onChange}></textarea>
    )
}

export default Textarea;