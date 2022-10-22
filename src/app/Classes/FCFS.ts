import { Pagina } from './Pagina';
import { MemoriaFisica } from './MemoriaFisica';

export class FCFS {
      public lista: Array<Pagina> = [];

      constructor (){
      }
      memoriaFisicaCheia(memoriaFisica: Array<MemoriaFisica>): number{
            for(var i =0; i< memoriaFisica.length;i++){
                  if(memoriaFisica[i].nome.localeCompare('-')==0)return i;
            }
            return -1;
      }     
      listaVazia():boolean{
            return this.lista.length ==0;
      }

      addPaginaEmMemoriaFisica(memoriaFisica: Array<MemoriaFisica>, paginaX: Pagina, timestamp:number, RespostaAluno: boolean = false):number{
            var posicaoParaInsercao:number = this.memoriaFisicaCheia(memoriaFisica);
            if(posicaoParaInsercao==-1){
                  posicaoParaInsercao = this.lista[0].indiceMemoriaFisica;
                  this.lista[0].timeStamp = 0;
                  this.lista[0].indiceMemoriaFisica = -1;
                  this.lista.shift();
            }
            
            memoriaFisica[posicaoParaInsercao].nome = paginaX.toString();
            memoriaFisica[posicaoParaInsercao].cor = paginaX.cor;
            memoriaFisica[posicaoParaInsercao].horaCarga = timestamp;

            paginaX.indiceMemoriaFisica = posicaoParaInsercao;
            paginaX.timeStamp = timestamp;
            
            if(!RespostaAluno)this.lista.push(paginaX);

            return posicaoParaInsercao;
      }
      
      removerProcesso(memoriaFisica: Array<MemoriaFisica>, paginaX: Pagina) : number{
            var TAM: number = 8;
            var strMemoFisicaCor: string = '#7FB174';
            var strMemoVazia: string = '-';
            var pos = this.lista.indexOf(paginaX);

            for(var i=0; i< TAM;i++){
                if(memoriaFisica[i].nome.localeCompare(paginaX.toString()) == 0){
    
                  memoriaFisica[i].nome = strMemoVazia;
                  memoriaFisica[i].cor = strMemoFisicaCor;
                  memoriaFisica[i].horaCarga = 0;
    
                  paginaX.indiceMemoriaFisica = -1;;
                  paginaX.timeStamp = 0;
                  
                  this.lista.splice(pos, 1);
                  
                  return i;
                }
            }
        return -1;
      }
      
}