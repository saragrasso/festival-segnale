// Programma generato dai dati: legge eventi.json e sedi.json
// e costruisce una scheda per ogni evento.

const griglia = document.querySelector('#griglia-eventi');
const messaggio = document.querySelector('#stato-programma');

function mostraMessaggio(testo, èErrore = false) {
  messaggio.textContent = testo;
  messaggio.hidden = false;
  messaggio.classList.toggle('errore', èErrore);
}

function nascondiMessaggio() {
  messaggio.hidden = true;
}

// Legge un file JSON; se il file manca o non è valido, lancia un errore.
async function leggiJson(percorso) {
  const risposta = await fetch(percorso);
  if (!risposta.ok) {
    throw new Error(percorso + ' non raggiungibile (stato ' + risposta.status + ')');
  }
  return risposta.json();
}

// "2026-06-12" -> "Venerdì 12 giugno"
function formattaData(data) {
  const giorno = new Date(data + 'T00:00:00Z');
  if (Number.isNaN(giorno.getTime())) {
    return data;
  }
  const testo = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }).format(giorno);
  return testo.charAt(0).toUpperCase() + testo.slice(1);
}

function creaElemento(tag, classe, testo) {
  const elemento = document.createElement(tag);
  if (classe) {
    elemento.className = classe;
  }
  if (testo !== undefined) {
    elemento.textContent = testo;
  }
  return elemento;
}

function creaScheda(evento, sede) {
  const scheda = creaElemento('article', 'event-card');

  const immagine = document.createElement('img');
  immagine.src = evento.immagine;
  immagine.alt = evento.immagine_alt;
  immagine.width = 900;
  immagine.height = 600;
  immagine.loading = 'lazy';

  const corpo = creaElemento('div', 'event-body');

  const meta = creaElemento(
    'p',
    'event-meta',
    formattaData(evento.data) + ' · ' + evento.orario + ' · ' + evento.categoria
  );
  const titolo = creaElemento('h3', '', evento.titolo);
  const descrizione = creaElemento('p', '', evento.descrizione);

  const luogo = creaElemento('p', 'event-place');
  const etichetta = creaElemento('strong', '', 'Sede:');
  luogo.append(etichetta, ' ' + (sede ? sede.nome : 'Sede da definire'));

  corpo.append(meta, titolo, descrizione, luogo);
  scheda.append(immagine, corpo);
  return scheda;
}

async function caricaProgramma() {
  mostraMessaggio('Caricamento del programma…');

  try {
    const [eventi, sedi] = await Promise.all([
      leggiJson('dati/eventi.json'),
      leggiJson('dati/sedi.json')
    ]);

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error('I file JSON non hanno il formato atteso');
    }

    if (eventi.length === 0) {
      griglia.replaceChildren();
      mostraMessaggio('Nessun evento in programma.');
      return;
    }

    // Per ritrovare una sede dal suo id: sede_id -> sede
    const sediPerId = new Map(sedi.map(function (sede) {
      return [sede.id, sede];
    }));

    const schede = eventi.map(function (evento) {
      return creaScheda(evento, sediPerId.get(evento.sede_id));
    });

    griglia.replaceChildren(...schede);
    nascondiMessaggio();
  } catch (errore) {
    console.error(errore);
    griglia.replaceChildren();
    mostraMessaggio('Il programma non è disponibile.', true);
  }
}

caricaProgramma();