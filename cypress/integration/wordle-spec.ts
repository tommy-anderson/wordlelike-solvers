//The classic wordle game
//The solution is saved in the app's local storage, so we retrieve it and then type it up.

it('should solve wordle', () => {
    cy.visit('https://www.nytimes.com/games/wordle/index.html')
    cy.get('.overlay').first().should('be.visible')
    cy.get('.overlay').find('game-icon').first().click()
    cy.get('.overlay').first().should('not.be.visible')
    cy.log('getting solution').then(() => {
        getStorage().then(({solution}) => {
            cy.get('body').type(`${solution} {enter}`)
        })
    })
})

function getStorage() {
    return cy.wrap(localStorage.getItem('nyt-wordle-state')).then(JSON.parse).should((parsedStorage) => {
        expect(parsedStorage).to.haveOwnProperty('solution')
    })
}