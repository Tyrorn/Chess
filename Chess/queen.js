class queen extends chessPiece{

    constructor(location,color,id){
        super(location,color,id)
        this.image =  new Image();
        this.name = color+"'s Queen";
        this.image.src = "./images/"+color+"Queen.png";
        this.MovesList(location);


    }

    get MovesAvailable(){
        return this.moves;
    }
    set MovesAvailable(loc){
        moves = this.MovesList(loc);
    }

    MovesList(loc){
        let rowPos = loc[0]-0;
        let colsPos = cols.indexOf(loc[1])-0;
        let moveslist = [];
        moveslist.push(loc);

        for (let i=0;i<8;i++){
            var blocked = false;
            rowPos = loc[0]-0;
            colsPos = cols.indexOf(loc[1])-0;
            while(!blocked){
                switch (i){
                    case 0:
                        rowPos++;
                        colsPos++;
                        break;
                    case 1:
                        rowPos++;
                        colsPos--;
                        break;
                    case 2:
                        rowPos--;
                        colsPos++;
                        break;
                    case 3:
                        rowPos--;

                        colsPos--;
                        break;
                    case 4:
                        rowPos++;
                        break;
                    case 5:
                        rowPos--;
                        break;

                    case 6:
                        colsPos++;
                        break;
                    case 7:
                        colsPos--;
                        break;

                }
               if(rowPos<=8 && rowPos>0 && colsPos>=0 && colsPos<8){//within board
                if(document.getElementById(rowPos+cols[colsPos])._variable !=0){ //if its not empty continue,  else add move
                    if(document.getElementById(rowPos+cols[colsPos])._variable._color !=this._color){//if its enemy color, add to move list then block
                        moveslist.push(rowPos + cols[colsPos]);
                    }
                    blocked = true;

                }
                else{
                    moveslist.push(rowPos + cols[colsPos]);
                }
 
               }
               else{
                   blocked=true;
               }

            }
        }
        this.moves = moveslist;
    };


}