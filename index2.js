import { Register } from './components2/register.js';
import { Login } from './components2/login.js';
import { setScreen } from './app.js';
import { Chat } from './components2/chat.js'

const app = document.getElementById('app');
// const login = new Login()
// setScreen(login);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const chat = new Chat()
        setScreen(chat);
    } else {
        const register = new Register()
        setScreen(register);
    }
})
