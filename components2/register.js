import { InputGroup } from './input-group.js'
import { Login } from './login.js'
import { setScreen } from '../app.js'

class Register {
    $screenContainer
    $container

    $title

    $formRegister

    $inputGroupEmail
    $inputGroupDisplayName
    $inputGroupPassword
    $inputGroupConfirmPassword

    $feedbackMessage

    $button
    $linkToLogin

    constructor() {
        this.$screenContainer = document.createElement('div')
        this.$screenContainer.classList.add('register-screen')

        this.$container = document.createElement('div');
        // this.$container.style.witdh = '400px'
        // this.$container.style.margin = 'auto'
        this.$container.classList.add('card')

        this.$title = document.createElement('h1');
        this.$title.innerHTML = 'Register';

        this.$formRegister = document.createElement('form');
        this.$formRegister.addEventListener('submit', this.handleSubmit)

        this.$inputGroupEmail = new InputGroup('email', 'Email', 'email');
        this.$inputGroupEmail.$input.addEventListener('blur', this.blurErrorEmail)

        this.$inputGroupDisplayName = new InputGroup('text', 'Display Name', 'displayName');
        this.$inputGroupDisplayName.$input.addEventListener('blur', this.blurErrorDisplayName)

        this.$inputGroupPassword = new InputGroup('password', 'Password', 'password');
        this.$inputGroupPassword.$input.addEventListener('blur', this.blurErrorPassword)

        this.$inputGroupConfirmPassword = new InputGroup('password', 'Comfirm Password', 'comfirmPassword');
        this.$inputGroupConfirmPassword.$input.addEventListener('blur', this.blurErrorConfirmPassword)

        this.$feedbackMessage = document.createElement('div');

        this.$button = document.createElement('button');
        this.$button.innerHTML = 'Submit';
        this.$button.classList.add('btn', 'btn-primary')

        this.$linkToLogin = document.createElement('div');
        this.$linkToLogin.classList.add('btn', 'btn-link');
        this.$linkToLogin.innerHTML = '>>>>> Login <<<<<'
        this.$linkToLogin.addEventListener('click', this.moveToLogin)


    }

    moveToLogin = () => {
        const login = new Login();
        setScreen(login)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // register

        const email = this.$inputGroupEmail.getInputValue()
        const displayName = this.$inputGroupDisplayName.getInputValue()
        const password = this.$inputGroupPassword.getInputValue()
        const confirmPassword = this.$inputGroupConfirmPassword.getInputValue()

        this.$inputGroupEmail.setError();
        this.$inputGroupPassword.setError();
        this.$inputGroupConfirmPassword.setError();
        this.$inputGroupDisplayName.setError();

        if (!email) {
            this.$inputGroupEmail.setError('Email cannot be empty');

        }

        if (!displayName) {
            this.$inputGroupDisplayName.setError('Display name cannot be empty')
        }


        if (!password) {
            this.$inputGroupPassword.setError('Password cannot be empty')

        }

        else if (password.length < 6) {
            this.$inputGroupPassword.setError('Password must be 6 character')
        }

        if (!confirmPassword) {
            this.$inputGroupConfirmPassword.setError('Confirm Password cannot be empty')

        }

        if (password !== confirmPassword) {
            this.$inputGroupConfirmPassword.setError('Password and Comfirm Password must be match')
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.$feedbackMessage.innerHTML = 'Register successfully! please check your inbox'
                firebase.auth().currentUser.sendEmailVerification()

            })
            .catch((error) => {
                // this.$feedbackMessage.innerHTML = error.toString()
                console.log(error);
            });
    }


    // >>>>>>>>>>>>>>>>>>> Blur input <<<<<<<<<<<<<<<<<<<<<<

    blurErrorEmail = () => {
        const email = this.$inputGroupEmail.getInputValue()
        this.$inputGroupEmail.blurErrorInput();
        if (!email) {
            this.$inputGroupEmail.blurErrorInput('Email cannot be empty')
        }
    }

    blurErrorDisplayName = () => {
        const displayName = this.$inputGroupDisplayName.getInputValue()
        this.$inputGroupDisplayName.blurErrorInput();
        if (!displayName) {
            this.$inputGroupDisplayName.blurErrorInput('Display name cannot be empty')
        }
    }

    blurErrorPassword = () => {
        const password = this.$inputGroupPassword.getInputValue()
        this.$inputGroupPassword.blurErrorInput();
        if (!password) {
            this.$inputGroupPassword.blurErrorInput('Password cannot be empty')
        }
        else if (password.length < 6) {
            this.$inputGroupPassword.blurErrorInput('Password must be 6 character')

        }
    }

    blurErrorConfirmPassword = () => {
        const confirmPassword = this.$inputGroupConfirmPassword.getInputValue();
        const password = this.$inputGroupPassword.getInputValue()
        this.$inputGroupConfirmPassword.blurErrorInput();

        if (!confirmPassword) {
            this.$inputGroupConfirmPassword.blurErrorInput('ConfirmPassword cannot be empty')
        }
        else if (confirmPassword !== password) {
            this.$inputGroupConfirmPassword.blurErrorInput('Password and Comfirm Password must be match')

        }
    }




    render() {
        this.$formRegister.appendChild(this.$inputGroupEmail.render())
        this.$formRegister.appendChild(this.$inputGroupDisplayName.render())
        this.$formRegister.appendChild(this.$inputGroupPassword.render())
        this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render())
        this.$formRegister.appendChild(this.$button)

        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$feedbackMessage);
        this.$container.appendChild(this.$formRegister);
        this.$container.appendChild(this.$linkToLogin)

        this.$screenContainer.appendChild(this.$container)

        return this.$screenContainer
    }
}

export { Register };