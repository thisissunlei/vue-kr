export default function hoc(container) {
    return {
        name: 'hoc',
        props: {
            ...container.props
        },
        components: {
            container
        },
        methods: {
            handleChange(data) {
                this.$emit('change', data)
            },
            handleClick(data){
                this.$emit('click', data)
            },
            handleBlur(data) {
                this.$emit('blur', data)
            },
            handleDblclick(data) {
                this.$emit('dblclick', data)
            },
            handleFocus(data) {
                this.$emit('focus', data)
            },
            handleMousedown(data) {
                this.$emit('mousedown', data)
            },

        },
        render(h) {
          
            const data = {
                props: this.$props
            }
            
            return (
                <div>
                    <container 
                        onClick={this.handleClick} 
                        onChange={this.handleChange} 
                        onBlur = {this.handleBlur}
                        onDblclick={this.handleDblclick}
                        onFocus={this.handleFocus}
                        onMousedown={this.handleMousedown}
                        {...data} 
                    />
                </div>
            )
        }
    }
}