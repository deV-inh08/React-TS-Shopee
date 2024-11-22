import { createSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import path from '../constants/path';
import productsAPI from '../apis/product.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, Schema } from '../utils/rules';
import { useQueryClient } from '@tanstack/react-query';


type FormData = Pick<Schema, "name">
const nameSchema = schema.pick(["name"])

const useSearchProducts = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name: ""
        },
        resolver: yupResolver(nameSchema)
    });
    const onSubmitSearch = handleSubmit(async (data) => {
        const { name } = data;
        const searchParams = createSearchParams({
            q: name
        });
        navigate({
            pathname: path.home,
            search: searchParams.toString()
        });
        queryClient.invalidateQueries(["products"])
        try {
            const result = await productsAPI.searchProduct(name);
            console.log(result)
        } catch(err) {
            console.log(err)
        }
    });
  return {
    register,
    onSubmitSearch
  }
}
export default useSearchProducts;
