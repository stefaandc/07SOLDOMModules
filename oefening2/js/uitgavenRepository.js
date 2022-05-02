import { Uitgave } from "./uitgave.js";
import { uitgaven } from "./uitgavenArray.js";

export class UitgavenRepository {
  #uitgaven = [];
  constructor() {
    this.uitgavenOpvullen();
  }

  get uitgaven() {
    return this.#uitgaven;
  }

  voegUitgaveToe(uitgave) {
    this.#uitgaven.push(uitgave);
  }

  uitgavenOpvullen() {
    uitgaven.forEach(([id, datum, bedrag, omschrijving, categorie]) =>
      this.voegUitgaveToe(
        new Uitgave(id, datum, bedrag, omschrijving, categorie)
      )
    );
  }

  geefCategorieen() {
    return [
      ...new Set(this.uitgaven.map((uitgave) => uitgave.categorie).sort()),
    ];
  }

  totaalBedragUitgaven() {
    return this.#uitgaven.reduce(
      (totaal, uitgave) => totaal + uitgave.bedrag,
      0
    );
  }

  uitgavenPerCategorie(categorie) {
    return this.#uitgaven.reduce((totaal, uitgave) => {
      return uitgave.categorie === categorie
        ? (totaal += uitgave.bedrag)
        : totaal;
    }, 0);
  }
}
