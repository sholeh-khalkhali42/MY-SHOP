import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import PrivateRoute from './PrivateRoute'

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
  const renderWithStore = (preloadedState) => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState,
    })

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <PrivateRoute>
            <div>Protected Content</div>
          </PrivateRoute>
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

    // Since Navigate doesn't render visible text, check the history change
    // or check that protected content is NOT rendered.
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})

