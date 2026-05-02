/**
 * localAuthService.js
 * Handles user registration and login using localStorage as the data store.
 * No json-server or backend required — perfect for a self-contained demo/capstone.
 */

const USERS_KEY = 'ecocart_users'

/** Read all registered users from localStorage */
const getUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Persist users array back to localStorage */
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string }} userData
 * @returns {{ id: string, name: string, email: string, createdAt: string }}
 * @throws {Error} if the email is already taken
 */
export const localRegister = ({ name, email, password }) => {
  const users = getUsers()

  const emailExists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  if (emailExists) {
    throw new Error('An account with this email already exists. Please login instead.')
  }

  const newUser = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // stored locally only; never sent to a server
    createdAt: new Date().toISOString(),
  }

  saveUsers([...users, newUser])

  // Return a safe copy without the password
  const { password: _pwd, ...safeUser } = newUser
  return safeUser
}

/**
 * Login an existing user.
 * @param {{ email: string, password: string }} credentials
 * @returns {{ id: string, name: string, email: string, createdAt: string }}
 * @throws {Error} if email not found or password is wrong
 */
export const localLogin = ({ email, password }) => {
  const users = getUsers()

  const matched = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  )

  if (!matched) {
    throw new Error('No account found with this email. Please register first.')
  }

  if (matched.password !== password) {
    throw new Error('Incorrect password. Please try again.')
  }

  // Return a safe copy without the password
  const { password: _pwd, ...safeUser } = matched
  return safeUser
}
