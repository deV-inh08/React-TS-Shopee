import React from 'react'
import InputNumber from '../InputNumber';
import { InputNumberProps } from '../InputNumber';

interface Props extends InputNumberProps {
    max?: number
    onIncrease?: (value: number) => void
    onDecrease?: (value: number) => void
    onType?: (value: number) => void
    classNameWarraper?: string
} 

 const QuantityController = ({max, onIncrease, onDecrease, onType, classNameWarraper = "ml-10", value, ...rest} : Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _value = Number(event.target.value)
        if(max !== undefined && _value > max) {
            _value = max
        } else if(_value < 1) {
            _value = 1
        }
        onType && onType(_value)
    };

    const increase = () => {
        let _value = Number(value) + 1;
        if(max !== undefined && _value > max) {
            _value = max
        }
        onIncrease && onIncrease(_value);
    };
    
    const decrease = () => {
        let _value = Number(value) - 1;
        if(_value < 1) {
            _value = 1
        }
        onDecrease && onDecrease(_value);
    };

    return (
        <div className={"flex items-center" + classNameWarraper}>
            <button onClick={decrease} className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
            </button>
            <InputNumber 
                className='' 
                classNameError='hidden' 
                classNameInput='h-8 w-14 border-t border-b border-gray-300 text-center outline-none'
                onChange={handleChange}
                value={value}
                {...rest}
            >
            </InputNumber>
            <button onClick={increase} className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    )
};
export default QuantityController;
