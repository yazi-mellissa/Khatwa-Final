import axios from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}`

// Register user
export const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
export const login = async (userData,role) => {
      const response = await axios.post(API_URL + `/${role}/login`, userData)
      console.log('hhh')
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
}

// Logout user
export const logout = () => {
  localStorage.removeItem('user')
  console.log('logout')
}

const authService = {
  register,
  logout,
  login,
}

export default authService