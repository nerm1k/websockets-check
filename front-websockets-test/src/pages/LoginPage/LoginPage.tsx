import { FormEvent, SyntheticEvent, useState } from 'react';
import SigningButton from '../../components/SigningButton/SigningButton';
import SigningInput from '../../components/SigningInput/SigningInput';
import styles from './LoginPage.module.scss';
import { isValidPassword, isValidUsername } from '../../utils/validations';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
    username: string,
    password: string
}

interface ResponseData {
    message: string,
    jwtToken: string
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState<LoginForm>({
        username: '',
        password: ''
    })

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setLoginInfo({
            ...loginInfo, 
            [target.name]: target.value
        });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!isValidUsername(loginInfo.username) || !isValidPassword(loginInfo.password)) {
            return;
        }

        async function loginUser() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
                });

                if (res.status === 200) {
                    const data = await res.json() as ResponseData;
                    if (!data.jwtToken) {
                        console.log("jwt is empty");
                    } else {
                        localStorage.setItem('jwt_token', data.jwtToken);
                        const decodedJwtToken = jwtDecode(data.jwtToken);
                        localStorage.setItem('decoded_jwt_token', JSON.stringify(decodedJwtToken));
                        navigate('/');
                    }

                }
            } catch (error) {
                console.log(error);
            }
        }

        loginUser();
    }

    return (
        <div className={styles.container}>
            <form className={styles.login} onSubmit={handleSubmit}>
                <p className={styles.login__title}>Вход</p>
                <div className={styles.login__input}>
                    <p className={styles.input__title}>Логин</p>
                    <SigningInput type='text' name='username' id='username' placeholder='Логин' value={loginInfo.username} onChange={handleChange}/>
                </div>
                <div className={styles.login__input}>
                    <p className={styles.input__title}>Пароль</p>
                    <SigningInput type='password' name='password' id='password' placeholder='Пароль' value={loginInfo.password} onChange={handleChange}/>
                </div>
                <div className={styles.login__button}>
                    <SigningButton type='submit' text='Войти'/>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;