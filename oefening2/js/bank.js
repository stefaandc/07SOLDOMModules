import { UitgavenCanvas } from "./uitgavenCanvas.js";
import { UitgavenRepository } from "./uitgavenRepository.js";

class BankComponent {
  #canvasCategorieen;
  #storage;
  #aantalBezoeken;
  #uitgavenRepository;
  constructor(window) {
    this.#canvasCategorieen = new UitgavenCanvas();
    this.#storage = window.localStorage;
    this.#aantalBezoeken = 1;
    this.#uitgavenRepository = new UitgavenRepository();
  }

  get canvasCategorieen() {
    return this.#canvasCategorieen;
  }

  get storage() {
    return this.#storage;
  }
  get aantalBezoeken() {
    return this.#aantalBezoeken;
  }
  get uitgavenRepository() {
    return this.#uitgavenRepository;
  }

  toHtml() {
    this.#canvasCategorieen.tekenen(this.#uitgavenRepository);
    this.tekst();
  }

  tekst() {
    document.getElementById("aantalBezoeken").innerHTML = this.#aantalBezoeken;
    document.getElementById("data").innerHTML = "";
    this.#uitgavenRepository.uitgaven.forEach((uitgave) => {
      document.getElementById("data").insertAdjacentHTML(
        "beforeend",
        `<div class="aankoop">
        <img src="images/${uitgave.categorie}.png">
        <h4>${uitgave.omschrijving} - €${uitgave.bedrag}</h4>
        <p>${uitgave.datum.datumNotatie()}</p>
      </div>`
      );
    });
  }

  getAantalBezoekenFromStorage() {
    if (this.#storage.getItem("aantalBezoeken")) {
      this.#aantalBezoeken =
        parseInt(this.#storage.getItem("aantalBezoeken")) + 1;
      console.log(this.#aantalBezoeken);
    } else {
      this.#aantalBezoeken = 1;
    }
  }

  setAantalBezoekenInStorage() {
    try {
      this.#storage.setItem("aantalBezoeken", this.#aantalBezoeken);
    } catch (e) {
      if (e === QUOTA_EXCEEDED_ERR) alert("Quota exceeded!");
    }
  }
}

function init() {
  const bankComponent = new BankComponent(this);
  bankComponent.getAantalBezoekenFromStorage();
  bankComponent.setAantalBezoekenInStorage();
  bankComponent.toHtml();
}

window.onload = init;

Date.prototype.datumNotatie = function () {
  const dagen = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
  ];
  return `${dagen[this.getDay()]} ${this.getDate()}/${
    this.getMonth() + 1
  }/${this.getFullYear()}`;
};
