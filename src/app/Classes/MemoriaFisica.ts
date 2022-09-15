
export class MemoriaFisica{
    public endereco: number;
    public cor: string;
    public nome: string;
    public horaCarga: number;

      constructor(_endereco: number,  _nome:string, _cor:string, _horaCarga:number){
        this.endereco = _endereco;
        this.cor = _cor;
        this.nome = _nome;
        this.horaCarga = _horaCarga;
      }

      toString():string { //public : by default
        return  "\nEndereco: " + this.endereco+ "_Nome: "+this.nome + " Cor: " + this.cor+ " TimeStamp: " + this.horaCarga;
      }
    }