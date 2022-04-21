it('should solve chessle', () => {
    cy.intercept('GET','https://d1vwq1uqg5c4bn.cloudfront.net/').as('chessleReq')
    cy.visit('https://jackli.gg/chessle/')
    cy.wait('@chessleReq').then((interception) => {
        const moves = JSON.parse(interception.response.body).moves
        const index = 1
        playMove(moves[1],index%2===0)
        // moves.forEach((move,index) => {
        //     playMove(move,index%2===0)
        // })
        
    })
})





function playMove(move:string,isOdd:boolean){
    const coloredPiece:ColoredPiece = {
        pieceType:determinePieceType(move),
        color:isOdd?'w':'b'
    }
    const row = move.slice(-1)
    const column = move.slice(-2,-1)

    //moves can be either
    //[a-h][1-8] (for pawn moves)
    //[a-h]x[a-h][1-8] (for pawn captures)
    //[NBRQK][a-h][1-8] (for non-pawn moves)
    //[NBRQK]x[a-h][1-8] (for non-pawn captures)
    //[NBRQK][a-h]x[a-h][1-8] (for ambiguous non-pawn captures)
    const landingSquare:Square = {
        column:column,
        row:row
    }
    console.log(`landingSquare: ${JSON.stringify(landingSquare)}, move: ${move}`)
    console.log(landingSquare)
    console.log(coloredPiece)
    console.log(getPossiblePieceLocations(coloredPiece,landingSquare))
}

function determinePiece(pieceType:string,move){

}


function determinePieceType(move):Piece{
    if(move.includes('N')){
        return 'N'
    }
    else if(move.includes('B')){
        return 'B'
    }
    else if(move.includes('R')){
        return 'R'
    }
    else if(move.includes('Q')){
        return 'Q'
    }
    else if(move.includes('K') || move.includes('0')){
        return 'K'
    }
    else{
        return 'P'
    }
}

// function findPieceSquare(piece:string,color:'w'|'b'){
//     cy.get(`[data-piece=${color}${piece}]`).parent({log:false}).invoke({log:false},'attr','data-square')
// }

function getPossiblePieceLocations(coloredPiece:ColoredPiece,landingSquare:Square,move){
    if(coloredPiece.pieceType==='P'){
        return getPawnLocations(landingSquare,coloredPiece.color)
    }
}



function getPawnLocations(landingSquare,color){
    const charCodeOfRow = landingSquare.row.charCodeAt(0)
    const possibleRows:Row[] = color==='w'? [String.fromCharCode(charCodeOfRow-1),String.fromCharCode(charCodeOfRow-2)]: [String.fromCharCode(charCodeOfRow+1),String.fromCharCode(charCodeOfRow+2)]
    const charCodeOfColumn = landingSquare.column.charCodeAt(0)
    const possibleCols = [String.fromCharCode(charCodeOfColumn-1),String.fromCharCode(charCodeOfColumn),String.fromCharCode(charCodeOfColumn+1)]
    const possibleMoves:Square[] = []
    possibleRows.forEach((row) => {
        possibleCols.forEach((column) => {
            let possibleMove:Square = {row,column}
            possibleMoves.push({row,column})})
        })
    return possibleMoves
}


type Color = 'w'|'b'
type Piece= 'N'|'B'|'R'|'Q'|'K'|'P'
type ColoredPiece = {color:Color,pieceType:Piece}
// ideally should be '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8', but can't get types to work
type Row = string
// ideally should be 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h', but can't get types to work
type Column = string
type Square = {row:Row,column:Column}
type Move = {
    landingSquare:Square,
    pieceType:Piece,
    isCapture:boolean
}