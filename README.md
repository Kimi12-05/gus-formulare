# GuS Formulare

Prototyp einer Web-App (PWA) für das Ingenieurbüro Gebbeken u. Scherenberg.

## Was die App kann
- PDF- und Excel-Vorlagen hochladen
- Daraus Berichte erstellen und auf dem iPhone ausfüllen
  - PDF: eingebaute Formularfelder ausfüllen, sonst Text, Datum, Haken und Unterschrift direkt auf die Seite setzen
  - Excel: Felder werden automatisch erkannt (Text neben einem leeren Feld, Kästchen wie ☐)
- Mit Finger oder Stift unterschreiben
- Als PDF oder Excel teilen, zum Beispiel an Foxit, Mail oder WhatsApp
- Bericht als Datei an Kollegen geben, die ihn in ihrer App weiterbearbeiten
- Funktioniert nach dem ersten Öffnen auch offline

## Wichtig
- Alle Vorlagen und Berichte bleiben nur auf dem jeweiligen Gerät. Es gibt keinen Server.
- Prototyp: Formatierungen in Excel-Dateien gehen beim Export teilweise verloren.

## Bibliotheken
- pdf-lib 1.17.1 (MIT) – `lib/pdf-lib.min.js`
- PDF.js 6.2.108 (Apache 2.0) – `lib/pdfjs.min.js`, `lib/pdfjs.worker.min.js`
- SheetJS 0.18.5 (Apache 2.0) – über cdnjs geladen
