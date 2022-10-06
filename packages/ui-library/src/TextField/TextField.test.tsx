import './TextField.css'

import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import TextField from './TextField'

describe('TextField Tests', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = render(<TextField data-testid="input"/>)
  })

  test('renders the TextField component successfully.', () => {
    expect(wrapper).toBeTruthy()
  })

  test('checking event passed value to TextField Component.', () => {
    fireEvent.change(wrapper.getByTestId('input'), {target: {value: 'testing'}});
    expect(wrapper.getByTestId('input').value).toBe('testing')
  })
})
