import { RevealOnScroll } from "./RevealOnScroll";

/**
 * Faixa de vídeo em silêncio e em ciclo, para enquadrar uma secção.
 * `poster` cobre o tempo de carregamento e os casos em que o vídeo não toca.
 */
export function VideoBanner({
  src,
  poster,
  ariaLabel,
}: {
  src: string;
  poster: string;
  ariaLabel: string;
}) {
  return (
    <RevealOnScroll>
      <div className="relative aspect-[16/9] w-full overflow-hidden border border-border sm:aspect-[21/9]">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={ariaLabel}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </RevealOnScroll>
  );
}
