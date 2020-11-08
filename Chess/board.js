var cols=["A","B","C","D","E","F","G","H"];
var rows=[8,7,6,5,4,3,2,1];
var boardCreated =0;
var movingPiece = 0;
var currentPos = new Image();

currentPos.src = "./images/position.png";
var prevPos;
var blackPieces;
var whitePieces;
var pieceid ;
var check ;
var checkmate;
var playerTurn;
var enemyLocation;
var allowedToMove;

function createBoard(){
    playerTurn ="white";
    checkmate = false;
    check = false;
    pieceid =0;
    blackPieces=[];
    whitePieces =[];

    if(boardCreated ==1){
        for (let i=0;i<9;i++){
            let node = document.getElementsByClassName("row")[i];
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
    }
    boardCreated =1;
    for (var i=0;i<9;i++){

        if(i<8){
            for(let j=-1;j<8;j++){
                let boardPiece = document.createElement("canvas");
                if(j==-1){
                    let ctx = boardPiece.getContext("2d");
                    ctx.font = "110px Arial";
                    ctx.style ="bold";
                    ctx.textAlign="center";
                    ctx.fillText(8-i, boardPiece.width/2, boardPiece.height/2+30);
                    boardPiece.style.border ="0px";
                }
                else{
                    boardPiece.id=rows[i]+cols[j];
                    if((j+i)%2==1){
                        boardPiece.style.backgroundColor ="grey";
                    }
                    boardPiece._variable = 0;
                    boardPiece.addEventListener("click",()=>{
                        let ctx = boardPiece.getContext('2d');
        
                        if(movingPiece ==0 ){ //select piece
                            if(boardPiece._variable._color == playerTurn){//make sure the piece selected is on the right team (white/black)
                                    if(boardPiece._variable!=0){
                                        document.getElementById("announcement").innerHTML="";
                                        boardPiece._variable.MovesList(boardPiece.id);
                                        movingPiece = boardPiece._variable;
                                        boardPiece._variable = 0;
                                        ctx.clearRect(0,0,boardPiece.width,boardPiece.height);
                                        ctx.drawImage(currentPos,0,0,boardPiece.width,boardPiece.height);
                                        prevPos = boardPiece;
                                        showAvailableMoves(movingPiece.moves);
                                    }
                                }
        
                            else{
                                document.getElementById("announcement").innerHTML="It is "+ playerTurn+"'s turn to move.";
                            }
                        }
                        else{//move piece to location
                            let newLocation = boardPiece.id;
                            if(movingPiece._location == newLocation){//if piece didn't move 
                                boardPiece._variable = movingPiece;
                                boardPiece._variable._location = newLocation;
                                movePiece(boardPiece,ctx,movingPiece.moves);
                                updateMoveList();
                            }
                            else{
                                if(movingPiece.moves.includes(newLocation)){//if piece moved to a position it's allowed to go(in the moveslist of a piece)
                                    canMove(boardPiece,movingPiece,newLocation)     
                                    if(boardPiece._variable !=0){
                                        if(boardPiece._variable.name.includes("pawn") && (boardPiece._variable._location.includes("8") || boardPiece._variable._location.includes("1"))){
                                            let color = boardPiece._variable._color;
                                            let location = boardPiece._variable._location;
                                            exchangePiece(boardPiece,location,color);
                                        }
                                    }  
                                }

                            }
                            updateMoveList();
                            if(isCheck()){
                                if(isCheckmate()){
                                    document.getElementById("announcement").innerHTML=playerTurn + " is in Checkmate!";
                                }
                                else{
                                    document.getElementById("announcement").innerHTML=playerTurn + " is in Check!";
        
                                }
                            }
        
                        
                        }
        
                    })
                
                }
                document.getElementsByClassName("row")[i].appendChild(boardPiece);
            }
    }
        else{
            for(let j=-1;j<8;j++){
                let boardPiece = document.createElement("canvas");
                if(j>-1){
                    let ctx = boardPiece.getContext("2d");
                    ctx.font = "110px Arial";
                    ctx.style ="bold";
                    ctx.textAlign="center";
                    ctx.fillText(cols[j], boardPiece.width/2, boardPiece.height/2+30);
                }
                boardPiece.style.border ="0px";

                document.getElementsByClassName("row")[i].appendChild(boardPiece);

            }
        }
    }
    
   addPieces();

}
function showAvailableMoves(moveslist){
    for (let i=1;i<moveslist.length;i++){
        var boardPiece = document.getElementById(moveslist[i]);
        var ctx = boardPiece.getContext("2d");
        ctx.fillStyle = "green";
        ctx.globalAlpha = 0.3;
        ctx.arc(boardPiece.width/2, boardPiece.height-50, boardPiece.height*2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}
function hideAvailableMoves(moveslist){

    for (let i=1;i<moveslist.length;i++){
        var boardPiece = document.getElementById(moveslist[i]);
        let temp = 0;
        if(boardPiece._variable!=0){
            temp = boardPiece._variable;
        }
        var ctx = boardPiece.getContext("2d");
        ctx.globalAlpha =1;
        ctx.fillStyle = "rgba(0, 0, 200, 0)";
        ctx.clearRect(0,0,boardPiece.width,boardPiece.height);
        ctx.fill();
        if(temp !=0){
            ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);

        }



    }
}
function canMove(boardPiece,movingPiece,newLocation){
    let ctx = boardPiece.getContext('2d');
    let moveslist = movingPiece.moves;
    if(boardPiece._variable ==0){ //if new spot has no enemy piece on it
        // console.log("in here bro");
        movingPiece.MovesList(newLocation);
        let temp = boardPiece._variable; //here
        boardPiece._variable = movingPiece;//here
        boardPiece._variable._location = newLocation; //here
        updateMoveList();
        if(!isCheck()){
            // console.log("Move is allowable1");
            boardPiece._variable = movingPiece;
            boardPiece._variable._location = newLocation;
            movePiece(boardPiece,ctx,moveslist);
            updateMoveList();
            changeTurn();

            
        }
        else{
            // console.log("move will result in check1");
            movingPiece._location =prevPos.id;//here
            movingPiece.MovesList(prevPos.id);
            boardPiece._variable= temp;//here
            boardPiece._variable._location = newLocation;//here
            updateMoveList();
        }
    }
    else{//else new spot has an enemy piece
        movingPiece.MovesList(newLocation);
        let temp = boardPiece._variable;
        removePiece(boardPiece._variable._id);
        boardPiece._variable= movingPiece;
        boardPiece._variable._location = newLocation;
        updateMoveList();

        if(!isCheck()){
            // console.log("Move is allowable2");
            document.getElementById("announcement").innerHTML=movingPiece.name +" has taken " + temp.name;
            takeEnemyPiece(boardPiece,ctx,moveslist);
            updateMoveList();
            changeTurn();

        }
        else{
            // console.log("move will result in check2");//do nothing as move will result in checking your own king
            movingPiece._location = prevPos.id;
            movingPiece.MovesList(prevPos.id);

            boardPiece._variable= temp;
            boardPiece._variable._location = newLocation;
            if(playerTurn == "black"){
                whitePieces.unshift(boardPiece._variable);
            }
            else{
                blackPieces.unshift(boardPiece._variable);
            }
            updateMoveList();
        }
    }
}
function changeTurn(){
    if (playerTurn =="white"){
                            
        playerTurn ="black";
    }
    else{
        playerTurn="white";
        
    }
}
function movePiece(boardPiece,ctx,moveslist){
    prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);
    hideAvailableMoves(moveslist);

    ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);

    movingPiece = 0;

}
function takeEnemyPiece(boardPiece,ctx,moveslist){

    //clear x in initial spot
    prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);

    ctx.clearRect(0,0,boardPiece.width,boardPiece.height);
    hideAvailableMoves(moveslist);
    
    ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);
    movingPiece = 0;

}
function removePiece(id){
    let index=-1;
    for(let i=0;i<whitePieces.length;i++){
        if(whitePieces[i]._id == id){
            index = i;
            whitePieces.splice(index,1);
            break;
        }
    }
    for(let i=0;i<blackPieces.length;i++){
        if(blackPieces[i]._id == id){
            index = i;
            blackPieces.splice(index,1);
            
            break;
        }
    }

}
function findKing(arr){
    return arr.name.includes("King");

}
function isCheck(){//
    let enemyPieces;
    let yourKing;

    if (playerTurn == "black"){
        enemyPieces = whitePieces;
        enemyColor = "white";
        yourKing = blackPieces[blackPieces.findIndex(findKing)];

    }
    else{
        enemyPieces = blackPieces;
        enemyColor = "black";
        yourKing = whitePieces[whitePieces.findIndex(findKing)];
    }
 

    let index = 0;
    for (let i=0;i<enemyPieces.length;i++){
        if(enemyPieces[i].name !=enemyColor+"'s pawn"){
            break;
        }
        else{
            index++;
        }
    }
    for (let i=index;i<enemyPieces.length;i++){

        for(let j=0;j<enemyPieces[i].moves.length;j++){
            if (enemyPieces[i].moves[j] === yourKing._location){
                return true;
                }
        }

    }

    for(let i =0;i<index;i++){
        for(let j = 0;j<3;j++){
            if(enemyPieces[i].attackList[j] === yourKing._location){
                console.log("piece "+enemyPieces[i].name+" "+ enemyPieces[i]._location +" " + enemyPieces[i].moves);
                return true;
            }
        }
    }
    return false;
    
}
function updateMoveList(){

    for (let i=0;i<whitePieces.length;i++){
        whitePieces[i].MovesList(whitePieces[i]._location);
    }
    for (let i=0;i<blackPieces.length;i++){
        blackPieces[i].MovesList(blackPieces[i]._location);
    }
}

function moveAllowable(boardPiece,movingPiece,newLocation){
    let temp = boardPiece._variable; //here
    let prevPos = movingPiece._location;
    let currentBoardPiece = document.getElementById(movingPiece._location);
    currentBoardPiece._variable =0;
    if(boardPiece._variable ==0){ //if new spot has no enemy piece on it
        movingPiece.MovesList(newLocation);

        boardPiece._variable = movingPiece;//here
        boardPiece._variable._location = newLocation; //here
        updateMoveList();
        if(!isCheck()){
            // console.log("Move is allowable1");
            movingPiece._location =prevPos;//here
            movingPiece.MovesList(prevPos);
            boardPiece._variable = temp;//here
            boardPiece._variable._location = newLocation; //here
            currentBoardPiece._variable = movingPiece;

            updateMoveList();
            return true;
        }
        else{
            // console.log("move will result in check1");
            movingPiece._location =prevPos;//here
            movingPiece.MovesList(prevPos);
            boardPiece._variable= temp;//here
            boardPiece._variable._location = newLocation;//here
            currentBoardPiece._variable = movingPiece;
            updateMoveList();
            return false;
        }
    }
    else{//else new spot has an enemy piece
        movingPiece.MovesList(newLocation);
        removePiece(boardPiece._variable._id);
        boardPiece._variable= movingPiece;
        boardPiece._variable._location = newLocation;
        updateMoveList();

        if(!isCheck()){
            movingPiece._location =prevPos;//here
            movingPiece.MovesList(prevPos);
            boardPiece._variable= temp;//here
            boardPiece._variable._location = newLocation;//here
            currentBoardPiece._variable = movingPiece;

            if(playerTurn == "black"){
                whitePieces.unshift(boardPiece._variable);
            }
            else{
                blackPieces.unshift(boardPiece._variable);
            }
            updateMoveList();
            return true;
        }
        else{
            movingPiece._location =prevPos;//here
            movingPiece.MovesList(prevPos);
            boardPiece._variable= temp;
            boardPiece._variable._location = newLocation;

            if(playerTurn == "black"){
                whitePieces.unshift(boardPiece._variable);
            }
            else{
                blackPieces.unshift(boardPiece._variable);
            }
            currentBoardPiece._variable = movingPiece;

            updateMoveList();
            return false;
        }
    }
}


function isCheckmate(){
    var possibleMoves = false;
    if (playerTurn.localeCompare("black")){
        if(whitePieces.length>=1){//make sure there are more pieces than just the king
            for( let i=0;i<whitePieces.length;i++){//for every piece left
                
                for(let j=1; j<whitePieces[i].moves.length;j++){//check every move that they can make
                    let boardPiece = document.getElementById(whitePieces[i].moves[j]);
                    
                    let newLocation = boardPiece.id;

                    if(moveAllowable(boardPiece,whitePieces[i],newLocation)){
                        possibleMoves =true;
                        console.log("possible spot;" +whitePieces[i].name+whitePieces[i]._location + " to " +whitePieces[i].moves[j]);
                        break;
                    }
                }
            }

        }
    }
    else{
        if(blackPieces.length>=1){//make sure there are more pieces than just the king
            for( let i=0;i<blackPieces.length;i++){//for every piece left
                for(let j=1; j<blackPieces[i].moves.length;j++){//check every move that they can make
                    let boardPiece = document.getElementById(blackPieces[i].moves[j]);
                    let newLocation = boardPiece.id;
                    if(moveAllowable(boardPiece,blackPieces[i],newLocation)){
                        possibleMoves =true;
                        console.log("possible spot; " +blackPieces[i].name +blackPieces[i]._location + " to " + blackPieces[i].moves[j]);
                        break;
                    }
                }
                if(possibleMoves){
                    break;
                }
            }

        }
    }
    if(possibleMoves){
        return false;
    }

    return true;
}
function exchangePiece(boardPiece,location,color){
    var modal = document.getElementById("myModal");


    modal.style.display = "block";
    console.log("color:" +color);

    
    const choice = document.querySelector('#selectPiece');

    choice.onclick = function () {
        const rbs = document.querySelectorAll('input[name="choose"]');
        var selectedValue;
        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }
        let newPiece;
        switch (selectedValue){
            case "Castle":
                console.log("castle");
                newPiece= new castle(location,color,pieceid );
                modal.style.display = "none";
                break;
            case "Knight":
                console.log("Knight");
                modal.style.display = "none";
                newPiece= new knight(location,color,pieceid );

            break;
            case "Queen":
                console.log("Queen");
                newPiece= new queen(location,color,pieceid );
                modal.style.display = "none";

                break;
            case "Bishop":
                newPiece= new bishop(location,color,pieceid );
                modal.style.display = "none";

        }
        removePiece(boardPiece._variable.id);
        boardPiece._variable =0;
        let ctx = boardPiece.getContext('2d')
        ctx.clearRect(0,0,boardPiece.width,boardPiece.height);


        createPiece(newPiece,color);

        updateMoveList();
        if(isCheck()){
            if(isCheckmate()){
                document.getElementById("announcement").innerHTML=playerTurn + " is in Checkmate!";
            }
            else{
                document.getElementById("announcement").innerHTML=playerTurn + " is in Check!";

            }
        }

    };



}