import { FormEvent, SyntheticEvent, useState } from 'react';
import SigningButton from '../../components/SigningButton/SigningButton';
import SigningInput from '../../components/SigningInput/SigningInput';
import styles from './SignUpPage.module.scss';
import { isValidEmail, isValidPassword, isValidUsername } from '../../utils/validations';
import { useNavigate } from 'react-router-dom';

interface SignUpForm {
    username: string,
    email: string,
    password: string
}

const SignUpPage = () => {
    const navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState<SignUpForm>({
        username: '',
        email: '',
        password: ''
    })

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setSignUpInfo({
            ...signUpInfo, 
            [target.name]: target.value
        });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!isValidUsername(signUpInfo.username) || !isValidEmail(signUpInfo.email) || !isValidPassword(signUpInfo.password)) {
            return;
        }

        async function registerUser() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signUpInfo)
                });
                if (res.status === 201) {
                    navigate('/login');
                } else if (res.status === 409) {
                    console.log('User already exist');
                }
            } catch (error) {
                console.log(error);
            }
        }

        registerUser();
        setSignUpInfo({username: '', email: '', password: ''});
    }

    return (
        <div className={styles.container}>
            <form className={styles.signup} onSubmit={handleSubmit}>
                <p className={styles.signup__title}>Регистрация</p>
                <div className={styles.signup__input}>
                    <p className={styles.input__title}>Логин</p>
                    <SigningInput type='text' name='username' id='username' placeholder='Логин' value={signUpInfo.username} onChange={handleChange}/>
                </div>
                <div className={styles.signup__input}>
                    <p className={styles.input__title}>Почта</p>
                    <SigningInput type='email' name='email' id='email' placeholder='Email' value={signUpInfo.email} onChange={handleChange}/>
                </div>
                <div className={styles.signup__input}>
                    <p className={styles.input__title}>Пароль</p>
                    <SigningInput type='password' name='password' id='password' placeholder='Пароль' value={signUpInfo.password} onChange={handleChange}/>
                </div>
                <div className={styles.signup__button}>
                    <SigningButton type='submit' text='Зарегистрироваться'/>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage;