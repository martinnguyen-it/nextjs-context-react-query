import React, { createContext, useReducer, Dispatch } from 'react';
import { productReducers } from './reducers/productReducers';
import { TInitialProductStateType, TProductActions, TProductType } from '../lib/types/productTypes';

const initialState: { products: TProductType[] } = {
    products: [],
};

const ProductContext = createContext<{
    state: TInitialProductStateType;
    dispatch: Dispatch<TProductActions>;
}>({
    state: initialState,
    dispatch: () => null,
});

const mainReducer = ({ products }: TInitialProductStateType, action: TProductActions) => ({
    products: productReducers(products, action),
});

export const ProductContextProvider: React.FC<{ children: any }> = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
