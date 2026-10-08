import React, { useEffect, useState } from "react";
import HeroSection from "@/components/portfolio/HeroSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import AngebotSection from "@/components/portfolio/AngebotSection";
import ContactModal from "@/components/portfolio/ContactModal";
import FloatingHeader from "@/components/portfolio/FloatingHeader";

const sectionIds = ["hero", "services", "about", "projects"];
const founderImage = new URL("../../public/ProfSmallSmile.png", import.meta.url).href;
const callbackMessage = "Ich möchte den Rückruf-Ablauf für verpasste Anrufe und Webanfragen besprechen. Mein Betrieb, Einsatzgebiet und bisheriger Ablauf: ";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");

  const openContact = (message = callbackMessage) => {
    setContactMessage(message);
    setContactOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        entries.forEach((entry) => {
          if (entry.target.id === visible[0].target.id) setActiveSection(entry.target.id);
        });
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -45% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ scrollBehavior: "smooth", backgroundColor: "#f2f5fb" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <div className="absolute inset-0" style={{ background: "#edf2f8" }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 44% at 8% 6%, rgba(125,155,196,0.22), transparent 66%), radial-gradient(ellipse 48% 32% at 88% 14%, rgba(192,60,60,0.12), transparent 74%)",
          }}
        />
      </div>
      <FloatingHeader activeSection={activeSection} onContactOpen={openContact} />

      <main className="relative z-10">
        <div className="relative">
          <HeroSection onContactOpen={openContact} />
          <div
            className="pointer-events-none absolute left-0 right-0 top-full z-[1] -mt-px h-32 sm:h-40 lg:h-48"
            style={{
              background: "linear-gradient(180deg, rgba(242,245,251,0.96) 0%, rgba(242,245,251,0.6) 42%, rgba(242,245,251,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative z-[2]">
          <AngebotSection onContactOpen={openContact} />
          <section id="about" className="scroll-mt-24 py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
              <article className="rounded-2xl border border-[#d5dfee] bg-[#f9fcff] p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4f648d]">Ergänzend: Websites</p>
                <h2 className="mt-3 font-sora text-2xl font-bold text-[#1f335b]">Die Website als Anfrageweg.</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#4a6188]">
                  Eine verständliche Website und ein passendes Anfrageformular können den Rückruf-Ablauf unterstützen. Gestaltung, Einrichtung und Wartung bleiben Teil meiner Arbeit – aber eine neue Website ist nicht automatisch Voraussetzung für diesen Ablauf.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4a6188]">
                  Die Projekte unten zeigen bisherige Website- und Entwicklungsarbeit, keine Kundenergebnisse für den Rückruf-Service.
                </p>
              </article>
              <article className="flex flex-col gap-5 rounded-2xl border border-[#d5dfee] bg-[#f9fcff] p-6 sm:flex-row sm:p-8">
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4f648d]">Dein Ansprechpartner in Flensburg</p>
                  <h2 className="mt-3 font-sora text-2xl font-bold text-[#1f335b]">Moin, ich bin Jascha.</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#4a6188]">
                    Mit Technik aufgewachsen, Kunst studiert und heute IT-Generalist. Ich verbinde Gestaltung und Entwicklung und bespreche mit dir, wo KI im Betriebsalltag sinnvoll unterstützen kann – und wo Menschen übernehmen müssen.
                  </p>
                </div>
                <img
                  src={founderImage}
                  alt="Portraitbild von Jascha"
                  className="h-48 w-36 shrink-0 rounded-2xl object-cover object-top"
                  loading="lazy"
                />
              </article>
            </div>
          </section>
          <PortfolioSection />
          <footer className="px-6 py-12 text-center text-[#1f335b]">
            <h2 className="font-sora text-2xl font-bold">Passt der Rückruf-Ablauf zu deinem Betrieb?</h2>
            <p className="mt-3 text-sm text-[#4a6188]">Lass uns mit deinem Alltag anfangen, nicht mit einem Website-Paket.</p>
            <button
              type="button"
              onClick={() => openContact()}
              className="mt-5 rounded-xl bg-[#9e1c1c] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#861717]"
            >
              Rückruf-Ablauf besprechen
            </button>
          </footer>
        </div>
      </main>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        prefillMessage={contactMessage}
      />
    </div>
  );
}