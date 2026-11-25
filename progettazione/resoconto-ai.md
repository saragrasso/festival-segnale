# Resoconto del lavoro con l'AI

## Sessione 1 · 24–25 novembre

- Struttura di `info.html`: ho chiesto di controllare il file. Il chatbot ha trovato una `</section>` chiusa troppo presto in «Come arrivare». Ho usato il file corretto e verificato in Live Preview che la pagina fosse identica a prima.
- Completare i JSON: ho chiesto `eventi.json` e `sedi.json` completi, presi dal mio Programma e da Info e luoghi. Ho usato i file proposti, con i nomi delle sedi 2 e 3 costruiti dal chatbot. Ho verificato che si aprissero nel browser da Live Preview.
- Scheda dati: ho chiesto `dati/SCHEMA.md` con i sette punti richiesti e lo schema Evento–Sede in Mermaid, usando solo i campi dei JSON. Ho usato il file senza modifiche. Su GitHub ho controllato tabelle e diagramma.
- Programma dai dati: ho chiesto di togliere le sei schede dall'HTML e di crearle con `fetch` da `eventi.json` e `sedi.json`. Ho chiesto anche i messaggi per caricamento, nessun evento, errore e «Sede da definire». Ho usato `programma.html`, `programma.js` e un blocco in `style.css`. Ho controllato le sei schede e le sedi in Live Preview.
- Meteo a Torino adesso: ho chiesto un riquadro in Info e luoghi con temperatura, vento e ora, letti da Open-Meteo. Ho chiesto anche la fonte con link, la nota «meteo di oggi» e l'errore limitato al riquadro. Ho usato il codice proposto e controllato che galleria e mappa funzionassero come prima.
- Prove di verifica: ho eseguito le cinque prove, una alla volta, con Ctrl+F5 e ripristino dei file.
  - Nome sede cambiato: il nuovo nome compare nelle schede dei suoi eventi.
  - `[]` in `eventi.json`: compare «Nessun evento in programma.»
  - `sedi.json` rinominato: compare «Il programma non è disponibile.»
  - `sede_id` 99: l'evento compare con «Sede da definire».
  - Indirizzo meteo sbagliato: errore solo nel riquadro, galleria e mappa funzionano.