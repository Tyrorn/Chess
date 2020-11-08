class knight extends chessPiece{

    constructor(location,color,id){
        super(location,color,id)
        this.image =  new Image();
        this.name = color+"'s Knight";
        this.image.src = "./images/"+color+"Knight.png";
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

        if(rowPos+2<9){ //checking north direction

            if(colsPos-1>-1){//to the left
                if(document.getElementById(rowPos+2 + cols[colsPos-1])._variable==0){
                    moveslist.push(rowPos+2 + cols[colsPos-1]);
                }
                else if(document.getElementById(rowPos+2 + cols[colsPos-1])._variable._color != this._color){
                    moveslist.push(rowPos+2 + cols[colsPos-1]);
                }

            }
            if(colsPos+1<8){//to the right
                if(document.getElementById(rowPos+2 + cols[colsPos+1])._variable==0){
                    moveslist.push(rowPos+2 + cols[colsPos+1])
                }
                else if(document.getElementById(rowPos+2 + cols[colsPos+1])._variable._color != this._color){
                    moveslist.push(rowPos+2 + cols[colsPos+1])
                }
                

            }
        }
        if(rowPos-2>0){//checking south direction

            if(colsPos-1>-1){//checks left
                if(document.getElementById(rowPos-2 + cols[colsPos-1])._variable==0){
                    moveslist.push(rowPos-2 + cols[colsPos-1])
                }
                else if(document.getElementById(rowPos-2 + cols[colsPos-1])._variable._color != this._color){
                    moveslist.push(rowPos-2 + cols[colsPos-1])
                }
                

            }
            if(colsPos+1<8){//checks right
                if(document.getElementById(rowPos-2 + cols[colsPos+1])._variable==0){
                    moveslist.push(rowPos-2 + cols[colsPos+1])
                }
                else if(document.getElementById(rowPos-2 + cols[colsPos+1])._variable._color != this._color){
                    moveslist.push(rowPos-2 + cols[colsPos+1])
                }
                
                

            }
        }
        if(colsPos-2>=0){//checking left

            if(rowPos-1>0){//checks down
                if(document.getElementById(rowPos-1 + cols[colsPos-2])._variable==0){
                    moveslist.push(rowPos-1 + cols[colsPos-2])
                }
                else if(document.getElementById(rowPos-1 + cols[colsPos-2])._variable._color != this._color){
                    moveslist.push(rowPos-1 + cols[colsPos-2])
                }
            }
            if(rowPos+1<9){//checks up
                if(document.getElementById(rowPos+1 + cols[colsPos-2])._variable==0){
                    moveslist.push(rowPos+1 + cols[colsPos-2])
                }
                else if(document.getElementById(rowPos+1 + cols[colsPos-2])._variable._color != this._color){
                    moveslist.push(rowPos+1 + cols[colsPos-2])
                }
                


            }
        }
        if(colsPos+2<=7){//checking right

            if(rowPos-1>0){//checks up
                if(document.getElementById(rowPos-1 + cols[colsPos+2])._variable==0){
                    moveslist.push(rowPos-1 + cols[colsPos+2]);
                }
                else if(document.getElementById(rowPos-1 + cols[colsPos+2])._variable._color != this._color){
                    moveslist.push(rowPos-1 + cols[colsPos+2]);
                }
                
                

            }
            if(rowPos+1<9){//checks down
                if(document.getElementById(rowPos+1 + cols[colsPos+2])._variable==0){
                    moveslist.push(rowPos+1 + cols[colsPos+2]);
                }
                else if(document.getElementById(rowPos+1 + cols[colsPos+2])._variable._color != this._color){
                    moveslist.push(rowPos+1 + cols[colsPos+2]);
                }
                
                

            }
        }
        this.moves = moveslist;
    };


}