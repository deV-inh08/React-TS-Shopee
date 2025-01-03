import { Link } from 'react-router-dom';
import path from '../../constants/path';
import InputNumber from '../InputNumber';
import Button from '../Button';
import { Categories } from '../../types/category.type';
import { QueryConfig } from '../../pages/ProductList/ProductList';
import classNames from 'classnames';
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Schema, schema } from '../../utils/rules';
import { NoUndefinedField } from '../../types/utils.type';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next'

interface Props {
    categories: Categories[]
    queryConfig: QueryConfig
    onCategoryClick: (category: string) => void
}

type FormData = NoUndefinedField<Pick<Schema, "price_max" | "price_min">>

const priceSchema = schema.pick(["price_min", "price_max"]);

const AsideFilter = ({ categories, queryConfig, onCategoryClick }: Props) => {
  const { t } = useTranslation('home') // neu dung nhieu [home, product]
    const {category} = queryConfig;
    const {control, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: {
            price_min: "",
            price_max: ""
        },
        resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>),
        // default ==> True
        shouldFocusError: false
    });
    
    // const valueForm = watch();
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        }
    );

    return (
        <div className='py-4'>
            <Link to={path.home} className='flex items-center gap-x-5 font-bold'>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5" 
                    stroke="currentColor"
                    className="size-5">
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" 
                    />
                </svg>
                {t('aside filter.all categories')}
            </Link>
            <div>
                <div className='h-[1px] bg-gray-400 my-4' ></div>
                <ul>
                    {categories.map((item, index) => {
                        const isActive = category === item.slug;
                        return (
                            <li key={index} className='pl-5 relative mt-3 cursor-pointer hover:text-gray-600'>
                                <a 
                                    className={classNames("relative px-2", {
                                        "flex text-orange items-center": isActive
                                    })}
                                    onClick={() => onCategoryClick(item.slug)}
                                    >
                                    {isActive && (
                                         <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth="1.5" 
                                            stroke="currentColor"
                                            className="fill-orange h-2 w-2 absolute left-0">
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                d="m8.25 4.5 7.5 7.5-7.5 7.5" 
                                            />
                                        </svg>
                                    )}
                                    {item.name}
                                </a>
                        </li>
                        )
                    })}                   
                </ul>
            </div>

            <div className='mt-6'>
                <Link to={path.home} className='flex items-center'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        className="w-3 h-4 fill-current stroke-current mr-3">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                        />
                    </svg>
                  
                    <span className='font-bold text-2xl'>{t('aside filter.filter search')}</span>
                </Link>
                <div className='h-[1px] bg-gray-400 my-4' ></div>
                <div>
                    <p>Khoảng giá</p>
                    <form action="" className='mt-2' onSubmit={onSubmit}>
                            <div className='flex items-start'>
                                <Controller
                                    control={control}
                                    name='price_min'
                                    render={({field}) => {
                                        return (
                                            <InputNumber
                                                type='text'
                                                className='grow'
                                                classNameError='hidden'
                                                name='form'
                                                placeholder='₫ TỪ'
                                                classNameInput='px-1 py-1 text-sm border-gray-300 w-full outline-none focus:border-gray-500 rounded-sm focus:shadow-sm'
                                                onChange={field.onChange}
                                                value={field.value}   
                                                ref={field.ref} 
                                            >
                                            </InputNumber>
                                        )
                                    }}
                                >
                                </Controller>
                               
                                <span className='mx-2 mt-2 shrink-0'>--</span>
                                <Controller
                                    control={control}
                                    name='price_max'
                                    render={({field}) => {
                                        return (
                                            <InputNumber
                                            type='text'
                                            className='grow'
                                            classNameError='hidden'
                                            name='form'
                                            placeholder='₫ ĐẾN'
                                            classNameInput='px-1 py-1 text-sm border-gray-300 w-full outline-none focus:border-gray-500 rounded-sm focus:shadow-sm'
                                            onChange={field.onChange}
                                            value={field.value}
                                            ref={field.ref}    
                                        >
                                        </InputNumber>
                                        )
                                    }}
                                >
                                </Controller>
                            </div>
                            <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm text-center'>{errors.price_min?.message}</div>
                            <Button className='bg-orange w-full p-2 text-white text-md hover:bg-orange/80 flex items-center justify-center'>Áp dụng</Button>
                        </form>
                </div>
            </div>

            <div>
                <div className='h-[1px] bg-gray-400 my-4' ></div>
                <p>Đánh giá</p>
                <ul className='mt-3'>
                    <li className='flex mt-1 items-center'>
                        {Array(5).fill(0).map((item, index) => (
                            <Link key={index} to={path.home}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3 fill-current text-gray-300' viewBox="0 0 14 14">
                                    <path d="M6.01118 1.80156C6.34188 1.23867 7.1558 1.23867 7.48651 1.80156L8.723 3.90618C8.84437 4.11277 9.04682 4.259 9.28109 4.30929L11.6706 4.82228C12.314 4.96039 12.5671 5.74277 12.1266 6.23156L10.5055 8.03021C10.3436 8.20978 10.2653 8.44944 10.2898 8.68993L10.5357 11.0969C10.6022 11.7483 9.94211 12.23 9.34204 11.9678L7.09135 10.9846C6.87298 10.8892 6.62471 10.8892 6.40634 10.9846L4.15565 11.9678C3.55558 12.23 2.89548 11.7483 2.96201 11.0969L3.20784 8.68993C3.2324 8.44944 3.15408 8.20978 2.99223 8.03021L1.37113 6.23156C0.930584 5.74277 1.18371 4.96039 1.82707 4.82228L4.2166 4.30929C4.45087 4.259 4.65331 4.11277 4.77469 3.90618L6.01118 1.80156Z" fill="url(#paint0_linear_8502_47897)"/>
                                        <defs>
                                            <linearGradient id="paint0_linear_8502_47897" x1="6.74891" y1="1.45562" x2="6.74891" y2="12.0084" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FFCA11"/>
                                                <stop offset="1" stopColor="#FFAD27"/>
                                            </linearGradient>
                                        </defs>
                                </svg>
                            </Link>
                        ))}
                        <p className='ml-3'>Trở lên</p>
                    </li>
                    <li className='flex mt-1 items-center'>
                        {Array(5).fill(0).map((item, index) => (
                            <Link key={index} to={path.home}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3 fill-current text-gray-300' viewBox="0 0 14 14">
                                <path d="M6.01118 1.80156C6.34188 1.23867 7.1558 1.23867 7.48651 1.80156L8.723 3.90618C8.84437 4.11277 9.04682 4.259 9.28109 4.30929L11.6706 4.82228C12.314 4.96039 12.5671 5.74277 12.1266 6.23156L10.5055 8.03021C10.3436 8.20978 10.2653 8.44944 10.2898 8.68993L10.5357 11.0969C10.6022 11.7483 9.94211 12.23 9.34204 11.9678L7.09135 10.9846C6.87298 10.8892 6.62471 10.8892 6.40634 10.9846L4.15565 11.9678C3.55558 12.23 2.89548 11.7483 2.96201 11.0969L3.20784 8.68993C3.2324 8.44944 3.15408 8.20978 2.99223 8.03021L1.37113 6.23156C0.930584 5.74277 1.18371 4.96039 1.82707 4.82228L4.2166 4.30929C4.45087 4.259 4.65331 4.11277 4.77469 3.90618L6.01118 1.80156Z" fill="url(#paint0_linear_8502_47897)"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_8502_47897" x1="6.74891" y1="1.45562" x2="6.74891" y2="12.0084" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FFCA11"/>
                                            <stop offset="1" stopColor="#FFAD27"/>
                                        </linearGradient>
                                    </defs>
                            </svg>
                        </Link>
                        ))}
                        <p className='ml-3'>Trở lên</p>
                    </li>
                </ul>
            </div>
            <div>
                <div className='h-[1px] bg-gray-400 my-4' ></div>
                <Button className='bg-orange w-full p-2 text-white text-md hover:bg-orange/80 flex items-center justify-center'>Xóa tất cả</Button>
            </div>
        </div>    
  )

}

export default AsideFilter;
