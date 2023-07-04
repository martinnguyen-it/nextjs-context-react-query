import { TProductType } from '@/src/lib/types/productTypes';
import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: Partial<TProductType>;
};

type TResponse = Array<any>;

export function useCreateProduct() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'POST',
        endpoint: '/products',
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
