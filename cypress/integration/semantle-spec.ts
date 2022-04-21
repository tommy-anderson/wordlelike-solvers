//When visiting the app, semantle makes a request to the server to get the answer.
//The request is always made to /similarity/${answer}
//So we spy on the request and type it up.

it('should solve semantle', () => {
    cy.intercept({method:'GET',url:'**/similarity/*'}).as('solution')
    cy.visit('https://semantle.novalis.org/')
    cy.wait('@solution').then((res) => {
        //Close rules modal
        cy.get('#rules-content').should('be.visible')
        cy.get('#rules-close').click()
        cy.get('#rules-content').should('not.be.visible')
        //Type in the answer
        cy.get('#guess').type(res.request.url.substr(res.request.url.lastIndexOf('/')+1))
        cy.get('#guess-btn').click()
        //Confirm you won
        cy.get('#response').should('contain.text','You found it in 1!')
    })
})
