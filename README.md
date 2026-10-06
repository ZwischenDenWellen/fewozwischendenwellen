# Renovierte 3-Zimmer Ferienwohnung im Zentrum der Strände (Oldenburg in Holstein)

Eine moderne, conversion-starke Ferienwohnung-Website mit integriertem **RFC 5545 iCalendar-Synchronisationssystem (FeWo-direkt, Airbnb, Booking.com)** und sofortiger Bereitstellung für **GitHub Pages** (100% statisch, kostenfrei, ohne Serverkosten).

Direkt synchronisiert mit den Inhalten des FeWo-direkt / Vrbo Inserats **p5616861**.

---

## 🌟 Highlights & Fakten zur Ferienwohnung

1. **Informationen zur Ferienwohnung**:
   - **Titel**: *Renovierte 3-Zimmer Ferienwohnung im Zentrum der Strände, WLAN*
   - **Lage**: Oldenburg in Holstein, Schleswig-Holstein (Zentrum der Tourismusregion „OstseeSpitze“ & Halbinsel Wagrien). Ruhige Feldrandlage im Obergeschoss eines Einfamilienhauses mit kostenfreien Parkplätzen direkt an der Straße.
   - **Größe & Raumaufteilung**: **76 m²**, frisch saniert im Jahr 2025 in einem cleanen, gemütlichen maritimen Stil.
   - **Kapazität**: Bis zu **4 Personen** in **2 separaten Schlafzimmern mit 4 Betten** (1 Doppelbett + 2 Einzelbetten).
   - **Badezimmer**: Modernes Bad mit **Duschkabine, WC und zwei Waschbecken**.
   - **Wohn-Essbereich & Küche**: Gemütliches Sofa, bequemer Sessel, Flachbild-TV / Smart-TV, Esstisch sowie separate, voll ausgestattete Küche mit Geschirrspüler, Herd & Backofen.
   - **Zentrale Strandlage**: Nur wenige Fahrminuten zu den Ostseestränden Weissenhäuser Strand (7 Min.), Heiligenhafen (10 Min.) und Fehmarn (18 Min.).

2. **iCal Kalendersync (Bidirektional)**:
   - **FeWo-direkt / Vrbo Feed**: Vorkonfiguriert für Listing p5616861 sowie Airbnb.
   - **CORS-Fallback-Proxy**: Direkter Abruf externer Feeds im Browser.
   - **Lokaler Datei-Upload (.ics)**: Manuelles Einlesen beliebiger .ics-Dateien per Drag & Drop.
   - **iCal Export**: 1-Klick-Download einer gültigen `.ics`-Datei oder Kopieren des Feeds zum Import in FeWo-direkt / Airbnb.
   - **Manuelle Sperrzeiten**: Eigenbedarfssperren flexibel eintragen.
   - **Interaktiver Buchungsrechner**: Reisedaten auswählen, Mindestaufenthalt (3 Nächte) prüfen, Endpreis berechnen und Anfrage direkt absenden.

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
