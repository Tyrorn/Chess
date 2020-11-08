               let ctx = boardPiece.getContext('2d');
                // if(boardPiece._variable._color == playerTurn){
                if(movingPiece ==0 ){ //select piece
                    if(boardPiece._variable._color == playerTurn){//make sure the piece selected is on the right team (white/black)
                            if(boardPiece._variable!=0){
                                document.getElementById("announcement").innerHTML="";
                                boardPiece._variable.MovesList(boardPiece.id);
                                console.log(boardPiece._variable.name + boardPiece._variable.moves);
                                movingPiece = boardPiece._variable;
                                boardPiece._variable = 0;
                                ctx.clearRect(0,0,boardPiece.width,boardPiece.height);
                                ctx.drawImage(currentPos,0,0,boardPiece.width,boardPiece.height);
                                prevPos = boardPiece;
                            }
                        }

                    // }
                    else{
                        document.getElementById("announcement").innerHTML="It is "+ playerTurn+"'s turn to move.";
                    }

                }
                else{//move piece to location
                    let newLocation = boardPiece.id;
                    if(movingPiece._location == newLocation){//if piece didn't move 
                        //clear the current position holder image
                        prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);
                        //update piece
                        boardPiece._variable = movingPiece;
                        boardPiece._variable._location = newLocation;
                        ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);
                        movingPiece = 0;
                    }
                    else{
                        if(movingPiece.moves.includes(newLocation)){//if piece moved to a position it's allowed to go(in the moveslist of a piece)
                            if(check==true){//check to see if current player is in check
                                //check if moving to new spot player will remain in check
                                let temp = boardPiece._variable;
                                let temp1 = movingPiece;
                                boardPiece._variable = temp1;
                                boardPiece._variable._location = newLocation;
                                boardPiece._variable.MovesList(newLocation);

                                console.log(boardPiece._variable.moves);
                                updateMoveList();
                                console.log(boardPiece._variable.moves);

                                let containsss = movingPiece.moves.includes(enemyLocation);
                                // console.log("checking if in check: "+isCheck());
                                // console.log("2: "+movingPiece.moves);
                                if(!isCheck()){
                                    // console.log("3"+movingPiece);
                                    boardPiece._variable = temp;
                                   // movingPiece.MovesList(movingPiece._location);//might not be necessary????
                                    if(boardPiece._variable ==0){//piece moved to empty spot
                                        //clear x in initial spot
                                        // console.log("4"+movingPiece);
                                        prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);
                                        //update piece
                                        boardPiece._variable = movingPiece;
                                        boardPiece._variable._location = newLocation;
                                        ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);
                                        movingPiece = 0;
                                    }

                                    console.log(boardPiece._variable._color);
                                    console.log(movingPiece);
                                    if (playerTurn =="white"){
                                        playerTurn ="black";
                                    }
                                    else{
                                        playerTurn="white";
                                    }
                                }
                                else{
                                    console.log(containsss);
                                    if(containsss){
                                        console.log("1");
                                        boardPiece._variable = temp;
                                        if(boardPiece._variable._color != movingPiece._color){//piece is taking an enemy piece
                                            //announce that a piece has been taken
                                            console.log("2");
                                            console.log("5"+movingPiece);
                                            console.log("inside taking a piece");
                                            document.getElementById("announcement").innerHTML=movingPiece.name +" has taken " + boardPiece._variable.name;
                                            //clear x in initial spot
                                            prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);
                                            //clear piece taken
                                            ctx.clearRect(0,0,boardPiece.width,boardPiece.height);
                                            removePiece(boardPiece._variable._id);
                                            
                                            //update piece
                                            boardPiece._variable = movingPiece;
                                            boardPiece._variable._location = newLocation;
                                            ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);
                                            movingPiece = 0;
                                        }
                                        if (playerTurn =="white"){
                                            playerTurn ="black";
                                        }
                                        else{
                                            playerTurn="white";
                                        }
                                    }
                                    else{
                                        movingPiece._location = prevPos.id;
                                        boardPiece._variable = temp;
                                        document.getElementById("announcement").innerHTML== "Move not valid, you will still be in check";
                                    }
                                   
                                }

                            }
                            else{
                                if(boardPiece._variable ==0){//piece moved to empty spot
                                    //clear x in initial spot
                                    prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);
                                    //update piece
                                    boardPiece._variable = movingPiece;
                                    boardPiece._variable._location = newLocation;
                                    ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);
                                    movingPiece = 0;
                                }
                                else if(boardPiece._variable._color != movingPiece._color){//piece is taking an enemy piece
                                    //announce that a piece has been taken
                                    document.getElementById("announcement").innerHTML=movingPiece.name +" has taken " + boardPiece._variable.name;
                                    //clear x in initial spot
                                    prevPos.getContext('2d').clearRect(0,0,boardPiece.width,boardPiece.height);
                                    //clear piece taken
                                    ctx.clearRect(0,0,boardPiece.width,boardPiece.height);
                                    
                                    removePiece(boardPiece._variable._id);
        
                                    //update piece
                                    boardPiece._variable = movingPiece;
                                    boardPiece._variable._location = newLocation;
                                    ctx.drawImage(boardPiece._variable.image,0,0,boardPiece.width,boardPiece.height);
                                    movingPiece = 0;
                                }
                                if (playerTurn =="white"){
                                    playerTurn ="black";
                                }
                                else{
                                    playerTurn="white";
                                }
                                if(isCheck()){
                                    document.getElementById("announcement").innerHTML=playerTurn + "is in Check!";
                                }
                            }


                            //update moveList of pieces
                            updateMoveList(boardPiece._variable._color);
                            //change players turn
                            if(isCheck()){
                                document.getElementById("announcement").innerHTML=playerTurn + "is in Check!";
                            }

                            //is next player in check?

    
                        }

                    }
                }

            })