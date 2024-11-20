import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    errorMessage ?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register ?: UseFormRegister<any>
    rules ?:  RegisterOptions
    classNameInput ?: string
    classNameError ?: string
}

const Input = (
                { type, 
                  errorMessage, 
                  placeholder, 
                  className, 
                  name, 
                  register, 
                  rules, 
                  classNameInput="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm", 
                  classNameError="mt-1 text-red-600 min-h-[1.25rem] text-sm", 
                  ...rest }: Props
              ) => {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
        <input 
            className={classNameInput} 
            placeholder={placeholder}
            type={type}
            {...registerResult}
            {...rest}
        />
        <p className={classNameError}>{errorMessage}</p>
    </div>
  )
}

export default Input;