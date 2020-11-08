class king extends chessPiece{

    constructor(location,color,id){
        super(location,color,id)
        this.image =  new Image();
        this.name = color+"'s King";
        this.image.src = "./images/"+color+"King.png";
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
                    case 4:
                        rowPos++;
                        colsPos++;
                        break;
                    case 5:
                        rowPos++;
                        colsPos--;
                        break;

                    case 6:
                        rowPos--;
                        colsPos++;
                        break;
                    case 7:
                        rowPos--;
                        colsPos--;
                        break;

                }
               if(rowPos<=8 && rowPos>0 && colsPos>0 && colsPos<8){
                    //check enemy positions
                    if(this.enemiesAvailableSpots(rowPos+cols[colsPos])){//true if the spot is safe from opponent pieces
                        if(document.getElementById(rowPos+cols[colsPos])._variable !=0){//if there is a piece there already
                            if(document.getElementById(rowPos+cols[colsPos])._variable._color !=this._color){

                                    moveslist.push(rowPos + cols[colsPos]);
                            }
                            else{
                                blocked = true;
                            }
                            
                        }
                        else{
                            moveslist.push(rowPos + cols[colsPos]);
                            blocked=true;
                        }
                    }
                    else{
                        blocked = true;
                    }
                }
                else{
                    blocked = true;
                }
            }
        }
        this.moves = moveslist;
    };

    enemiesAvailableSpots(loc){
        var position_allowable = true;
        var enemyPieces;
        var enemyColor;
        if (this._color == "white"){
            enemyPieces = blackPieces;
            enemyColor = "black";
        }
        else{
            enemyPieces = whitePieces;
            enemyColor = "white";
        }
            if(enemyPieces === undefined || enemyPieces.length !=0){

                for (let i=0;i<enemyPieces.length;i++){
  
                    for(let j=1;j<enemyPieces[i].moves.length;j++){
                        if(enemyPieces[i].name !=enemyColor+"'s pawn"){
                            if (enemyPieces[i].moves[j] === loc){
                                position_allowable =false;
                            }

                        }
                        else{
                            if(enemyPieces[i].attackList[j] === loc){
                                position_allowable=false;
                                break;
                            }
                        }

                    }
        
                }

            }
        return position_allowable;
    }


}