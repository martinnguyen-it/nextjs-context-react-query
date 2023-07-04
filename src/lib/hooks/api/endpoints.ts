import { TProductType } from '../../types/productTypes';

interface IGenericEndpoint {
    endpoint: string;
    payload?: Partial<TProductType>;
}

interface IProductEndpoint extends IGenericEndpoint {
    method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
    endpoint: string;
}

export type TRestAPIEndPoints = IProductEndpoint;
