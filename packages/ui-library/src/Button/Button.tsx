import React from 'react'
import './Button.css'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
  return <button {...props} />
}
export default Button 
