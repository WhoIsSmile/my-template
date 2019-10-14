<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      let arr = icon.split('\|')
      if(arr.length>1){
        vnodes.push(<svg-icon icon-class={arr[1]}/>)
      }else{
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
      
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
