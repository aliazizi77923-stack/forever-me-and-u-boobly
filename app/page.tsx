"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

type Memory = {
  id: number;
  title: string;
  text: string;
  image: string;
};

type BurstHeart = {
  id: number;
  x: number;
  y: number;
  emoji: string;
  dx: number;
  dy: number;
};

export default function AnniversaryGallerySite() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1200], [0, -120]);
  const parallaxYSoft = useTransform(scrollY, [0, 1200], [0, -60]);
  const secretPassword = "Forever";

  const placeholderImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2b1028"/>
            <stop offset="50%" stop-color="#4a183d"/>
            <stop offset="100%" stop-color="#170814"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#g)"/>
        <circle cx="250" cy="180" r="120" fill="#ffffff10"/>
        <circle cx="930" cy="710" r="150" fill="#ffffff08"/>
        <text x="50%" y="47%" text-anchor="middle" fill="#f8cdd8" font-size="72" font-family="Georgia, serif">Unser Moment</text>
        <text x="50%" y="57%" text-anchor="middle" fill="#f3dfe6" font-size="32" font-family="Arial, sans-serif">Hier kannst du euer Bild einsetzen</text>
      </svg>
    `);

  const memories: Memory[] = useMemo(() => {
    const titles = [
      "💫 Booby",
      "❤️ Bloobly",
      "✨ Boobsly",
      "💖 My Panda",
      "💕🌙 My Beauty",
      "💘 Für immer wir",
    ];

    const texts = [
      "Ein Moment mit dir, den ich für immer im Herzen behalten will. ❤️",
      "Mit dir fühlt sich selbst ein kleiner Augenblick besonders an. ✨",
      "Wenn ich dieses Bild sehe, muss ich direkt an dein Lächeln denken. 💖",
      "So sehen Erinnerungen aus, die ich nie vergessen möchte. 🌹",
      "Du und ich – genau so fühlt sich Zuhause an. 💞",
      "Ein Bild, das mich immer wieder daran erinnert, wie glücklich ich mit dir bin. 🥹",
      "Mit dir sind selbst normale Tage irgendwie wunderschön. ☁️",
      "Ein kleiner Moment, aber für mich bedeutet er ganz viel. ❤️",
      "Jede Erinnerung mit dir ist etwas ganz Besonderes für mich. 💌",
      "Ich liebe diese Momente mit dir einfach so sehr. 💘",
    ];

    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      title: titles[i % titles.length],
      text: texts[i % texts.length],
      image: `/bilder/${i + 1}.jpeg`,
    }));
  }, [placeholderImage]);

  const storyCards = [
    {
      title: "Unsere Liebe ❤️",
      text: "Seit wir uns haben, fühlt sich alles irgendwie leichter, schöner und einfach richtiger an. Du machst mein Leben mit deiner Art jeden Tag ein bisschen heller.",
    },
    {
      title: "Unsere Zeit ✨",
      text: "Mit dir werden auch ganz normale Tage zu Erinnerungen, die ich nie mehr vergessen will. Genau das liebe ich so an uns.",
    },
    {
      title: "Mein Lieblingsmensch 💖",
      text: "Du bist nicht nur ein Teil meines Lebens. Du bist mein Zuhause, mein Glück, mein Ruheort und einer der schönsten Gründe, warum ich so oft lächle.",
    },
  ];

  const backgroundLoveLanguages = [
    "I love you",
    "Ich liebe dich",
    "دوستت دارم",
    "Je t’aime",
    "Ti amo",
    "Te amo",
    "Seni seviyorum",
  ];

  const positions = [
    "top-6 left-[-20px] -rotate-12",
    "top-[18%] right-[-30px] rotate-12",
    "top-[34%] left-[8%] -rotate-6",
    "top-[48%] right-[6%] rotate-6",
    "top-[62%] left-[-10px] -rotate-12",
    "top-[78%] right-[8%] rotate-12",
    "bottom-6 left-[22%] -rotate-6",
  ];

  const clickHearts = ["❤️", "💖", "💘", "💞", "💕", "💓"];

  const floatingEmojis = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 6,
        content: i % 4 === 0 ? "Ali ❤️ Anja" : clickHearts[i % clickHearts.length],
        isText: i % 4 === 0,
      })),
    []
  );

  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Memory | null>(null);
  const [heartPos, setHeartPos] = useState({ x: 20, y: 20 });
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);

  const createHeartBurst = (x: number, y: number, amount = 12) => {
    const idBase = Date.now() + Math.floor(Math.random() * 1000);

    const newHearts = Array.from({ length: amount }, (_, index) => ({
      id: idBase + index,
      x,
      y,
      emoji: clickHearts[index % clickHearts.length],
      dx: (Math.random() - 0.5) * 180,
      dy: -120 - Math.random() * 140,
    }));

    setBurstHearts((prev) => [...prev, ...newHearts]);

    window.setTimeout(() => {
      setBurstHearts((prev) => prev.filter((heart) => !newHearts.some((n) => n.id === heart.id)));
    }, 1400);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 18);
    }, 700);

    const moveInterval = window.setInterval(() => {
      const padding = 60;
      const maxX = Math.max(20, window.innerWidth - padding);
      const maxY = Math.max(20, window.innerHeight - padding);
      setHeartPos({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      });
    }, 2200);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(moveInterval);
    };
  }, []);

  const handleUnlock = () => {
    if (passwordInput === secretPassword) {
      setIsUnlocked(true);
      setPasswordError("");
      createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 18);
    } else {
      setPasswordError("Falsches Passwort 💔");
    }
  };

  const handlePageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isUnlocked) return;
    createHeartBurst(event.clientX, event.clientY, 8);
  };

  return (
    <div
      onClick={handlePageClick}
      className="relative min-h-screen overflow-x-hidden bg-[#120915] px-4 text-white sm:px-6"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;600&family=Dancing+Script:wght@500;700&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Poppins', sans-serif; }
      `}</style>

      <motion.div style={{ y: parallaxY }} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {backgroundLoveLanguages.map((text, index) => (
          <div
            key={text}
            style={{ fontFamily: "Great Vibes, cursive" }}
            className={`absolute ${positions[index]} whitespace-nowrap text-4xl text-white/10 md:text-7xl`}
          >
            {text}
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.18),transparent_30%)]" />

      <motion.div style={{ y: parallaxYSoft }} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {floatingEmojis.map((item) => (
          <motion.span
            key={item.id}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 0] }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            style={{
              left: `${item.left}%`,
              fontFamily: item.isText ? "Dancing Script, cursive" : undefined,
            }}
            className={`absolute ${item.isText ? "text-2xl text-rose-200/40 md:text-3xl" : "text-xl"}`}
          >
            {item.content}
          </motion.span>
        ))}
      </motion.div>

      {!isUnlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-xl">
            <h1
              className="mb-4 text-5xl text-rose-200 sm:text-6xl"
              style={{
                fontFamily: "Great Vibes, cursive",
                textShadow:
                  "0 0 10px rgba(255,182,193,0.8), 0 0 20px rgba(255,105,180,0.6), 0 0 40px rgba(255,105,180,0.4)",
              }}
            >
              Unser Jahrestag
            </h1>
            <p className="mb-6 text-white/70">Unser kleines Geheimnis 💭</p>

            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              placeholder="Passwort"
              className="w-full rounded-xl bg-white/10 p-3 text-center outline-none ring-1 ring-white/10"
            />

            <button
              type="button"
              onClick={handleUnlock}
              className="mt-4 w-full rounded-xl bg-rose-300 p-3 font-medium text-black transition hover:scale-[1.02]"
            >
              Öffnen ❤️
            </button>

            {passwordError && <p className="mt-3 text-rose-400">{passwordError}</p>}
          </div>
        </div>
      )}

      {burstHearts.map((heart) => (
        <motion.span
          key={heart.id}
          initial={{ x: heart.x, y: heart.y, opacity: 1, scale: 0.9 }}
          animate={{ x: heart.x + heart.dx, y: heart.y + heart.dy, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.15, ease: "easeOut" }}
          className="pointer-events-none fixed z-[60] text-2xl"
        >
          {heart.emoji}
        </motion.span>
      ))}

      {isUnlocked && (
        <>
          <header className="relative z-10 mx-auto max-w-6xl pt-12 pb-14 text-center sm:pt-16 sm:pb-20">
            <h1
              className="text-5xl text-rose-200 sm:text-7xl lg:text-8xl"
              style={{
                fontFamily: "Great Vibes, cursive",
                textShadow:
                  "0 0 10px rgba(255,182,193,0.8), 0 0 20px rgba(255,105,180,0.6), 0 0 40px rgba(255,105,180,0.4)",
              }}
            >
              Unser Jahrestag
            </h1>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-rose-100/25 shadow-2xl shadow-rose-900/30 ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60"
                  alt="Forever Hintergrund"
                  className="h-[180px] w-full object-cover brightness-[0.9] contrast-[1.08] saturate-[1.05] sm:h-[220px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/20" />
                <div className="absolute inset-0 bg-rose-200/10" />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <span
                    style={{
                      fontFamily: "Great Vibes, cursive",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      fontSize: "clamp(4.4rem, 11vw, 7rem)",
                      filter: "drop-shadow(0 0 10px rgba(255,255,255,0.35)) drop-shadow(0 0 22px rgba(255,182,193,0.18))",
                      letterSpacing: "0.02em",
                    }}
                    className="leading-none"
                  >
                    Forever
                  </span>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Mit dir fühlt sich alles einfach schöner an. Jeder Moment mit dir bedeutet mir mehr, als ich in Worte fassen kann. ❤️
            </p>
          </header>

          <main className="relative z-10 mx-auto max-w-6xl space-y-14 pb-24 sm:space-y-20">
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex rounded-full border border-rose-200/20 bg-rose-300/10 px-4 py-2 text-sm text-rose-100">
                  Für meinen Lieblingsmenschen
                </div>
                <h2 className="mt-6 text-3xl font-semibold text-rose-50 sm:text-5xl">
                  Unsere Liebe, unsere kleine Welt ✨
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                  Weisst du… diese Seite ist mein kleiner Versuch, dir zu zeigen, was ich manchmal gar nicht richtig sagen kann. All die Bilder hier sind für mich mehr als nur Erinnerungen – sie sind Momente, in denen ich einfach nur glücklich war, weil du da bist. Seit es dich gibt, fühlt sich alles ein bisschen wärmer, echter und irgendwie einfach richtig an. ❤️
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="overflow-hidden rounded-[2rem] border border-rose-200/15 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
                  <motion.img
                    src={memories[0].image}
                    alt={memories[0].title}
                    className="h-[420px] w-full rounded-[1.5rem] object-cover sm:h-[520px]"
                    animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </section>

            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {storyCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[2rem] border border-rose-200/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl"
                >
                  <h3 className="text-xl font-semibold text-rose-50">{card.title}</h3>
                  <p className="mt-3 leading-7 text-white/70">{card.text}</p>
                </motion.div>
              ))}
            </section>

            <section>
              <div className="mb-8 text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-rose-300">Unsere Erinnerungen</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Unsere schönsten Erinnerungen together 💞</h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/65">
                  Hier haben unsere Lieblingsmomente ihren Platz. Jeder einzelne erinnert mich daran, wie schön es ist, dich an meiner Seite zu haben. 📸💕
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {memories.map((memory, index) => (
                  <motion.article
                    key={memory.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="group overflow-hidden rounded-[1.6rem] border border-rose-200/10 bg-white/5 shadow-xl backdrop-blur-xl"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(memory);
                      }}
                      className="block w-full text-left"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={memory.image}
                          alt={memory.title}
                          className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-rose-100">{memory.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/60">{memory.text}</p>
                      </div>
                    </button>
                  </motion.article>
                ))}
              </div>
            </section>
            <section>
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-bold sm:text-5xl">
      Unsere Videos 🎥
    </h2>
    <p className="mt-4 text-white/65">
      Unsere schönsten Momente in Bewegung 💖
    </p>
  </div>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[1,2,3].map((id) => (
      <div key={id} className="overflow-hidden rounded-2xl border border-white/10">
        <video
          src={`/videos/${id}.mp4`}
          controls
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</section>
            <section className="rounded-[2rem] border border-rose-200/15 bg-gradient-to-br from-rose-500/15 via-pink-400/10 to-white/5 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
              <p className="text-sm uppercase tracking-[0.3em] text-rose-200">Für dich</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-5xl">Mein Herz gehört dir 💘</h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                Seit wir uns haben, hat sich mein Leben im schönsten Sinn verändert. Danke, dass du an meiner Seite bist, dass du mich zum Lachen bringst, mich verstehst und mir jeden Tag zeigst, wie schön Liebe sein kann. Du bist für mich nicht einfach nur ein Mensch – du bist mein Zuhause. ❤️
              </p>
              <div className="mt-8 inline-flex rounded-full border border-rose-200/20 bg-rose-200/10 px-6 py-3 text-white/95">
                Mit ganz viel Liebe von Ali 💖
              </div>
            </section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-rose-200/15 bg-gradient-to-br from-[#24101f] via-[#341226] to-[#170913] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),linear-gradient(135deg,rgba(244,114,182,0.08),transparent_55%)]" />
                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.35em] text-rose-200/80">Forever starts here ✨</p>
                  <h2
                    className="mt-4 text-4xl text-rose-100 sm:text-6xl"
                    style={{ fontFamily: "Great Vibes, cursive" }}
                  >
                    Und das ist erst der Anfang…
                  </h2>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                    Von all den Erinnerungen, die wir schon haben, sind das hier erst die ersten Seiten unserer Geschichte. Das Schönste kommt noch – mit dir. ❤️
                  </p>
                </div>
              </div>
            </motion.section>
          </main>

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowSecret(true);
            }}
            animate={{ x: heartPos.x, y: heartPos.y }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="fixed left-0 top-0 z-20 text-3xl"
          >
            ❤️
          </motion.button>

          <AnimatePresence>
            {showSecret && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
                onClick={() => setShowSecret(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-md rounded-[2rem] border border-rose-200/15 bg-gradient-to-br from-[#2a0f24] via-[#3a152f] to-[#1b0a18] p-7 text-center shadow-2xl backdrop-blur-xl"
                >
                  <p className="text-xl leading-8 text-rose-50">
                    💌 Ich liebe dich immer einmal mehr, und ich liebe dich mehr, als ich es je in Worte fassen kann. Du bist mein schönster Gedanke, mein sicherer Ort und mein Lieblingsmensch. ❤️✨
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSecret(false)}
                    className="mt-6 rounded-xl bg-rose-300 px-5 py-2.5 font-medium text-black shadow-lg shadow-rose-500/20"
                  >
                    Schliessen
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#1a0c18] shadow-2xl"
                >
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="max-h-[75vh] w-full object-contain"
                  />
                  <div className="p-5 sm:p-6">
                    <p className="text-xl font-semibold text-rose-100">{selectedImage.title}</p>
                    <p className="mt-2 text-white/70">{selectedImage.text}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}