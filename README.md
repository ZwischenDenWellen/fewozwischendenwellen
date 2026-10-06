# Ferienwohnung Meerblick & Dünenzauber – Website & iCal-Kalendersync

Eine moderne, responsive und conversion-starke Ferienwohnung-Website mit integriertem **RFC 5545 iCalendar-Synchronisationssystem** und sofortiger Einsatzbereitschaft für **GitHub Pages** (100% statisch, kostenfrei, ohne Serverkosten).

---

## 🌟 Highlights & Funktionen

1. **Informationen zur Ferienwohnung**:
   - **Bildergalerie**: 5-teiliges Fotomosaik + interaktive Vollbild-Lightbox mit Tastatursteuerung.
   - **Ausstattung & Zimmeraufteilung**: Detaillierte Beschreibungen für Hauptschlafzimmer (Boxspringbett), 2. Schlafzimmer, Wohnküche und Wellnessbad.
   - **Icons & Kategorien**: Highspeed-WLAN, Parkplatz, Südbalkon, Smart-TV, Küche etc.
   - **Lage & Umgebung**: Entfernungen zu Strand (150m), Bäcker, Supermarkt und interaktive Karte mit Routenplaner.
   - **Transparente Preise & Konditionen**: Nebensaison vs. Hauptsaison, Endreinigung, Zingster Kurtaxe, Stornierungsfristen und Kaution.
   - **Gästebewertungen**: Verifizierte 5-Sterne-Erfahrungsberichte.
   - **Persönliches Vermieterprofil**: Alexander & Sabine Meyer mit Telefon, E-Mail, WhatsApp-Link und Antwortzeiten.

2. **iCal Kalendersync (Bidirektional)**:
   - **iCal Import**: Synchronisiert Belegungen von Airbnb, Booking.com, FeWo-direkt oder Google Calendar.
   - **CORS-Fallback-Proxy**: Ermöglicht den Abruf externer Feeds direkt im Browser.
   - **Lokaler Datei-Upload (.ics)**: Manuelles Einlesen beliebiger .ics-Dateien per Drag & Drop.
   - **iCal Export**: 1-Klick-Download einer gültigen `.ics`-Datei oder Kopieren des iCalendar-Feeds zum Einfügen in Airbnb/Booking.
   - **Manuelle Sperrzeiten**: Vermieter können Zeiten für Eigenbedarf oder Renovierung sperren.
   - **Interaktiver Buchungsrechner**: Reisedaten auswählen, Mindestaufenthalt prüfen, Endpreis berechnen und Anfrage direkt per Mail absenden.

3. **Vollständige GitHub Pages Unterstützung**:
   - Vorkonfigurierte relative Base-URL (`base: './'` in `vite.config.ts`).
   - Fertiger GitHub Actions Workflow in `.github/workflows/deploy.yml`.

---

## 🚀 In 4 Schritten auf GitHub Pages veröffentlichen

### 1. Repository auf GitHub erstellen
Erstellen Sie auf [GitHub](https://github.com/new) ein neues Repository (z.B. `ferienwohnung-website`).

### 2. Code hochladen
Führen Sie in Ihrem Terminal im Projektordner folgende Befehle aus:
```bash
git init
git add .
git commit -m "Initial commit Ferienwohnung Website mit iCal"
git branch -M main
git remote add origin https://github.com/IHR-BENUTZERNAME/IHR-REPO.git
git push -u origin main
```

### 3. GitHub Pages aktivieren
- Gehen Sie in Ihrem Repository auf **Settings** &rarr; **Pages**.
- Wählen Sie unter **Build and deployment** &rarr; **Source**: **GitHub Actions**.

### 4. Fertig!
GitHub baut die Seite automatisch in ca. 30 Sekunden. Ihre Website ist abrufbar unter:
`https://<ihr-benutzername>.github.io/<ihr-repo>/`

---

## 📅 Kalendersync mit Airbnb & Booking.com einrichten

### Belegung aus Airbnb in die Website importieren:
1. In Airbnb: Inserat &rarr; *Preise und Verfügbarkeit* &rarr; *Kalender synchronisieren* &rarr; *Kalender exportieren*.
2. Kopieren Sie den `.ics`-Link.
3. Klicken Sie auf Ihrer Website oben rechts auf **Vermieter / iCal** &rarr; *Neuen iCal-Feed hinzufügen* &rarr; Link einfügen & Speichern.

### Belegung dieser Website in Airbnb / Booking.com übertragen:
1. Klicken Sie auf Ihrer Website auf **Vermieter / iCal** &rarr; Reiter **iCal Export**.
2. Laden Sie die `.ics`-Datei herunter oder kopieren Sie den Feed.
3. Fügen Sie diesen bei Airbnb unter *Kalender importieren* ein.
