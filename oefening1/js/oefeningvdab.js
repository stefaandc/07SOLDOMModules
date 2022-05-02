import { VacaturesRepository } from "./vacatureRepository.js";

class VdabComponent {
  #zoektermen = [];
  #vacaturesRepository;
  #storage;
  constructor(window) {
    this.#vacaturesRepository = new VacaturesRepository();
    this.#storage = window.localStorage;
  }

  get vacaturesRepository() {
    return this.#vacaturesRepository;
  }
  get zoektermen() {
    return this.#zoektermen;
  }
  get storage() {
    return this.#storage;
  }

  voegZoektermToe = () => {
    const zoekterm = document.getElementById("zoekterm").value;
    if (
      zoekterm === "" ||
      this.zoektermen.find(
        (value) => value.toLowerCase() === zoekterm.toLowerCase()
      )
    )
      document.getElementById("message").innerText =
        "De zoekterm bestaat reeds of heeft geen waarde!";
    else {
      this.zoektermen.push(zoekterm);
      this.setZoektermenInStorage();
      this.showResultaat();
      document.getElementById("zoekterm").value = "";
    }
  };

  verwijderZoekterm(zoekterm) {
    const indexZoekterm = this.#zoektermen.findIndex(
      (value) => zoekterm === value
    );
    this.#zoektermen.splice(indexZoekterm, 1);
    this.setZoektermenInStorage();
    this.showResultaat();
  }

  getZoektermenFromStorage() {
    this.#zoektermen = [];
    if (this.#storage.getItem("VDABZoektermen")) {
      this.#zoektermen = JSON.parse(this.#storage.getItem("VDABZoektermen"));
    }
  }

  setZoektermenInStorage() {
    this.#storage.setItem("VDABZoektermen", JSON.stringify(this.#zoektermen));
  }

  showResultaat() {
    this.zoektermenToHtml();
    this.vacaturesToHtml();
  }

  zoektermenToHtml() {
    document.getElementById("message").innerText = "";
    document.getElementById("zoektermen").innerHTML = "";
    this.#zoektermen.forEach((zoekterm) => {
      const sp = document.createElement("span");
      sp.appendChild(document.createTextNode(zoekterm));
      const img = document.createElement("img");
      img.setAttribute("src", "images/destroy.png");
      img.setAttribute("id", zoekterm);
      sp.appendChild(img);
      document.getElementById("zoektermen").appendChild(sp);
      img.onclick = () => {
        this.verwijderZoekterm(zoekterm);
      };
    });
  }

  vacaturesToHtml() {
    document.getElementById("resultaat").innerHTML = "";
    this.#vacaturesRepository
      .filterOpZoekTermen(this.#zoektermen)
      .forEach((vacature) => {
        const divElement = document.createElement("div");
        const h2Element = document.createElement("h2");
        const h2Text = document.createTextNode(vacature.titel);
        h2Element.setAttribute("class", "vacatureTitel");
        h2Element.appendChild(h2Text);
        const h3Element = document.createElement("h3");
        const h3Text = document.createTextNode(
          vacature.bedrijf + " - " + vacature.plaats
        );
        h3Element.appendChild(h3Text);
        const h4Element1 = document.createElement("h4");
        const h4Text1 = document.createTextNode("Functieomschrijving");
        h4Element1.appendChild(h4Text1);
        const pElement = document.createElement("p");
        const pText = document.createTextNode(vacature.functieomschrijving);
        pElement.appendChild(pText);
        const h4Element2 = document.createElement("h4");
        const h4Text2 = document.createTextNode("Profiel");
        h4Element2.appendChild(h4Text2);
        const ulElement = document.createElement("ul");
        vacature.profiel.forEach((item) => {
          const liElement = document.createElement("li");
          const liText = document.createTextNode(item);
          liElement.appendChild(liText);
          ulElement.appendChild(liElement);
        });
        divElement.appendChild(h2Element);
        divElement.appendChild(h3Element);
        divElement.appendChild(h4Element1);
        divElement.appendChild(pElement);
        divElement.appendChild(h4Element2);
        divElement.appendChild(ulElement);
        document.getElementById("resultaat").appendChild(divElement);
      });
  }
}

function init() {
  const vdabComponent = new VdabComponent(this);
  vdabComponent.getZoektermenFromStorage();
  vdabComponent.showResultaat();
  document.getElementById("zoektermToevoegen").onclick =
    vdabComponent.voegZoektermToe;
}

window.onload = init;
