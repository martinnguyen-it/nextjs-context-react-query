import { PRODUCT_ACTIONS } from '@/src/shared/constants/productConstants';
import { TProductActions, TProductType } from '@lib/types/productTypes';
import _, { isArray } from 'lodash';

export const productReducers = (state: TProductType[], action: TProductActions) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.Create:
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                },
            ];
        case PRODUCT_ACTIONS.Init:
            return isArray(action.payload) ? action.payload : [];
        case PRODUCT_ACTIONS.Update:
            return [
                ...state.map((product) =>
                    product.id === action.payload.id
                        ? {
                              id: action.payload.id,
                              name: action.payload.name || product.name,
                              price: action.payload.price || product.price,
                          }
                        : product,
                ),
            ];
        case PRODUCT_ACTIONS.Delete:
            return [...state.filter((product) => product.id !== action.payload.id)];
        case PRODUCT_ACTIONS.DeleteAll:
            return [];
        default:
            throw new Error(`Invalid action`);
    }
};
