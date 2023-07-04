import Head from 'next/head';
import Menu from '@/src/components/Menu';
import { useCounterContext } from '@/src/lib/hooks/context';

export default function Counter() {
    const { counter, setCounter } = useCounterContext();
    const onClickCounter = () => {
        setCounter((prev) => {
            return prev + 1;
        });
    };
    const onResetCounter = () => {
        setCounter(() => 0);
    };
    return (
        <>
            <Head>
                <title>Counter</title>
            </Head>

            <Menu />
            <main className='flex flex-col justify-center text-center align-middle  mx-auto mt-10 bg-white'>
                <h1 className='font-bold text-5xl my-10'>
                    COUNTER: {counter || counter === 0 ? counter : <>Loading...</>}
                </h1>
                <div className='flex px-5'>
                    <button
                        className='font-bold text-5xl my-10 bg-slate-500 hover:opacity-50    mx-auto rounded-sm w-[400px]'
                        onClick={onClickCounter}
                    >
                        Setcounter
                    </button>
                    <button
                        className='font-bold text-5xl my-10 bg-slate-500 hover:opacity-50    mx-auto rounded-sm w-[400px]'
                        onClick={onResetCounter}
                    >
                        Reset
                    </button>
                </div>
            </main>
        </>
    );
}
