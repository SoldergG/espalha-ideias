"use client";

import { useRef } from "react";
import Image from "next/image";

/**
 * Logótipo com as duas "ventoinhas" animadas.
 *
 * O logo original é um PNG achatado, por isso foi recortado em 3 peças
 * (public/images/logo/): a pá laranja (ESPALHA), o cone central e a pá
 * verde-lima (IDEIAS). Cada peça é uma tela 277x67 transparente com apenas
 * o seu elemento visível — empilhadas com `inset-0` reconstroem o logo exato.
 *
 * Ao tocar/clicar, cada pá roda presa pela ponta interior — o ponto onde
 * encosta ao cone — como as pás de um cata-vento fixas no eixo, e abranda até
 * parar. O cone fica sempre imóvel.
 */

// Ponta interior de cada pá (onde encosta ao cone), na tela 277x67, em %.
// Esquerda encosta em ~(131,29); direita em ~(181,29.5).
const ORIGEM_ESQUERDA = "47.3% 43.3%";
const ORIGEM_DIREITA = "65.3% 44%";

const VOLTAS = 3; // 3 voltas completas antes de parar
const DURACAO = 1500; // ms
// ease-out acentuado: arranca rápido e desacelera como uma ventoinha real.
const EASING = "cubic-bezier(0.15, 0.75, 0.2, 1)";

export function LogoAnimado({ className }: { className?: string }) {
  const esquerdaRef = useRef<HTMLSpanElement>(null);
  const direitaRef = useRef<HTMLSpanElement>(null);
  const animacoes = useRef<Animation[]>([]);

  function girar() {
    if (typeof window === "undefined") return;
    // Respeita quem prefere menos movimento.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Cancela qualquer giro a decorrer para reiniciar de forma limpa.
    animacoes.current.forEach((a) => a.cancel());
    animacoes.current = [];

    const spin = (el: HTMLSpanElement | null, sentido: number) => {
      if (!el) return;
      const anim = el.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: `rotate(${sentido * VOLTAS * 360}deg)` },
        ],
        { duration: DURACAO, easing: EASING }
      );
      animacoes.current.push(anim);
    };

    // Pás em sentidos opostos: leem-se como duas ventoinhas independentes.
    spin(esquerdaRef.current, -1);
    spin(direitaRef.current, 1);
  }

  return (
    <span
      className={`relative block ${className ?? ""}`}
      style={{ aspectRatio: "277 / 67" }}
      onClick={girar}
    >
      {/* Cone central — imóvel. */}
      <Image
        src="/images/logo/cone.png"
        alt="Espalha Ideias"
        fill
        priority
        unoptimized
        sizes="140px"
        className="object-contain"
      />
      {/* Pá esquerda (ESPALHA). */}
      <span
        ref={esquerdaRef}
        className="absolute inset-0 block"
        style={{ transformOrigin: ORIGEM_ESQUERDA }}
      >
        <Image
          src="/images/logo/pa-esquerda.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="140px"
          className="object-contain"
        />
      </span>
      {/* Pá direita (IDEIAS). */}
      <span
        ref={direitaRef}
        className="absolute inset-0 block"
        style={{ transformOrigin: ORIGEM_DIREITA }}
      >
        <Image
          src="/images/logo/pa-direita.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="140px"
          className="object-contain"
        />
      </span>
    </span>
  );
}
