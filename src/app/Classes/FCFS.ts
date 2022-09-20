import { Pagina } from './Pagina';
import { MemoriaFisica } from './MemoriaFisica';
import { Processo } from './Processo';

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
      addPaginaEmMemoriaFisica(memoriaFisica: Array<MemoriaFisica>, proc: Processo, num: number, timestamp:number, RespostaAluno: boolean = false):number{
            var posicaoParaInsercao:number = this.memoriaFisicaCheia(memoriaFisica);
            if(posicaoParaInsercao==-1){
                  posicaoParaInsercao = this.lista[0].indiceMemoriaFisica;
                  this.lista[0].timeStamp = 0;
                  this.lista[0].indiceMemoriaFisica = -1;
                  this.lista.shift();
            }
            
            memoriaFisica[posicaoParaInsercao].nome = proc.pagina[num].toString();
            memoriaFisica[posicaoParaInsercao].cor = proc.cor;
            memoriaFisica[posicaoParaInsercao].horaCarga = timestamp;

            proc.pagina[num].indiceMemoriaFisica = posicaoParaInsercao;
            proc.pagina[num].timeStamp = timestamp;
            
            if(!RespostaAluno)this.lista.push(proc.pagina[num]);

            return posicaoParaInsercao;
      }
      removerProcesso(memoriaFisica: Array<MemoriaFisica>,proc: Processo, num:number):number{
            var TAM: number = 8;
            var strMemoFisicaCor: string = '#7FB174';
            var strMemoVazia: string = '-';
            var pos = this.lista.indexOf(proc.pagina[num]);

            for(var i=0; i< TAM;i++){
                if(memoriaFisica[i].nome.localeCompare(proc.pagina[num].toString())==0){
    
                  
                  memoriaFisica[i].nome = strMemoVazia;
                  memoriaFisica[i].cor = strMemoFisicaCor;
                  memoriaFisica[i].horaCarga = 0;
    
                  proc.pagina[num].indiceMemoriaFisica = -1;;
                  proc.pagina[num].timeStamp = 0;
                  
                  this.lista.splice(pos, 1);
                  
                  return i;
                }
            }
        return -1;
      }
      
}