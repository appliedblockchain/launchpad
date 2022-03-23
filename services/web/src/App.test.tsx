import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'

test('renders login page by default', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const linkElement = screen.getAllByText(/Login/i)
  expect(linkElement[0]).toBeInTheDocument()
  expect(linkElement[1]).toBeInTheDocument()
})
