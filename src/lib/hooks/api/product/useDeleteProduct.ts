import { TProductType } from '@/src/lib/types/productTypes';
import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: Partial<TProductType>;
};

type TResponse = Array<any>;

export function useDeleteProduct() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'DELETE',
        endpoint: `/products/${requestRequiredParams.payload.id}`,
    }));

    return restAPI;
}
