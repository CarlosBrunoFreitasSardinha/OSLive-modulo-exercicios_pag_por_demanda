import { Processo } from "../Classes/Processo";

export namespace Utils{
      const TAM = 8;
      export function embaralhamentoFisherYates(array:Array<number>):Array<number> {
            for (var i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }

      export function gera_cor(): string{		// gera cor aleatoria
            var hexadecimais = '0123456789ABCDEF';
            var cor = '#';
            // Pega um número aleatório no array acima
            for (var i = 0; i < 6; i++ ) {
            //E concatena à variável cor
                  cor += hexadecimais[Math.floor(Math.random() * 16)];
            }
            return cor;
      }
      export function listaNum(num:number):Array<number>{
            var listNum = [];
            for(var i=0; i<num;i++)listNum.push(i);
            return listNum;
      }
      export function quantPaginas(listProc:Array<Processo>):number{
            var listNum = 0;
            for(let i of listProc)listNum+=i.pagina.length;
            return listNum;
      }

}
