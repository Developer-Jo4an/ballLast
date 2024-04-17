const Button = ({ title, ...props }) => {
  return (
    <button {...props} className={'button'}>{ title }</button>
  )
}

export default Button
