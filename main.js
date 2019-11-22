var clicks = 0;
var firstPiece;
var firstPieceText;
var firstPieceClass;
var pieceCheckerIterator;
var secondPieceText;
var secondPieceClass;
var i;
var j;
var side;
var castleTemp;
var currentTeam = "whiteTeam";

//check whether the player can castle
function castleCheck(paramID){
    //prompts user which side they want to castle on
    if(document.getElementById(paramID).innerHTML != "NA"){
        side = prompt("Left or Right?");
    }
    //checks which team's turn it was, then uses prompt's input to determine which spaces to check
    if(currentTeam == "whiteTeam"){
        if(side == "Left"){
            if(document.getElementById("58").className == "noTeam" && document.getElementById("59").className == "noTeam" && document.getElementById("60").className == "noTeam"){
                document.getElementById("57").innerHTML = "";
                document.getElementById("57").className = "noTeam";
                document.getElementById("61").innerHTML = "";
                document.getElementById("61").className = "noTeam";
                document.getElementById("59").innerHTML = "King";
                document.getElementById("59").className = "whiteTeam";
                document.getElementById("60").innerHTML = "Rook";
                document.getElementById("60").className = "whiteTeam";
                document.getElementById(paramID).innerHTML = "NA";
                currentTeam = "blackTeam";
                document.getElementById("title").className = "blackTitle";
            }
        }
        if(side == "Right"){
            if(document.getElementById("62").className == "noTeam" && document.getElementById("63").className == "noTeam"){
                document.getElementById("64").innerHTML = "";
                document.getElementById("64").className = "noTeam";
                document.getElementById("61").innerHTML = "";
                document.getElementById("61").className = "noTeam";
                document.getElementById("63").innerHTML = "King";
                document.getElementById("63").className = "whiteTeam";
                document.getElementById("62").innerHTML = "Rook";
                document.getElementById("62").className = "whiteTeam";
                document.getElementById(paramID).innerHTML = "NA";
                currentTeam = "blackTeam";
                document.getElementById("title").className = "blackTitle";
            }
        }
    }
    else if(currentTeam == "blackTeam"){
        if(side == "Left"){
            if(document.getElementById("2").className == "noTeam" && document.getElementById("3").className == "noTeam" && document.getElementById("4").className == "noTeam"){
                document.getElementById("1").innerHTML = "";
                document.getElementById("1").className = "noTeam";
                document.getElementById("5").innerHTML = "";
                document.getElementById("5").className = "noTeam";
                document.getElementById("3").innerHTML = "King";
                document.getElementById("3").className = "blackTeam";
                document.getElementById("4").innerHTML = "Rook";
                document.getElementById("4").className = "blackTeam";
                document.getElementById(paramID).innerHTML = "NA";
                currentTeam = "whiteTeam";
                document.getElementById("title").className = "whiteTitle";
            }
        }
        if(side == "Right"){
            if(document.getElementById("6").className == "noTeam" && document.getElementById("7").className == "noTeam"){
                document.getElementById("8").innerHTML = "";
                document.getElementById("8").className = "noTeam";
                document.getElementById("5").innerHTML = "";
                document.getElementById("5").className = "noTeam";
                document.getElementById("7").innerHTML = "King";
                document.getElementById("7").className = "blackTeam";
                document.getElementById("6").innerHTML = "Rook";
                document.getElementById("6").className = "blackTeam";
                document.getElementById(paramID).innerHTML = "NA";currentTeam = "whiteTeam";
                document.getElementById("title").className = "whiteTitle";
            }
        }
    }
    if(document.getElementById(paramID).innerHTML != "NA"){
        alert("Castle not available at this time.")
    }
}

//moves pieces
function movePiece(paramID){
    clicks++;
    //gets the first piece of a move
    if(clicks % 2 != 0){
        firstPieceText = document.getElementById(paramID).innerHTML;
        firstPiece = document.getElementById(paramID);
        firstPieceClass = document.getElementById(paramID).className;
        //if an empty space is selected for the first piece, remove that click so 'clicks' will stay odd
        if(firstPieceClass == "noTeam"){
            clicks--;
        }
    }
    //gets the second piece
    else{
        secondPieceText = document.getElementById(paramID).innerHTML;
        secondPieceClass = document.getElementById(paramID).className;
        if(firstPieceClass != document.getElementById(paramID).className && firstPieceClass == currentTeam){
            //calls validMove to determine move legality
            if(validMove(firstPiece, document.getElementById(paramID))){
                if(currentTeam == "whiteTeam"){
                    currentTeam = "blackTeam";
                    document.getElementById("title").className = "blackTitle";
                }
                else if(currentTeam = "blackTeam"){
                    currentTeam = "whiteTeam";
                    document.getElementById("title").className = "whiteTitle";
                }
                firstPiece.innerHTML = "";
                firstPiece.className = "noTeam";
                //win state
                if(document.getElementById(paramID).innerHTML == "King"){
                    alert(firstPieceClass + " wins!  Refresh the tab to play again!");
                }
                document.getElementById(paramID).innerHTML = firstPieceText;
                document.getElementById(paramID).className = firstPieceClass;
                //pawn promotion
                if(firstPieceText == "Pawn" && (document.getElementById(paramID).closest('tr').id == "a" || document.getElementById(paramID).closest('tr').id == "h")){
                    document.getElementById(paramID).innerHTML = prompt("Choose a promotion: ");
                }
                //make sure player doesn't put self in check
                for(i = 1; i < 65; i++){
                    if(document.getElementById(i.toString()).innerHTML == "King" && document.getElementById(i.toString()).className == firstPieceClass){
                        for(j = 1; j < 65; j++){
                            if(document.getElementById(j.toString()).className != document.getElementById(i.toString()).className){
                                if(validMove(document.getElementById(j.toString()), document.getElementById(i.toString()))){
                                    alert("cannot put self in check");
                                    firstPiece.innerHTML = firstPieceText;
                                    firstPiece.className = firstPieceClass;
                                    document.getElementById(paramID).innerHTML = secondPieceText;
                                    document.getElementById(paramID).className = secondPieceClass;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//determine move legality
function validMove(pieceOne, pieceTwo){
    //pawn piece rules
    if(pieceOne.innerHTML == "Pawn"){
        if(pieceOne.className == "blackTeam"){
            if(parseInt(pieceOne.id) + 8 == parseInt(pieceTwo.id) && pieceTwo.className == "noTeam"){
                return true;
            }
            if(parseInt(pieceOne.id) + 9 == parseInt(pieceTwo.id) && pieceTwo.className == "whiteTeam"){
                return true;
            }
            if(parseInt(pieceOne.id) + 7 == parseInt(pieceTwo.id) && pieceTwo.className == "whiteTeam"){
                return true;
            }
            if(pieceOne.closest('tr').id == "b"){
                if(parseInt(pieceOne.id) + 16 == parseInt(pieceTwo.id) && pieceTwo.className == "noTeam"){
                    if(document.getElementById((parseInt(pieceOne.id) + 8).toString()).className == "noTeam"){
                        return true;
                    }
                }
            }
        }
        if(pieceOne.className == "whiteTeam"){
            if(parseInt(pieceOne.id) - 8 == parseInt(pieceTwo.id) && pieceTwo.className == "noTeam"){
                return true;
            }
            if(parseInt(pieceOne.id) - 9 == parseInt(pieceTwo.id) && pieceTwo.className == "blackTeam"){
                return true;
            }
            if(parseInt(pieceOne.id) - 7 == parseInt(pieceTwo.id) && pieceTwo.className == "blackTeam"){
                return true;
            }
            if(pieceOne.closest('tr').id == "g"){
                if(parseInt(pieceOne.id) - 16 == parseInt(pieceTwo.id) && pieceTwo.className == "noTeam"){
                    if(document.getElementById((parseInt(pieceOne.id) - 8).toString()).className == "noTeam"){
                        return true;
                    }
                }
            }
        }
    }
    //rook piece rules
    if(pieceOne.innerHTML == "Rook"){
        if(pieceOne.className != pieceTwo.className){
            if((Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 8) == 0 || pieceOne.closest('tr') == pieceTwo.closest('tr')){
                if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 8 == 0){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 8;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 8;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 8;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 8;
                        }
                        return true;
                    }
                }
                if(pieceOne.closest('tr') == pieceTwo.closest('tr')){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 1;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 1;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 1;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 1;
                        }
                        return true;
                    }
                }
            }
        }
    }
    //knight piece rules
    if(pieceOne.innerHTML == "Knight"){
        if(pieceOne.className != pieceTwo.className){
            if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 6 || Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 10 || Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 15 || Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 17){
                return true;
            }
        }
    }
    //bishop piece rules
    if(pieceOne.innerHTML == "Bishop"){
        if(pieceOne.className != pieceTwo.className){
            if((Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 7) == 0 || (Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 9) == 0){
                if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 7 == 0){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 7;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 7;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 7;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 7;
                        }
                        return true;
                    }
                }
                if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 9 == 0){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 9;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 9;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 9;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 9;
                        }
                        return true;
                    }
                }
            }
        }
    }
    //queen piece rules
    if(pieceOne.innerHTML == "Queen"){
        if(pieceOne.className != pieceTwo.className){
            if((Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 7) == 0 || (Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 9) == 0 || (Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 8) == 0 || pieceOne.closest('tr') == pieceTwo.closest('tr')){
                if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 7 == 0){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 7;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 7;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 7;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 7;
                        }
                        return true;
                    }
                }
                if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 9 == 0){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 9;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 9;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 9;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 9;
                        }
                        return true;
                    }
                }
                if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) % 8 == 0){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 8;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 8;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 8;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 8;
                        }
                        return true;
                    }
                }
                if(pieceOne.closest('tr') == pieceTwo.closest('tr')){
                    if(parseInt(pieceOne.id) > parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) - 1;
                        while(pieceCheckerIterator > parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator -= 1;
                        }
                        return true;
                    }
                    if(parseInt(pieceOne.id) < parseInt(pieceTwo.id)){
                        pieceCheckerIterator = parseInt(pieceOne.id) + 1;
                        while(pieceCheckerIterator < parseInt(pieceTwo.id)){
                            if(document.getElementById(pieceCheckerIterator.toString()).className != "noTeam"){
                                return false;
                            }
                            pieceCheckerIterator += 1;
                        }
                        return true;
                    }
                }
            }
        }
    }
    //king piece rules
    if(pieceOne.innerHTML == "King"){
        if(pieceOne.className != pieceTwo.className){
            if(Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 9 || Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 8 || Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 7 || Math.abs(parseInt(pieceOne.id) - parseInt(pieceTwo.id)) == 1){
                return true;
            }
        }
    }
}
