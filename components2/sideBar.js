import { CreateConversationModal } from "./createConversationModal.js"
import { ConversationItem } from './conversationItem.js'


class SideBar {
    $bgContainer
    $container;
    $btnCreateConversation;
    $conversationList;
    $createConversationModal;
    setActiveConversation
    updateActiveConversation
    activeConversation;
    $listConversationItem


    constructor(setActiveConversation, updateActiveConversation) {
        this.$bgContainer = document.createElement('div');
        this.$bgContainer.classList.add('sidebar-container')
        this.$bgContainer.addEventListener('click', () => {
            this.setBgContainerVisible(false)
        })

        this.$container = document.createElement('div');
        this.$container.classList.add('sideBar')


        this.$btnCreateConversation = document.createElement('button');
        this.$btnCreateConversation.classList.add('btn', 'btn-primary', 'btn-block')
        this.$btnCreateConversation.innerHTML = '+ New';
        this.$btnCreateConversation.addEventListener('click', this.handleCreateConversation)

        this.$createConversationModal = new CreateConversationModal()

        this.$conversationList = document.createElement('div')
        this.$conversationList.classList.add('conversation-list')

        this.setActiveConversation = setActiveConversation;
        this.updateActiveConversation = updateActiveConversation

        this.$listConversationItem = []

        db.collection('conversations').where('users', 'array-contains', firebase.auth().currentUser.email).onSnapshot(this.conservationListener)
        // console.log(this)
    }



    handleCreateConversation = () => {
        this.$createConversationModal.setVisible(true)
    }

    conservationListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            // console.log(change.type);
            const conversation = change.doc.data()
            const id = change.doc.id
            console.log(conversation)
            if (change.type === 'added') {
                const $conversationItem = new ConversationItem(
                    id,
                    conversation.name,
                    conversation.users,
                    this.setActiveConversation
                )

                this.$listConversationItem.push($conversationItem)

                this.$conversationList.appendChild($conversationItem.render())

            } else if (change.type === 'modified') {
                const modifyingConversation = this.$listConversationItem.find((item) => {
                    return item.id === id
                });
                modifyingConversation.updateData(conversation.name, conversation.users)
                if (id === this.activeConversation.id) {
                    // console.log(conversation);
                    this.updateActiveConversation(conversation.name, conversation.users)
                }
            } else if (change.type === 'removed') {
                console.log('deleted');
            }
        })
    }

    setConversation = (conversation) => {
        this.activeConversation = conversation
        this.$listConversationItem.forEach(item => {
            if (item.id === conversation.id) {
                item.setActive(true)
            } else {
                item.setActive(false)
            }
        })
    }

    setBgContainerVisible = (visible) => {
        if (visible) {
            this.$bgContainer.classList.add('visible')
        } else {
            this.$bgContainer.classList.remove('visible')

        }
    }

    render() {
        this.$container.appendChild(this.$btnCreateConversation)
        this.$container.appendChild(this.$conversationList)
        this.$container.appendChild(this.$createConversationModal.render())
        this.$bgContainer.appendChild(this.$container)

        return this.$bgContainer
    }
}

export { SideBar }