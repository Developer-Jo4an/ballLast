const TextInput = ({ id, label, defaultValue, register }) => {
  return (
    <label className={ 'text-label' } htmlFor={ id }>
      { label }
      <input
        id={ id }
        type={ 'text' }
        defaultValue={ defaultValue }
        className={ 'text-input' }
        {...register}
      />
    </label>
  )
}

export default TextInput
