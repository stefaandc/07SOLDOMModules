import { Vacature } from "./vacature.js";
import { vacatures } from "./vacatureArray.js";
export class VacaturesRepository {
  #vacatures = [];
  constructor() {
    this.vacaturesVullen();
  }

  get vacatures() {
    return this.#vacatures;
  }

  voegVacatureToe(id, titel, functieomschrijving, profiel, bedrijf, plaats) {
    this.#vacatures.push(
      new Vacature(id, titel, functieomschrijving, profiel, bedrijf, plaats)
    );
  }

  vacaturesVullen() {
    vacatures.forEach(
      ([id, titel, functieomschrijving, profiel, bedrijf, plaats]) =>
        this.voegVacatureToe(
          id,
          titel,
          functieomschrijving,
          profiel,
          bedrijf,
          plaats
        )
    );
  }

  filterOpZoekTermen(zoektermen) {
    return this.#vacatures.filter((value) => value.bevatZoekterm(zoektermen));
  }
}
