
export class Pagina{
      public indiceMemoriaLogicaProc: number;
      public indiceMemoriaFisica: number;
      public nome: string;
      public cor: string;
      public timeStamp: number;
      
        constructor(_nome: string, _cor:string = "#FFFFFF", _indiceMemoriaLogicaProc: number = 0, _timeStamp: number = 0, _indiceMemoriaFisica: number = -1) {
          this.nome = _nome;
          this.cor = _cor;
          this.indiceMemoriaLogicaProc = _indiceMemoriaLogicaProc;
          this.indiceMemoriaFisica = _indiceMemoriaFisica;
          this.timeStamp = _timeStamp;
          }
          toString():string { //public : by default
            return this.nome + this.indiceMemoriaLogicaProc;
          }
          setindiceMemoriaFisica(_indiceMemoriaFisica: number):void{
            this.indiceMemoriaFisica = _indiceMemoriaFisica;
          }
  }