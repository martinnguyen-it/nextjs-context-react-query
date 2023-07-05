import Head from 'next/head';
import Menu from '@/src/components/Menu';
import { useCallback, useEffect, useState } from 'react';
import { PRODUCT_ACTIONS } from '@shared/constants/productConstants';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FormProductSchema } from '@/src/lib/domain/formProduct';
import { yupResolver } from '@hookform/resolvers/yup';
import { TProductType } from '@/src/lib/types/productTypes';
import { useDeleteProduct } from '@/src/lib/hooks/api/product/useDeleteProduct';
import { useCreateProduct } from '@/src/lib/hooks/api/product/useCreateProduct';
import { queryFunction } from '@/src/lib/hooks/api/queryFunction';
import { useProductContext } from '@/src/lib/hooks/context';
import { useQuery } from 'react-query';
import Spinner from '@/src/components/Spinner';
import { useUpdateProduct } from '@/src/lib/hooks/api/product/useUpdateProduct';

interface IForm {
    price: number;
    name: string;
}

export default function Counter() {
    const { state, dispatch } = useProductContext();
    const [update, setUpdate] = useState({ isUpdate: false, id: '' });
    const defaultValue = { price: 0, name: '' };

    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IForm>({
        resolver: yupResolver(FormProductSchema),
        defaultValues: defaultValue,
    });

    const { isLoading, isError, data, error, isSuccess } = useQuery('products', queryFunction);

    useEffect(() => {
        if (isSuccess && data && data.data) {
            dispatch({
                type: PRODUCT_ACTIONS.Init,
                payload: data.data,
            });
        }
    }, [isSuccess, data]);

    const handleAdd = useCallback(
        handleSubmit((data) => {
            const dataPayload = { price: data.price * 1, name: data.name };
            createProduct.sendRequest(
                { payload: dataPayload },
                {
                    onSuccess: async (data: any) => {
                        dispatch({
                            type: PRODUCT_ACTIONS.Create,
                            payload: data.data as TProductType,
                        });
                    },
                    onError: () => {
                        toast.error(createProduct.errorMessage);
                    },
                },
            );

            toast.success('Add Success');
            reset(defaultValue);
        }),
        [],
    );

    const handleDelete = (e: any) => {
        if (confirm('Are you sure you want to delete ?')) {
            deleteProduct.sendRequest(
                { payload: { id: e.currentTarget.id } },
                {
                    onSuccess: async (data: any) => {
                        await dispatch({
                            type: PRODUCT_ACTIONS.Delete,
                            payload: { id: data.data.id },
                        });
                        toast.error('Deleted Success');
                    },
                    onError: () => {
                        toast.error(deleteProduct.errorMessage);
                    },
                },
            );
        } else {
            toast.error('Cancelled Delete');
        }
    };

    const openHandleUpdate = (e: any) => {
        setUpdate({ isUpdate: true, id: e.currentTarget.id });
        const valueUpdate = state.products.find((p) => p.id === e.currentTarget.id);
        reset({ name: valueUpdate?.name || '', price: valueUpdate?.price || 0 });
    };
    const handleUpdate = handleSubmit((data) => {
        updateProduct.sendRequest(
            {
                payload: { id: update.id, price: data.price * 1, name: data.name },
            },
            {
                onSuccess: async (data: any) => {
                    await dispatch({
                        type: PRODUCT_ACTIONS.Update,
                        payload: data.data as TProductType,
                    });
                    toast.success('Update Success');
                    reset(defaultValue);
                    setUpdate({ isUpdate: false, id: '' });
                },
                onError: () => {
                    toast.error(deleteProduct.errorMessage);
                },
            },
        );
    });

    const handlSkipUpdate = useCallback(() => {
        setUpdate({ isUpdate: false, id: '' });
        reset(defaultValue);
    }, []);
    return (
        <>
            <Head>
                <title>Product</title>
            </Head>

            <Menu />
            <main className='flex flex-col justify-center text-center align-middle  mx-auto mt-10 bg-white'>
                <div className='font-bold text-2xl mt-10 max-w-[800px] mx-auto flex'>
                    <div>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[400px]'
                            type='text'
                            placeholder='Product name...'
                            {...register('name')}
                        />
                    </div>
                    <div>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100px] ml-2'
                            type='number'
                            placeholder='Price...'
                            {...register('price')}
                            min={0}
                        />
                    </div>

                    {update.isUpdate ? (
                        <>
                            {' '}
                            <button
                                onClick={handleUpdate}
                                disabled={updateProduct.isLoading}
                                className='bg-yellow-500 hover:bg-yellow-700 min-w-fit flex items-center text-white font-bold py-2 px-4 rounded-lg ml-4'
                            >
                                {updateProduct.isLoading ? <Spinner /> : ''}
                                Update
                            </button>
                            <button
                                onClick={handlSkipUpdate}
                                className='bg-green-500 min-w-fit flex items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg ml-4'
                            >
                                Skip
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleAdd}
                            disabled={createProduct.isLoading}
                            className='bg-blue-500 hover:bg-blue-700 min-w-fit flex items-center text-white font-bold py-2 px-4 rounded-lg ml-4'
                        >
                            {createProduct.isLoading ? <Spinner /> : ''}
                            Add
                        </button>
                    )}
                </div>
                {errors.name?.message && <p className='text-red-600'>{errors.name?.message}</p>}
                {errors.price?.message && <p className='text-red-600'>{errors.price?.message}</p>}

                {isLoading && <div className='mt-20 text-xl text-gray-500 dark:text-gray-400'>Loading.....</div>}

                {!isEmpty(state.products) && (
                    <table className=' mt-20 mx-auto w-[700px] text-xl text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center'>
                            <tr className='h-12'>
                                <th>Product name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.products.map((product, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className='h-12 bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                                    >
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <button
                                                id={product.id}
                                                onClick={handleDelete}
                                                className='ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
                                            >
                                                Delete
                                            </button>
                                            <button
                                                id={product.id}
                                                onClick={openHandleUpdate}
                                                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 ml-2 px-2 rounded'
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </main>
        </>
    );
}
