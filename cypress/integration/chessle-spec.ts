import { checkIfSquareIsEmpty, playMove } from "./utils/chessle-utils"

it('should solve chessle', () => {
    cy.intercept('GET','https://d1vwq1uqg5c4bn.cloudfront.net/').as('chessleReq')
    cy.visit('https://jackli.gg/chessle/')
    cy.wait('@chessleReq').then((interception) => {
        const moves = JSON.parse(interception.response.body).moves
        console.log(moves)
        const index = 1
        playMove(moves[index],index%2===0)
        // moves.forEach((move,index) => {
        //     playMove(move,index%2===0)
        // })
    })
})


// function findPieceSquare(piece:string,color:'w'|'b'){
//     cy.get(`[data-piece=${color}${piece}]`).parent({log:false}).invoke({log:false},'attr','data-square')
// }

