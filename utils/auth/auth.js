export const isAuth = () => {
  const { authtoken } = document.cookie
  .split(';')
  .map(cookie => cookie.trim().split('='))
  .reduce((accumulator, [key, value]) => ({
    ...accumulator,
    [key]: value
  }), {})

  return authtoken
}
