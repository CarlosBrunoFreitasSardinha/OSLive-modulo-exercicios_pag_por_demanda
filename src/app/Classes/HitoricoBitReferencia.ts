import { Pagina } from './Pagina';
import { MemoriaFisica } from './MemoriaFisica';
import { Processo } from './Processo';

export class HitoricoBitReferencia {
      public lista: Array<Pagina> = [];
      public historicoBit: Array<Array<number>> = [];

      constructor (){
      }
      memoriaFisicaCheia(memoriaFisica: Array<MemoriaFisica>): number{
            for(var i =0; i< memoriaFisica.length;i++){
                  if(memoriaFisica[i].nome.localeCompare('-')==0)return i;
            }
            return -1;
      }

      bitAcesso(num: number):Array<number>{
            var x: Array<number> = [];
            for(var i = 0; i< num;i++){
                  x[i] = Math.floor(Math.random() * 2);
            }
            return x;
      }

      verificaBitReferencia(): number{
            var posicaoMenosAcessada = 0;
            var count = 0;
            var pos = 0;
            var zero: Array<number> = [];
            var apagar: Array<number> = [];
            var parar:boolean = false;
            
            for(var i =0; i< this.historicoBit.length; i++){
                  if(this.historicoBit[i][0] == 0){
                        zero.push(i);
                        console.log("pos= "+i+" zero - "+this.historicoBit[i][0])
                  }
            }

            while(!parar){
                  pos+=1;
                  apagar = [];
                  
                  for(var i = 0; i< zero.length; i++){
                        if(this.historicoBit[zero[i]][pos] == 0) {
                              posicaoMenosAcessada = zero[i];
                              count+=1;
                        }
                        else apagar.push(zero[i]);
                  }

                  if(pos == 3)parar = true;
                  
                  if(count==0) apagar = [];
                  else if(count == 1)parar = true;
                  else {
                        for( let i of apagar){
                              var x = zero.indexOf(i);
                              zero.splice(x, 1)
                        }
                        posicaoMenosAcessada = zero[0];
                        count=0;
                  }
            }

            return posicaoMenosAcessada;
      }
      
      addPaginaEmMemoriaFisica(memoriaFisica: Array<MemoriaFisica>, proc: Processo, num: number, timestamp:number):number{
            var posicaoParaInsercao:number = this.memoriaFisicaCheia(memoriaFisica);
            var posMemoFisica = 0;
            var TAM: number = 4;

            if(posicaoParaInsercao == -1){
                  posicaoParaInsercao = this.verificaBitReferencia();
                  posMemoFisica = this.lista[posicaoParaInsercao].indiceMemoriaFisica;
                  
                  this.lista[posicaoParaInsercao].timeStamp = 0;
                  this.lista[posicaoParaInsercao].indiceMemoriaFisica = -1;

                  this.lista.splice(posicaoParaInsercao, 1);
                  this.historicoBit.splice(posicaoParaInsercao, 1);
            }
            else{
                  posMemoFisica = posicaoParaInsercao;
            }
            
            memoriaFisica[posMemoFisica].nome = proc.pagina[num].toString();
            memoriaFisica[posMemoFisica].cor = proc.cor;
            memoriaFisica[posMemoFisica].horaCarga = timestamp;

            proc.pagina[num].indiceMemoriaFisica = posMemoFisica;
            proc.pagina[num].timeStamp = timestamp;

            this.lista.push(proc.pagina[num]);
            this.historicoBit.push(this.bitAcesso(TAM));

            return posMemoFisica;
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
                  this.historicoBit.splice(pos, 1);
                  
                  return i;
                }
            }
        return -1;
      }
      
      
}