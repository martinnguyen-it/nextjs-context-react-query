import Head from 'next/head';
import Menu from '@/src/components/Menu';
import { isArray, isEmpty } from 'lodash';
import { useCounterContext, useProductContext } from '@/src/lib/hooks/context';
import Link from 'next/link';

export default function Home() {
    const { counter } = useCounterContext();
    const { state } = useProductContext();

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <Menu />
            <main className='mt-20 mx-auto items-center flex flex-col'>
                <div>
                    <h2 className='font-bold text-5xl mb-20'>
                        COUNTER: {counter || counter === 0 ? counter : <>Loading...</>}
                    </h2>
                </div>
                {state.products && isArray(state.products) && !isEmpty(state.products) && (
                    <table className='mx-auto w-[700px] text-xl text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr className='h-12'>
                                <th>Product name</th>
                                <th>Price</th>
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
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                {isEmpty(state.products) && (
                    <div>
                        No data. Go to the{' '}
                        <Link href='/product' className='text-blue-400 underline'>
                            Product Page
                        </Link>{' '}
                        to update
                    </div>
                )}
            </main>
        </>
    );
}
