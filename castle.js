class castle extends chessPiece{
    
    constructor(location,color,id){
        super(location,color,id)
        this.image =  new Image();
        this.name = color+"'s Castle";
        this.image.src = "./images/"+color+"Castle.png";
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
        
        for (let i=0;i<4;i++){
            var blocked = false;
            rowPos = loc[0]-0;
            colsPos = cols.indexOf(loc[1])-0;
            while(!blocked){
                switch (i){
                    case 0:
                        rowPos++;
                        break;
                    case 1:
                        rowPos--;
                        break;
                    case 2:
                        colsPos++;
                        break;
                    case 3:
                        colsPos--;
                        break;
                }
               if(rowPos<=8 && rowPos>0 && colsPos>=0 && colsPos<8){
                if(document.getElementById(rowPos+cols[colsPos])._variable !=0){
                    if(document.getElementById(rowPos+cols[colsPos])._variable._color !=this._color){
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
    }
}