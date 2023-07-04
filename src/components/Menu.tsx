import Link from 'next/link';

const Menu = (props: any) => {
    const { children } = props;

    return (
        <div className='h-10'>
            <div className='bg-white'>
                <div className='mx-2 flex items-center justify-start md:mx-auto md:w-[1200px]'>
                    <Link
                        className='px-2 py-5 text-system-highlight no-underline hover:bg-red-100 md:p-5 md:text-xl '
                        href={'/'}
                    >
                        Home
                    </Link>
                    <Link
                        className='px-2 py-5 text-system-highlight no-underline hover:bg-red-100 md:p-5 md:text-xl'
                        href={'/counter'}
                    >
                        Counter
                    </Link>
                    <Link
                        className='px-2 py-5 text-system-highlight no-underline hover:bg-red-100 md:p-5 md:text-xl'
                        href={'/product'}
                    >
                        Product
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Menu;
