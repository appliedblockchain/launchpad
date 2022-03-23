import './TextField.css'

import React from 'react'

interface Props {
  label: string
  error?: string
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & Props | any

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { label, error, ...inputProps } = props
    return (
      <div className='form-control'>
        <input ref={ref} placeholder={label} {...inputProps} />
        {error && <span> {error}</span>}
      </div>
    )
  }
)

export default TextField
