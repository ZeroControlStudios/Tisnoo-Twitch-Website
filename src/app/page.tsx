"use client";
import Image from "next/image"; // <--- CETTE LIGNE EST INDISPENSABLE
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Plus tard, cette valeur viendra d'un fetch API Twitch
    const [isLive, setIsLive] = useState(false);
    const CHANNEL_NAME = "guerriaxeu"; // <--- REMPLACE PAR LE NOM TWITCH DU CLIENT

    // 1. Ajoute l'état en haut de ton composant
    const [lastVideoId, setLastVideoId] = useState<string | null>(null);

    // 2. Ajoute ce useEffect pour charger l'ID au démarrage
    useEffect(() => {
      fetch('/api/youtube')
        .then(res => res.json())
        .then(data => {
          if (data.lastVideoId) setLastVideoId(data.lastVideoId);
        });
    }, []);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoRef.current) {
              // Remet la vidéo à zéro et la lance
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          });
        },
        { threshold: 0.5 } // Se déclenche quand 50% de la section est visible
      );

      const currentSection = videoRef.current?.closest("section");
      if (currentSection) {
        observer.observe(currentSection);
      }

      return () => observer.disconnect();
    }, []);

// --- EFFET 2 : STATUS TWITCH (API Check) ---
useEffect(() => {
  const checkStatus = async () => {
    try {
      // On interroge notre propre API (qui fait le sale boulot en GQL)
      // Le paramètre ?t= empêche ton navigateur de mettre la réponse en cache
      const res = await fetch(`/api/twitch?t=${Date.now()}`);
      const data = await res.json();

      console.log("Statut GQL Twitch :", data.isLive ? "LIVE ✅" : "OFFLINE ❌");
      setIsLive(data.isLive);
    } catch (err) {
      setIsLive(false);
    }
  };

  // 1ère vérification immédiate au chargement
  checkStatus();

  // Vérification silencieuse en boucle toutes les 15 secondes
  const interval = setInterval(checkStatus, 15000);
  return () => clearInterval(interval);
}, []);

    return (

<main className="relative"> {/* <--- AJOUTE "relative" ICI */}

{/* LOGO EN HAUT À GAUCHE - Changé de fixed à absolute */}
<div className="absolute top-6 right-6 md:top-10 md:right-10 z-50">
  <Image
    src="/TisnooLogo.png"
    alt="Tisnoo Logo"
    width={140}
    height={50}
    className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
    priority
  />
</div>

{/* Etoiles left top - Changé de fixed à absolute */}
<div className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
  <Image
    src="/Tistars.png"
    alt="Tisnoo Stars"
    width={140}
    height={50}
    className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
    priority
  />
</div>

{/* Etoiles left top - Changé de fixed à absolute */}
<div className="absolute top-1000 left-5 md:top-248 md:left-268 z-50">
  <Image
    src="/Tistars.png"
    alt="Tisnoo Staras"
    width={70}
    height={25}
    className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
    priority
  />
</div>

{/* Etoiles left top - Changé de fixed à absolute */}
<div className="absolute top-1000 left-5 md:top-248 md:left-195 z-50">
  <Image
    src="/Tistars.png"
    alt="Tisnoo Staras"
    width={70}
    height={25}
className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 -scale-x-100 hover:-scale-x-110 priority"
priority
  />
</div>

{/* Etoiles left top - Changé de fixed à absolute */}
<div className="absolute top-1000 left-5 md:top-463 md:left-274 z-50">

            <a
              href="https://github.com/ZeroControlStudios"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.3em] opacity-20 hover:opacity-50 transition-opacity duration-300"
            >
  <Image
    src="/gitrub.png"
    alt="Github"
    width={35}
    height={25}
    className="object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
    priority
  />
  </a>
</div>


      {/* SECTION 1 : HERO (Basée sur ton Screen 1) */}
      <section className="bg-section-hero justify-center items-center">
        <h1 className="z-10 text-[18vw] font-['CenatycSlant'] font-black  tracking-tighter leading-none uppercase translate-y-8">
        </h1>

<video
          ref={videoRef} // On lie la vidéo au script
          muted
          playsInline
          className="bg-video"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>

        {/* Ligne de séparation style Sony */}
        <div className="z-10 bg-section-dashboard p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-6">
          <span className="font-mono text-[10px] tracking-[1em] opacity-30 uppercase whitespace-nowrap">
          </span>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
        </div>
      </section>

{/* SECTION 2 : DASHBOARD */}
<section className="p-6 md:p-12 grid grid-cols-12 grid-rows-6 gap-6">

  {/* BLOC SOCIALS : Barre de titre + Grille 3 colonnes / 2 lignes */}
  <div className="col-span-12 row-span-2 border border-white/10 bg-white/5 backdrop-blur-md flex flex-col">
    {/* Barre de titre SOCIALS */}
<div className="border-b border-white/10 py-4 px-6 bg-white/5 flex flex-col items-center">
    <h2 className="font-['CenatycSlant'] text-[20px] tracking-[1em] uppercase opacity-60 text-center ml-[1em]">
      Socials
    </h2>

    {/* LA BARRE BLANCHE : Fine, centrée, s'étendant avec un dégradé */}
    <div className="mt-2 h-[4px] w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
  </div>

    {/* Grille des liens 2 2 2 */}
    <div className="flex-1 grid grid-cols-3 gap-x-12 px-12 items-center text-center font-['Cenatyc'] text-2xl uppercase">
      {/* Colonne 1 */}
      <div className="flex flex-col gap-1">
        <a href="https://www.instagram.com/t1snoo" className="font-['Cenata'] hover:text-pink-500 transition-all hover:italic hover:tracking-widest">Insta</a>
        <a href="https://discord.gg/kAKjCbgmCh" className="font-['Cenata'] hover:text-indigo-400 transition-all hover:italic hover:tracking-widest">Discord</a>
      </div>

      {/* Colonne 2 */}
      <div className="flex flex-col gap-1">
        <a href="https://steamcommunity.com/id/Tisnoo/" className="font-['Cenata'] hover:text-blue-400 transition-all hover:italic hover:tracking-widest">Steam</a>
        <a href="https://x.com/T1snoo" className="font-['Cenata'] hover:text-sky-400 transition-all hover:italic hover:tracking-widest">Twitter</a>
      </div>

      {/* Colonne 3 */}
      <div className="flex flex-col gap-1">
        <a href="https://www.youtube.com/@T1snoo" className="font-['Cenata'] hover:text-red-500 transition-all hover:italic hover:tracking-widest">Youtube</a>
        <a href="https://www.twitch.tv/t1snoo" className="font-['Cenata'] hover:text-purple-500 transition-all hover:italic hover:tracking-widest">Twitch</a>
      </div>
    </div>
  </div>

{/* BLOC TWITCH : Moitié gauche */}
<div className="col-span-6 row-start-3 row-span-4 flex flex-col gap-2">
   <div className="border-b border-white/10 pb-1 flex justify-between items-center">
      <span className="font-['CenatycSlant'] text-[20px] opacity-40 uppercase tracking-widest">Twitch</span>
      {/* Voyant du haut (Statut Texte) */}
      <div className="flex items-center gap-2">
      </div>
   </div>

   <div className="flex-1 border border-white/10 bg-black/40 backdrop-blur-lg flex flex-col p-2 group cursor-pointer transition-colors hover:border-white/30">
      <div className="flex-1 bg-white/5 border border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />

         {/* IMAGE DE FOND (Uniquement si Live) */}
         {isLive && (
            <>
               <img
                  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_guerriaxeu-640x360.jpg?t=${Date.now()}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  alt="Live Preview"
               />

               {/* BOUTON WATCH ON TWITCH (Bas à droite) */}
               <a
                  href="https://twitch.tv/guerriaxeu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 z-20 bg-[#9146FF] hover:bg-[#772ce8] text-white text-[9px] font-bold uppercase py-1 px-3 transition-all transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
               >
                  Watch on Twitch
               </a>
            </>
         )}

         {/* LE POINT DE STATUT (Bas à gauche) */}
         <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 opacity-50'}`} />
         </div>

      </div>
   </div>
</div>

<div className="col-span-6 row-start-3 row-span-4 flex flex-col gap-2">
   <div className="border-b border-white/10 pb-1 flex justify-between items-center">
      <span className="font-['CenatycSlant'] text-[20px] opacity-40 uppercase tracking-widest">Youtube</span>
   </div>

   <div className="flex-1 border border-white/10 bg-black/40 backdrop-blur-lg flex flex-col p-2 group cursor-pointer transition-colors hover:border-white/30">
      <div className="flex-1 bg-white/5 border border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />

         {lastVideoId ? (
            <>
               <img
                  src={`https://img.youtube.com/vi/${lastVideoId}/maxresdefault.jpg`}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-500 group-hover:scale-105"
                  alt="Latest Video Preview"
               />

               <a
                  href={`https://www.youtube.com/watch?v=${lastVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 z-20 bg-[#FF0000] hover:bg-[#cc0000] text-white text-[9px] font-bold uppercase py-1 px-3 transition-all transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
               >
                  Watch on Youtube
               </a>
            </>
         ) : (
            <div className="flex items-center justify-center h-full opacity-20">
               <span className="font-mono text-[9px] uppercase tracking-widest">[ Loading Signal ]</span>
            </div>
         )}
      </div>
   </div>
</div>

  {/* FOOTER : Positionné en bas au centre de la section */}
          <div className="absolute bottom-4 left-0 w-full flex justify-center items-center pointer-events-none">
            <a
              href="https://github.com/ZeroControlStudios"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.3em] opacity-20 hover:opacity-50 transition-opacity duration-300"
            >
              Powered by <span className="font-bold">ZeroControlStudios</span>
            </a>
          </div>

</section>
    </main>
  );
}