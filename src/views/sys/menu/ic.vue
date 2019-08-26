<!-- 图标显示-->
<script>
export default {
  name: 'Ic',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon } = context.props
    const vnodes = []
    if(icon !== undefined && icon !== '' && icon !== null){
      let arr = icon.split('\|')
      if (arr[0] === 'i') {
        vnodes.push(<i class={arr[1]}/>)
      } else {
        vnodes.push(<svg-icon icon-class={arr[1]}/>)
      }
    }
    return vnodes
  }
}
</script>
