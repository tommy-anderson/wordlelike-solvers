export function playMove(move:string,isOdd:boolean){
    const coloredPiece:ColoredPiece = {
        pieceType:determinePieceType(move),
        color:isOdd?'w':'b'
    }

    //moves can be either
    //[a-h][1-8] (for pawn moves)
    //[a-h]x[a-h][1-8] (for pawn captures)
    //[NBRQK][a-h][1-8] (for non-pawn moves)
    //[NBRQK]x[a-h][1-8] (for non-pawn captures)
    //[NBRQK][a-h]x[a-h][1-8] (for ambiguous non-pawn captures)
    //In all of those cases, the last two characters are the landing square
    //There are two more notations that are not handled here:
    //0-0 (for short castling), and 0-0-0 (for long castling)
    if(move.includes('0')){
       throw Error('Castling not yet supported')
    }
    const row = move.slice(-1)
    const column = move.slice(-2,-1)

    const landingSquare:Square = {
        column:column,
        row:row
    }
    const possiblePieceLocations = getPossiblePieceLocations(coloredPiece,landingSquare,move)
}

function getPossiblePieceLocations(coloredPiece:ColoredPiece,landingSquare:Square){
    if(coloredPiece.pieceType==='P'){
        return getPawnLocations(landingSquare,coloredPiece.color)
    }
    if(coloredPiece.pieceType==='N'){
        return getKnightLocations(landingSquare,coloredPiece.color)
    }
    if(coloredPiece.pieceType==='B'){
        return getBishopLocations(landingSquare,coloredPiece.color)
    }
    if(coloredPiece.pieceType==='R'){
        return getRookLocations(landingSquare,coloredPiece.color)
    }
    if(coloredPiece.pieceType==='Q'){
        return getQueenLocations(landingSquare,coloredPiece.color)
    }
    if(coloredPiece.pieceType==='K'){
        return getKingLocations(landingSquare,coloredPiece.color)
    }
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

function getPawnLocations(landingSquare:Square,color:Color){
    const charCodeOfRow = landingSquare.row.charCodeAt(0)
    const charCodeOfColumn = landingSquare.column.charCodeAt(0)
    const possibleMoves:Square[] = []
    return possibleMoves
}


export type Color = 'w'|'b'
export type Piece= 'N'|'B'|'R'|'Q'|'K'|'P'
export type ColoredPiece = {color:Color,pieceType:Piece}
// ideally should be '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8', but can't get types to work
export type Row = string
// ideally should be 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h', but can't get types to work
export type Column = string
export type Square = {row:Row,column:Column}
export type Move = {
    landingSquare:Square,
    pieceType:Piece,
    isCapture:boolean
}


export function checkIfSquareIsEmpty(square:Square){
    return cy.get(`[data-square=${square.row}${square.column}]`).then(([result]) => {
        //pieces are img nodes which have a square as a parent
        //we can check if the parent square has an img node
        //determining if there is a piece there
        return(!Array.from(result.childNodes).some((node) => {
            return node.nodeName==='IMG'
        }))
    })
}