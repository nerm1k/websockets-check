import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { SyntheticEvent, useState } from 'react';

const Header = () => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const [isColorPickerActive, setIsColorPickerActive] = useState<boolean>(false);
    const [colorValue, setColorValue] = useState(() => {
        const token = localStorage.getItem("decoded_jwt_token");
        return token ? JSON.parse(token).color : "#c7c7c7";
    });

    function toggleColorPicker() {
        setIsColorPickerActive(!isColorPickerActive);
    }

    function handleColorPicker(e: SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        setColorValue(target.value);
    }

    function saveColorValue() {
        toggleColorPicker();

        let isNeededToChangeColor = true;
        const decodedJwtToken = localStorage.getItem("decoded_jwt_token");
        if (decodedJwtToken) {
            const parsedDecodedJwtToken = JSON.parse(decodedJwtToken);
            isNeededToChangeColor = parsedDecodedJwtToken.color == colorValue ? false : true;
            parsedDecodedJwtToken.color = colorValue;
            localStorage.setItem("decoded_jwt_token", JSON.stringify(parsedDecodedJwtToken));
        }

        if (isNeededToChangeColor) {   
            const colorData = {
                color: colorValue
            };
            async function saveUserColor() {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${authenticatedUser.id}/color`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                        },
                        body: JSON.stringify(colorData)
                    });
    
                    if (res.status == 204) {
                        console.log('color +');
                    } else {
                        console.log('color -')
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    
            saveUserColor();
        } else {
            return;
        }
        
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__logo}>
                    WebSockets
                </div>
                <nav className={styles.header__nav}>
                    {!isAuthenticated && (
                        <ul>
                            <li>
                                <Link to='/login'>
                                    Войти
                                </Link>
                            </li>
                            <li>
                                <Link to='/signup'>
                                    Регистрация
                                </Link>
                            </li>
                        </ul>
                    )}
                    {isAuthenticated && (
                        <ul>
                            {isColorPickerActive && (
                                <input type='color' onChange={handleColorPicker} value={colorValue} onBlur={saveColorValue}></input>
                            )}
                            <li onClick={toggleColorPicker}>
                                {authenticatedUser.username}
                            </li>
                            <li>
                                <Link to='/logout'>
                                    Выход
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header;