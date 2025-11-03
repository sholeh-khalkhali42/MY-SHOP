// src/components/privateRoute.test.jsx
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import PrivateRoute from './privateRoute'

// Dummy auth reducer for testing
const authReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case 'auth/login':
      return { token: 'fake-token' }
    case 'auth/logout':
      return { token: null }
    default:
      return state
  }
}

describe('PrivateRoute', () => {
  const renderWithStore = (preloadedState, initialPath = '/protected') => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState,
    })

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <PrivateRoute>
                  <div>Protected Content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  test('renders protected content when user is authenticated', () => {
    renderWithStore({ auth: { token: 'valid-token' } })
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  test('redirects to /login when user is not authenticated', () => {
    renderWithStore({ auth: { token: null } })
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })
})
