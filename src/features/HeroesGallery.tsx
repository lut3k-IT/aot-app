import { Button } from '@/components/ui/Button';
import HeroCard from '@/components/ui/HeroCard';

const HeroesGallery = () => {
  return (
    <>
      <div className={'w-full flex flex-col gap-4'}>
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <HeroCard />
        <Button variant={'proxy'}>Button</Button>
      </div>
    </>
  );
};

export default HeroesGallery;
