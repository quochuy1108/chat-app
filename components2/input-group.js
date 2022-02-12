class InputGroup {
    $container
    $label
    $input

    constructor(type, label, name) {
        this.$container = document.createElement('div');
        this.$container.classList.add('input-group')

        this.$label = document.createElement('label');
        this.$label.innerHTML = label;
        this.$label.style.witdh = '100%'

        this.$input = document.createElement('input');
        this.$input.type = type
        this.$input.name = name


        this.$errorMsg = document.createElement('div');
        this.$errorMsg.classList.add('errorMsg')
    }

    getInputValue() {
        return this.$input.value
    }

    setError(message) {
        if (message) {
            this.$errorMsg.innerHTML = message;
            this.$container.classList.add('has-error')
        } else {
            this.$errorMsg.innerHTML = '';
            this.$container.classList.remove('has-error')
        }
    }

    blurErrorInput = (message) => {
        if (message) {
            this.$errorMsg.innerHTML = message;
            this.$container.classList.add('has-error')
        } else {
            this.$errorMsg.innerHTML = '';
            this.$container.classList.remove('has-error')
        }
    }

    render() {
        this.$label.appendChild(this.$input);
        this.$container.appendChild(this.$label);
        this.$container.appendChild(this.$errorMsg)
        return this.$container
    }
}

export { InputGroup };