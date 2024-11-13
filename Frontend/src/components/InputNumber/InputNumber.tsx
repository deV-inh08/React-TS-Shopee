import React, { forwardRef, InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    errorMessage ?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register ?: UseFormRegister<any>
    rules ?:  RegisterOptions
    classNameInput ?: string
    classNameError ?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
                {
                  errorMessage, 
                  className, 
                  classNameInput="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm", 
                  classNameError="mt-1 text-red-600 min-h-[1.25rem] text-sm", 
                  onChange,
                  ...rest 
                },
                ref
              ) 
            {
            const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const {value} = event.target;
                if((/^\d+$/.test(value) || value === '') && onChange) {
                    onChange(event)
                }
            }
  return (
    <div className={className}>
        <input 
            className={classNameInput} 
            onChange={handleChange}
            {...rest}
            ref={ref}
        />
        <p className={classNameError}>{errorMessage}</p>
    </div>
  )
})

export default InputNumber;