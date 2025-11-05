const statusElem = document.getElementById('status');
const orszagokElem = document.getElementById('orszagok');
const keresoElem = document.getElementById('kereso');

let orszagLista = [];

function orszagKartya(orszag) {
    return `
    <div class="orszag_kartya">
        <img src="${orszag.flags.svg}" alt="Zászló" style="width:100%; height:100px; object-fit:cover; border-radius:4px;">
        <h3>${orszag.name.common}</h3>
        <p class=fovaros>Főváros: ${orszag.capital ? orszag.capital[0] : 'Nincs adat'}</p>
        <p>Régió: ${orszag.region}</p>
    </div>
    `;
}

function megjelenitOrszagok(lista) {
    orszagokElem.innerHTML = lista.map(orszagKartya).join('');
}

function szures(keresendo) {
    const szurt = orszagLista.filter(o =>
        o.name.common.toLowerCase().includes(keresendo.toLowerCase())
    );
    megjelenitOrszagok(szurt);
}

keresoElem.addEventListener('input', e => {
    szures(e.target.value);
});

async function betoltOrszagok() {
    statusElem.textContent = 'Betöltés folyamatban...';
    try {
        const resp = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region');
        if (!resp.ok) throw new Error('Hiba a betöltés során!');
        orszagLista = await resp.json();
        statusElem.textContent = '';
        megjelenitOrszagok(orszagLista);
    } catch (err) {
        statusElem.innerHTML = `<span style="color:red;">HIBA</span>: ${err.message}`;
    }
}

betoltOrszagok();
