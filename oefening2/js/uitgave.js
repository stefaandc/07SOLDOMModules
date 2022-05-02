export class Uitgave {
  #id;
  #datum;
  #bedrag;
  #omschrijving;
  #categorie;
  constructor(id, datum, bedrag, omschrijving, categorie) {
    this.#id = id;
    this.#datum = datum;
    this.#bedrag = bedrag;
    this.#omschrijving = omschrijving;
    this.#categorie = categorie;
  }

  get id() {
    return this.#id;
  }
  get datum() {
    return this.#datum;
  }
  get bedrag() {
    return this.#bedrag;
  }
  get omschrijving() {
    return this.#omschrijving;
  }
  get categorie() {
    return this.#categorie;
  }
}
