class chessPiece {
    constructor(location,color,id){
        this._id = id;
        this._location = location;
        this._color = color;
        this.moves=[];
    }
    get Location(){
        return this._location;
    }
    set Location(x){
        this._location = x;
        
    }

}

