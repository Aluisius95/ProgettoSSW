export class libElem {
    autore: string;
    titolo: string;
    posizione: string;
    prestito: any;
    constructor(
      autore: string,
      titolo: string,
      posizione: string,
      prestito: any
    ) {
      this.autore = autore;
      this.titolo = titolo;
      this.posizione = posizione;
      this.prestito = prestito;
    }
  }
  