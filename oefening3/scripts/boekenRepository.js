import { Boek } from "./boek.js";
import { boeken } from "./boekenArray.js";
export class BoekenRepository {
  #boeken = [];
  constructor() {
    this.boekenVullen();
  }

  get boeken() {
    return this.#boeken;
  }

  voegBoekToe(id, titel, afbeelding) {
    this.#boeken.push(new Boek(id, titel, afbeelding));
  }
  // geefBoeken retourneert een deel van de boeken in een array
  // parameter 'vanafBoek' is een nummer en geeft aan vanaf het hoeveelste boek we een deel nemen (eerste boek is nummer 1)
  // parameter 'aantalBoeken' is een nummer en geeft aan hoeveel opeenvolgende boeken we in het deel stoppen
  geefBoeken(vanafBoek, aantalBoeken) {
    return this.#boeken.slice(vanafBoek, vanafBoek + aantalBoeken);
  }

  boekenVullen() {
    boeken.forEach(([id, titel, afb]) => this.voegBoekToe(id, titel, afb));
  }
}
