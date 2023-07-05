import { TProductType } from '@/src/lib/types/productTypes';
import { useMutationApi } from '../useMutationApi';

type TRequestRequiredParams = {
    payload: Partial<TProductType>;
};

type TResponse = Array<any>;

export function useUpdateProduct() {
    const restAPI = useMutationApi<TResponse, TRequestRequiredParams>((requestRequiredParams) => ({
        method: 'PUT',
        endpoint: `/products/${requestRequiredParams.payload.id}`,
        payload: requestRequiredParams.payload,
    }));

    return restAPI;
}
