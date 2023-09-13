import { screen } from '@testing-library/react'
import App from './App'
import { renderWithProviders } from './test/utils'

test('renders learn react link', () => {
  renderWithProviders(<App />)
  const linkElements = screen.getAllByText(/login/i)
  expect(linkElements.length).toBeGreaterThan(0)
})
