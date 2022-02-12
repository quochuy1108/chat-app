import { InputGroup } from './input-group.js';
class CreateConversationModal {
    $container
    $form
    $input
    $btnCreate
    $btnCancel

    constructor() {
        this.$container = document.createElement('div');
        this.$container.style.display = 'none';
        this.$container.classList.add('modal-container')


        this.$form = document.createElement('form');
        this.$form.addEventListener('submit', this.handleSubmit)

        this.$input = new InputGroup('text', 'Conversation Name', 'text')


        this.$btnCreate = document.createElement('button')
        this.$btnCreate.classList.add('btn', 'btn-primary')
        this.$btnCreate.type = 'submit;'
        this.$btnCreate.innerHTML = 'Create'

        this.$btnCancel = document.createElement('button')
        this.$btnCancel.classList.add('btn', 'btn-secondary')
        this.$btnCancel.type = 'button';
        this.$btnCancel.innerHTML = 'Cancel'
        this.$btnCancel.addEventListener('click', this.handleCancel)
    }

    handleSubmit = (e) => {
        console.log(this.$input.value);
        e.preventDefault()

        db.collection('conversations')
            .add({
                name: this.$input.value,
                createdBy: firebase.auth().currentUser.email,
                users: [firebase.auth().currentUser.email],
            })
            .then(() => {
                this.setVisible(false)
            })


    }
    handleCancel = () => {
        this.setVisible(false)
    }

    setVisible(visible) {
        if (visible) {
            this.$container.style.display = 'flex'
        } else {
            this.$container.style.display = 'none'
        }
    }

    render() {
        const modalContent = document.createElement('div')
        modalContent.classList.add('modal-content')

        this.$form.appendChild(this.$input.render())

        const footer = document.createElement('div')
        footer.classList.add('modalFooter')
        footer.appendChild(this.$btnCancel)
        footer.appendChild(this.$btnCreate)
        this.$form.appendChild(footer)

        modalContent.appendChild(this.$form)
        this.$container.appendChild(modalContent)

        return this.$container
    }
}

export { CreateConversationModal }