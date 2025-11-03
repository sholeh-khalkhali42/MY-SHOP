// src/features/cart/CartPage.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import CartPage from './CartPage'
import { MemoryRouter } from 'react-router-dom'

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
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

describe('CartPage', () => {
  test('renders empty cart message when no items', () => {
    renderWithStore({ cart: { items: [] } })
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  test('renders items and allows quantity adjustments', () => {
    const preloadedState = {
      cart: {
        items: [{ id: 1, title: 'Test Product', price: 20, image: 'test.jpg', quantity: 1 }],
      },
    }

    renderWithStore(preloadedState)

    // چک نمایش محصول
    expect(screen.getByText(/test product/i)).toBeInTheDocument()
    expect(screen.getAllByText('$20.00').length).toBeGreaterThan(0)

    // چک افزایش تعداد
    const increaseBtn = screen.getByText('+')
    fireEvent.click(increaseBtn)
    expect(screen.getByText('2')).toBeInTheDocument()

    // چک کاهش تعداد
    const decreaseBtn = screen.getByText('−')
    fireEvent.click(decreaseBtn)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('has a working "Proceed to Checkout" link', () => {
    const preloadedState = {
      cart: {
        items: [{ id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 }],
      },
    }
    renderWithStore(preloadedState)
    const checkoutLink = screen.getByText(/proceed to checkout/i)
    expect(checkoutLink).toHaveAttribute('href', '/checkout')
  })
})
