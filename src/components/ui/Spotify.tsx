import { cn } from '@/lib/utils';

interface SpotifyProps {
  className?: string;
}

const Spotify = (props: SpotifyProps) => {
  const { className } = props;
  return (
    <div className={cn('h-full', className)}>
      <iframe
        className={'rounded-md'}
        src='https://open.spotify.com/embed/playlist/3Fi0nQ3SuAQFFdk6MViZwD?utm_source=generator'
        width='100%'
        height='100%'
        frameBorder='0'
        allowFullScreen
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
    </div>
  );
};

export default Spotify;
