export class buttons {
    cerca: boolean;
    prestito: boolean;
    inserisci: boolean;
    rimuovi: boolean;
    constructor(
      cerca: boolean,
      prestito: boolean,
      inserisci: boolean,
      rimuovi: boolean
    ) {
      this.cerca = cerca;
      this.prestito = prestito;
      this.inserisci = inserisci;
      this.rimuovi = rimuovi;
    }
  }