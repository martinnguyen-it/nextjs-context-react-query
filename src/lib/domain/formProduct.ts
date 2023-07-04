import * as yup from 'yup';

export const FormProductSchema = yup.object({
    name: yup.string().required('Product name is required.'),
    price: yup
        .number()
        .typeError('Price is number.')
        .required('Price is required.')
        .min(0, 'Price must greater or equal 0.'),
});

export type FormProductSchemaType = yup.InferType<typeof FormProductSchema>;
