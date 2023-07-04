import { PRODUCT_ACTIONS } from '@/src/shared/constants/productConstants';
import { TActionMap } from '.';

export type TProductType = {
    id: string;
    name: string;
    price: number;
};

export type TInitialProductStateType = {
    products: TProductType[];
};

export type TProductPayload = {
    [PRODUCT_ACTIONS.Create]: {
        id: string;
        name: string;
        price: number;
    };
    [PRODUCT_ACTIONS.Delete]: {
        id: string;
    };
    [PRODUCT_ACTIONS.Update]: {
        id: string;
        name: string;
        price: number;
    };
    [PRODUCT_ACTIONS.Init]: {
        data: TProductType[];
    };
    [PRODUCT_ACTIONS.DeleteAll]: {};
};

export type TProductActions = TActionMap<TProductPayload>[keyof TActionMap<TProductPayload>];
