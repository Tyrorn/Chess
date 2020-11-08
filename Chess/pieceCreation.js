function addPieces(){
    var colors = ["black","white"];
    
    for (let i=0;i<2;i++){
       addPawns(colors[i]);
       addKnight(colors[i]);
       addBishops(colors[i]);
        addCastles(colors[i]);
        addQueen(colors[i]);
        addKing(colors[i]);
    }
}

function createPiece(piece, color){
    let boardblock = document.getElementById(piece._location);
    let context = boardblock.getContext("2d");
    
    piece.image.onload = function(){
        context.drawImage(piece.image,0,0,boardblock.width,boardblock.height);
    }
    if(color =="white"){
        whitePieces.push(piece);
        
    }
    else{
        blackPieces.push(piece);
        
   }
   boardblock._variable = piece;
   pieceid++;
}

function addKnight(color){
    for (let i=0;i<2;i++){
        let location;
        if(color =="white"){
            location = ["8B","8G"];
            
        }
        else{
            location = ["1B","1G"];
       }
       let myKnight = new knight(location[i],color,pieceid );
        createPiece(myKnight, color);
    }
}
function addPawns(color){
    for (let i=0;i<8;i++){
        let location;
        if(color =="white"){
            location = ["7A","7B","7C","7D","7E","7F","7G", "7H"];
            
        }
        else{
            location = ["2A","2B","2C","2D","2E","2F","2G", "2H"];
       }
        let myPawn = new pawn(location[i],color,pieceid);
        createPiece(myPawn, color);

    }
}
function addCastles(color){
    for (let i=0;i<2;i++){
        let location;
        if(color =="white"){
            location = ["8A","8H"];
            
        }
        else{
            location = ["1A","1H"];
       }
       let myCastle = new castle(location[i],color,pieceid);
       createPiece(myCastle, color);

    }
}
function addBishops(color){
    for (let i=0;i<2;i++){
        let location;
        if(color =="white"){
            location = ["8C","8F"];
            
        }
        else{
            location = ["1C","1F"];
       }
        let myBishop = new bishop(location[i],color,pieceid);
        createPiece(myBishop, color);

    }
}
function addQueen(color){
    let location;
    if(color =="white"){
        location = ["8E"];
            
     }
    else{   
         location = ["1E"];
       }
    let myQueen = new queen(location[0],color,pieceid);
    createPiece(myQueen, color);
    
}
function addKing(color){
    let location;
    if(color =="white"){
        location = ["8D"];
            
     }
    else{   
         location = ["1D"];
       }
    let myKing = new king(location[0],color,pieceid);
    createPiece(myKing, color);
}