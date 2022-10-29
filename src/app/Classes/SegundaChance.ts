import { Pagina } from './Pagina';
import { MemoriaFisica } from './MemoriaFisica';
import { TAM, STR_MEMORIA_VAZIA, MEMORIA_FISICA_COR} from 'src/app/Bibliotecas/Constantes';

export class SegundaChance {
      public lista: Array<Pagina> = [];
      public historicoBit: Array<Array<number>> = [];

      constructor (){
      }
      memoriaFisicaCheia(memoriaFisica: Array<MemoriaFisica>): number{
            for(var i =0; i< memoriaFisica.length;i++){
                  if(memoriaFisica[i].nome.localeCompare(STR_MEMORIA_VAZIA)==0)return i;
            }
            return -1;
      }

      bitAcesso(num: number):Array<number>{
            var x: Array<number> = [];
            for(var i = 0; i< num;i++){
                  x[i] = Math.floor(Math.random() * 2);
                  // x[i]=1;
            }
            return x;
      }

      segundaChance(_time: number,): number{         
            while(true){
                  for(var i = 0; i< this.historicoBit.length; i++){
                        if(this.historicoBit[i][0] == 0 ){
                              return i;
                        }
                        else {
                              this.historicoBit[i][0] = 0;
                              this.lista[i].timeStamp = _time;
                              _time += 1;

                              var temp = this.lista[i];
                              this.lista.splice(i,1);
                              this.lista.push(temp);
                  
                              var temp2 = this.historicoBit[i];
                              this.historicoBit.splice(i,1);
                              this.historicoBit.push(temp2);
                              i--;
                        }
                  }
            }
      }
      
      paginaVitimaEscolhida(): number{
            
            for(var i = 0; i< this.historicoBit.length; i++){
                  if(this.historicoBit[i][0] == 0 ){
                        return i;
                  }
            }
            return 0;
      }
      addPaginaEmMemoriaFisica(memoriaFisica: Array<MemoriaFisica>, paginaX: Pagina, timestamp:number):number{
            var posicaoParaInsercao:number = this.memoriaFisicaCheia(memoriaFisica);
            var posMemoFisica = 0;
            var TAM: number = 4;

            if(posicaoParaInsercao == -1){
                  posicaoParaInsercao = 
                  posMemoFisica = this.lista[posicaoParaInsercao].indiceMemoriaFisica;
                  
                  this.lista[posicaoParaInsercao].timeStamp = 0;
                  this.lista[posicaoParaInsercao].indiceMemoriaFisica = -1;

                  this.lista.splice(posicaoParaInsercao, 1);
                  this.historicoBit.splice(posicaoParaInsercao, 1);
            }
            else{
                  posMemoFisica = posicaoParaInsercao;
            }
            
            memoriaFisica[posMemoFisica].nome = paginaX.toString();
            memoriaFisica[posMemoFisica].cor = paginaX.cor;
            memoriaFisica[posMemoFisica].horaCarga = timestamp;

            paginaX.indiceMemoriaFisica = posMemoFisica;
            paginaX.timeStamp = timestamp;

            this.lista.push(paginaX);
            this.historicoBit.push(this.bitAcesso(TAM));

            return posMemoFisica;
      }

      removerProcesso(memoriaFisica: Array<MemoriaFisica>, paginaX: Pagina):number{
            var pos = this.lista.indexOf(paginaX);

            for(var i=0; i< TAM;i++){
                if(memoriaFisica[i].nome.localeCompare(paginaX.toString())==0){
    
                  
                  memoriaFisica[i].nome = STR_MEMORIA_VAZIA;
                  memoriaFisica[i].cor = MEMORIA_FISICA_COR;
                  memoriaFisica[i].horaCarga = 0;
    
                  paginaX.indiceMemoriaFisica = -1;;
                  paginaX.timeStamp = 0;
                  
                  this.lista.splice(pos, 1);
                  this.historicoBit.splice(pos, 1);
                  
                  return i;
                }
            }
        return -1;
      }
      
      
}