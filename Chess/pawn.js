class pawn extends chessPiece{
    
    constructor(location,color,id){
        super(location,color,id)
        this.image =  new Image();
        this.name = color+"'s pawn";
        this.image.src = "./images/"+color+"Pawn.png";
        this.startLocation = location;
        this.attackList =[];
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
        this.attackList = [];
        moveslist.push(loc);

        if(this._color =="white"){
            if(rowPos >1){//white pawns
                if( document.getElementById(rowPos-1 + cols[colsPos])._variable ==0){
                    moveslist.push(rowPos-1 + cols[colsPos]);
                    if(loc.localeCompare(this.startLocation) == 0 && document.getElementById(rowPos-2 + cols[colsPos])._variable ==0 ){
                        moveslist.push(rowPos-2 + cols[colsPos]);
                    }
                }
                if(colsPos>0){
                    if(document.getElementById(rowPos-1 + cols[colsPos-1])._variable !=0&& document.getElementById(rowPos-1 + cols[colsPos-1])._variable._color!= this._color){
                        moveslist.push(rowPos-1 + cols[colsPos-1]);
                        
                    }
                    this.attackList.push(rowPos-1 + cols[colsPos-1]);
                }
                if(colsPos<7){
                    if(document.getElementById(rowPos-1 + cols[colsPos+1])._variable !=0&& document.getElementById(rowPos-1 + cols[colsPos+1])._variable._color!= this._color){
                        moveslist.push(rowPos-1 + cols[colsPos+1]);
                        
                    }
                    this.attackList.push(rowPos-1 + cols[colsPos+1]);
                }
            } 


        }
        else{
            if(rowPos <8){//black pawns
                if(document.getElementById(rowPos+1 + cols[colsPos])._variable ==0){
                    moveslist.push(rowPos+1 + cols[colsPos]);
                    if(loc.localeCompare(this.startLocation) == 0 && document.getElementById(rowPos+2 + cols[colsPos])._variable == 0 ){
                        moveslist.push(rowPos+2 + cols[colsPos]);
                    }
                }
                if(colsPos>0){
                    if(document.getElementById(rowPos+1 + cols[colsPos-1])._variable !=0 && document.getElementById(rowPos+1 + cols[colsPos-1])._variable._color!= this._color ){
                        moveslist.push(rowPos+1 + cols[colsPos-1]);
                        
                    }
                    this.attackList.push(rowPos+1 + cols[colsPos-1]);
                }
                
                if(colsPos<7){
                    if(document.getElementById(rowPos+1 + cols[colsPos+1])._variable !=0&& document.getElementById(rowPos+1 + cols[colsPos+1])._variable._color!= this._color){
                        moveslist.push(rowPos+1 + cols[colsPos+1]);
                        
                    }

                    this.attackList.push(rowPos+1 + cols[colsPos+1]);
                }
                
            }

    

            
        }
        this.moves = moveslist;
    }
}

