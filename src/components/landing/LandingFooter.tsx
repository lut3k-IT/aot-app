import Link from 'next/link';

export const LandingFooter = () => {
  return (
    <footer className='relative z-10 w-full border-t border-zinc-900 bg-zinc-950 py-12'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center gap-8'>
          <div className='flex flex-col items-center gap-2'>
            <Link
              href='/'
              className='flex items-center gap-2'
            >
              <span className='font-vector text-2xl font-bold text-white'>AOT app</span>
            </Link>
            <p className='text-center text-sm text-zinc-500'>
              Kompleksowa baza wiedzy i narzędzia dla fanów Attack on Titan.
            </p>
          </div>

          <div className='text-sm text-zinc-600'>
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <a
                href='https://kacperlutynski.pl'
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-white'
              >
                kacperlutynski.pl
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
