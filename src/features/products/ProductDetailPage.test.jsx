// src/features/products/ProductDetailPage.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductDetailPage from './ProductDetailPage'

describe('ProductDetailPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 1,
            title: 'Test Product',
            price: 20,
            description: 'A great product',
            image: 'test.jpg',
            category: 'electronics', 
          }),
      })
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('renders product details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    // صبر برای نمایش بعد از fetch
    const title = await screen.findByText(/test product/i)
    expect(title).toBeInTheDocument()
    expect(screen.getByText(/\$20/i)).toBeInTheDocument()
    expect(screen.getByText(/a great product/i)).toBeInTheDocument()
  })
})
