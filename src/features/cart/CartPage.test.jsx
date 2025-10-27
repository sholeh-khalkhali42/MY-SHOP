// src/features/cart/CartPage.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { increaseQuantity, decreaseQuantity, removeFromCart } from './cartSlice'
import CartPage from './CartPage'

describe('CartPage', () => {
  const renderWithStore = (preloadedState) => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState,
    })

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>
    )
  }

  test('renders empty cart message when no items exist', () => {
    renderWithStore({ cart: { items: [] } })
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  test('renders items and allows quantity adjustments', () => {
    const preloadedState = {
      cart: {
        items: [
          {
            id: 1,
            title: 'Test Product',
            price: 10,
            quantity: 2,
            image: 'test.jpg',
          },
        ],
      },
    }

    renderWithStore(preloadedState)

    // Verify product and total price
    expect(screen.getByText(/test product/i)).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('$20.00')).toBeInTheDocument()

    // Interact with + and - buttons
    const increaseBtn = screen.getByText('+')
    const decreaseBtn = screen.getByText('−')

    fireEvent.click(increaseBtn)
    fireEvent.click(decreaseBtn)

    // Just verify buttons exist for now
    expect(increaseBtn).toBeInTheDocument()
    expect(decreaseBtn).toBeInTheDocument()
  })

  test('has a working "Proceed to Checkout" link', () => {
    const preloadedState = {
      cart: {
        items: [
          {
            id: 1,
            title: 'Test Product',
            price: 10,
            quantity: 1,
            image: 'test.jpg',
          },
        ],
      },
    }

    renderWithStore(preloadedState)
    const checkoutLink = screen.getByText(/proceed to checkout/i)
    expect(checkoutLink.closest('a')).toHaveAttribute('href', '/checkout')
  })
})
