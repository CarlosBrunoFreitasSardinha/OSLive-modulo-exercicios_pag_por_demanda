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

      export function gera_cor(coresJaUtilizadas:Array<Processo> = []): string{
                  var coresDisponiveis:Array<string> = [
                        "#0780A7",
                        "#785964",
                        "#bf565c",
                        "#4B706A",
                        "#6A5ACD",
                        "#a5e3fc",
                        "#D2691E",
                        "#FF69B4",
                        "#FFD700",
                        "#696969"
                  ]
                  for (var i = 0; i < coresJaUtilizadas.length; i++ ) {
                        var pos = coresDisponiveis.indexOf(coresJaUtilizadas[i].cor);
                        if(pos!=-1)coresDisponiveis.splice(pos, 1);
                  }
            return coresDisponiveis[Math.floor(Math.random() * coresDisponiveis.length)];
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
