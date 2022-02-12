class TitleBar {
    $container
    $txtName
    $btnLogout
    $btnShowSideBar

    setSidebarVisible;

    constructor(setSidebarVisible) {
        this.setSidebarVisible = setSidebarVisible
        this.$container = document.createElement('div');
        this.$container.classList.add('title-bar');

        this.$txtName = document.createElement('div')
        this.$btnShowSideBar = document.createElement('div')
        this.$btnShowSideBar.innerHTML = '📗'
        this.$btnShowSideBar.classList.add('btn-show-sidebar')
        this.$btnShowSideBar.addEventListener('click', this.showSidebar)


        this.$btnLogout = document.createElement('button')
        this.$btnLogout.classList.add('btn', 'btn-secondary')
        this.$btnLogout.innerHTML = 'Logout';
        this.$btnLogout.addEventListener('click', this.handleLogout)
    }

    showSidebar = () => {
        console.log('a');
        this.setSidebarVisible(true)
    }

    handleLogout() {
        firebase.auth().signOut();
    }

    setName(name) {
        this.$txtName.innerHTML = name
    }
    render() {

        const title = document.createElement('div')
        title.classList.add('flex')
        title.appendChild(this.$btnShowSideBar)
        title.appendChild(this.$txtName)

        this.$container.appendChild(title)
        this.$container.appendChild(this.$btnLogout)
        return this.$container
    }
}
export { TitleBar }