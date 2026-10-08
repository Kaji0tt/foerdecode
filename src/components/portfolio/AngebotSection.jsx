import React from "react";
import { motion } from "framer-motion";
import { PhoneMissed, ClipboardList, UserCircle2 } from "lucide-react";

const services = [
  {
    title: "1. Anruf oder Webanfrage auffangen",
    text: "Wir prüfen, wie nach einem verpassten Anruf eine Anfrage aufgenommen werden kann und wie dein Webformular dazu passt. Telefonie, Erreichbarkeit und mögliche Anbindungen klären wir vor einer Umsetzung.",
    Icon: PhoneMissed,
  },
  {
    title: "2. Die nötigen Angaben erfassen",
    text: "Serviceart, Dringlichkeit nach eigener Aussage, Postleitzahl des Einsatzorts und gewünschte Rückrufzeit bzw. Kontaktweg – plus die für den Rückruf nötigen Kontaktdaten. Fehlende oder unklare Angaben bleiben als solche sichtbar.",
    Icon: ClipboardList,
  },
  {
    title: "3. Geprüft an Menschen übergeben",
    text: "Die KI bereitet eine Zusammenfassung vor, keine Entscheidung. Eine zuständige Person im Betrieb prüft sie vor der weiteren Bearbeitung und übernimmt Rückruf, fachliche Einschätzung, Angebot und Terminabstimmung.",
    Icon: UserCircle2,
  },
];

export default function AngebotSection({ onContactOpen }) {
  return (
    <section id="services" className="relative scroll-mt-24 py-16 sm:py-20" style={{ background: "rgba(242,245,251, 0.76)" }}>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: "#4f648d" }}>
            Der Rückruf-Ablauf
          </p>
          <h2 className="font-sora text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1f335b" }}>
            Vom Erstkontakt zur persönlichen Antwort.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a6188" }}>
            Für kleine lokale Heizungs-, Klima- und Sanitärbetriebe, deren Team unterwegs ist. Ziel ist, Rückrufe mit den nötigen Angaben vorzubereiten und unnötige Rückfragen zu reduzieren. Elektro-, Dach- und andere benachbarte Handwerksbetriebe können nach Prüfung ihres Ablaufs ebenfalls passen.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              className="rounded-2xl border p-6 transition-transform"
              style={{
                borderColor: "rgba(163,183,212,0.28)",
                background: "rgba(249,252,255,0.9)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "rgba(112,142,186,0.16)" }}>
                <service.Icon className="h-5 w-5" style={{ color: "#2f4c79" }} />
              </div>
              <h3 className="mb-3 font-sora text-xl font-semibold" style={{ color: "#213a66" }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4a6188" }}>
                {service.text}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#d5dfee] bg-[#f9fcff] p-6">
            <h3 className="font-sora text-xl font-semibold text-[#213a66]">Klare Grenzen, keine falschen Versprechen.</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#4a6188]">
              <li>Keine Umsatzgarantie und keine Garantie, jede Anfrage zu erfassen oder einen Rückruf in einer bestimmten Zeit zu erreichen.</li>
              <li>Kein Notdienst und keine Notfallbewertung. Bei akuter Gefahr die zuständige Notrufstelle kontaktieren – nicht auf diesen Ablauf warten.</li>
              <li>Keine verbindlichen Diagnosen oder endgültigen Angebote durch die KI. Fachliche Prüfung und finale Preise kommen vom Betrieb.</li>
              <li>Keine Buchungs- oder Termingarantie. Verfügbarkeit und Zusagen klärt dein Team persönlich.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-[#d5dfee] bg-[#f9fcff] p-6">
            <h3 className="font-sora text-xl font-semibold text-[#213a66]">Daten & Verantwortung vorab klären.</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#4a6188]">
              Vor einem Einsatz klären wir, welche Daten wirklich nötig sind, wer Zugriff erhält und wann sie gelöscht werden. Ebenso zu prüfen: eingesetzte Anbieter, Datenflüsse, Rechtsgrundlage, Informationspflichten und gegebenenfalls Verträge zur Auftragsverarbeitung.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4a6188]">
              Gesprächsaufzeichnung ist nicht vorausgesetzt. Falls sie erwogen wird, müssen Zulässigkeit und erforderliche Einwilligungen gesondert geprüft werden. Das ist keine Rechtsberatung und keine Zusicherung von Datenschutz-Compliance.
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-2xl bg-[#1f335b] p-6 text-white sm:p-8">
          <h3 className="font-sora text-xl font-semibold">Erst den Alltag verstehen, dann den Umfang festlegen.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#e1e9f5]">
            Wir besprechen deinen bisherigen Rückrufprozess, Einsatzgebiet, Anfragewege und Zuständigkeiten. Daraus ergibt sich, ob der Ablauf passt und welche Einrichtung und laufende Betreuung sinnvoll sind. Umfang und Kosten werden individuell vereinbart.
          </p>
          <button
            type="button"
            onClick={() => onContactOpen?.("Ich möchte den Rückruf-Ablauf besprechen. Mein Betrieb, Einsatzgebiet und bisheriger Ablauf: ")}
            className="mt-5 rounded-xl bg-[#9e1c1c] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#861717]"
          >
            Rückruf-Ablauf besprechen
          </button>
        </div>
      </div>
    </section>
  );
}
