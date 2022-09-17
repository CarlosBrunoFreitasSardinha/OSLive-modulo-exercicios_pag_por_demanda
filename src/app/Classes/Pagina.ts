
export class Pagina{
      public indiceMemoriaLogicaProc: number;
      public indiceMemoriaFisica: number;
      public nome: string;
      public cor: string;
      public timeStamp: number;
      public outro: string;
      
        constructor(_nome: string, _cor:string = "#FFFFFF", _indiceMemoriaLogicaProc: number = 0, _timeStamp: number = 0, _indiceMemoriaFisica: number = -1, _outro:string='') {
          this.nome = _nome;
          this.cor = _cor;
          this.indiceMemoriaLogicaProc = _indiceMemoriaLogicaProc;
          this.indiceMemoriaFisica = _indiceMemoriaFisica;
          this.timeStamp = _timeStamp;
          this.outro = _outro;
          }
          toString():string { //public : by default
            return this.nome + this.indiceMemoriaLogicaProc;
          }
          setindiceMemoriaFisica(_indiceMemoriaFisica: number):void{
            this.indiceMemoriaFisica = _indiceMemoriaFisica;
          }
  }