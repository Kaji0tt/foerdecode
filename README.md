# Blauzahn Seiten

Dieses Projekt ist eine Vite + React Frontend-Anwendung, die als statisches Build auf klassischem Webspace hochgeladen werden kann.

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

## Deployment auf Webspace

1. Build erstellen:

```bash
npm run build
```

2. Den Inhalt von `dist/` auf den Webspace hochladen (z.B. per FTP/SFTP).

3. Falls der Webspace keine SPA-Rewrites unterstuetzt, sicherstellen, dass direkte Aufrufe auf Unterseiten auf `index.html` umgeleitet werden.

## Hinweis zur Kontaktfunktion

Kontakt- und Angebotsanfragen werden aktuell per `mailto:` vorbereitet. Dadurch funktioniert das Frontend ohne eigenes Backend.

Wenn Sie spaeter serverseitiges Versenden moechten, kann ein kleines Formular-Endpoint (z.B. PHP, Node oder Serverless Function) angebunden werden.
