# Förde Code

Dieses Projekt ist eine Vite + React Frontend-Anwendung, die als statisches Build auf klassischem Webspace hochgeladen werden kann.

## Homepage

Die Startseite stellt einen Rückruf-Ablauf für kleine Heizungs-, Klima- und Sanitärbetriebe vor: verpasste Anrufe und Webanfragen erfassen, Angaben strukturieren und vor der persönlichen Bearbeitung durch das Team prüfen lassen. Websites und bisherige Projekte sind ergänzende Fähigkeiten, keine Ergebnisnachweise für diesen Service.

Die Demo ist ein statisches, synthetisches Beispiel ohne echte Kundendaten, Telefonie oder Speicherung. Anbindungen, Datenschutzfragen, Leistungsumfang und Kosten müssen vor einer Umsetzung individuell geklärt werden. Die bestehenden Website-Pakete werden nicht mehr auf der Homepage angezeigt; es gibt dort keine öffentliche Preisliste für den Rückruf-Service.

## Entwicklung lokal

1. Abhaengigkeiten installieren:

```bash
npm install
```

2. Entwicklungsserver starten:

```bash
npm run dev
```

3. Produktionsbuild erstellen:

```bash
npm run build
```

## Prüfungen

```bash
npm run lint
npm run typecheck
npm run build
```

Es ist kein automatisierter Test-Runner eingerichtet. Bei Homepage-Änderungen zusätzlich Desktop- und Mobilansicht, Navigation, Demo-Anker und Kontaktformular im lokalen Browser prüfen.

## Deployment auf Webspace

1. Build erstellen:

```bash
npm run build
```

2. Den Inhalt von `dist/` auf den Webspace hochladen (z.B. per FTP/SFTP).

3. Falls der Webspace keine SPA-Rewrites unterstuetzt, sicherstellen, dass direkte Aufrufe auf Unterseiten auf `index.html` umgeleitet werden.

## Hinweis zur Kontaktfunktion

Kontakt- und Angebotsanfragen werden aktuell per `mailto:` vorbereitet. Dadurch funktioniert das Frontend ohne eigenes Backend.

Der Besucher muss die vorbereitete Nachricht im eigenen E-Mail-Programm selbst absenden; das Formular versendet und speichert keine Anfrage auf einem Server. Keine Kundendaten oder Notfallanfragen in das Kontaktformular eintragen.

Wenn Sie spaeter serverseitiges Versenden moechten, kann ein kleines Formular-Endpoint (z.B. PHP, Node oder Serverless Function) angebunden werden.
