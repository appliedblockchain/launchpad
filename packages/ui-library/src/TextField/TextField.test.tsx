import './TextField.css'

import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import TextField from './TextField'

describe('TextField', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = render(<TextField />)
  })

  test('renders the TextField component successfully.', () => {
    expect(wrapper).toBeTruthy()
  })

  test('checking event passed value to TextField Component.', () => {
    fireEvent.change(wrapper.getByTestId('input'), {target: {value: 'testing'}});
    expect(wrapper.getByTestId('input').value).toBe('testing')
  })
})
