import { Heart, Quote, Trophy, Users } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Baza postaci',
    description: 'Przeglądaj profile setek bohaterów i poznaj ich statystyki.'
  },
  {
    icon: Quote,
    title: 'Cytaty',
    description: 'Zainspiruj się słowami swoich ulubionych bohaterów. Odkryj kultowe kwestie z anime.'
  },
  {
    icon: Trophy,
    title: 'Quiz wiedzy',
    description: 'Sprawdź jak dobrze znasz świat Attack on Titan rozwiązując quiz.'
  },
  {
    icon: Heart,
    title: 'Ulubione',
    description: 'Stwórz własną kolekcję ulubionych postaci i miej do nich szybki dostęp.'
  }
];

export const FeaturesSection = () => {
  return (
    <section className='container mx-auto px-4 py-24 md:px-6'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl'>
          Wszystko w jednym miejscu
        </h2>
        <p className='mx-auto max-w-[700px] text-zinc-400 md:text-xl'>
          Odkryj funkcje przygotowane specjalnie dla fanów serii. Zaprojektowane, aby pogłębić Twoje doświadczenie.
        </p>
      </div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-900/20'
          >
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white'>
              <feature.icon className='h-6 w-6' />
            </div>
            <h3 className='mb-2 text-xl font-bold text-white'>{feature.title}</h3>
            <p className='text-zinc-400'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
