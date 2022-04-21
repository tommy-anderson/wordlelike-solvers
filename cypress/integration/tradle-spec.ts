//Tradle contains an iframe that loads data, and the src of that iframe contains the code of a country.
//Tradle also makes a request to **/country.json to get country info, which includes the code of the country.
//We get the iframe src, and then get the country code from the src.
//We spy on the request to get the country data, and we match the country code from the src to the country code in the request.

//Then we pick the country from the guess dropdown and we solve it.

it('should solve semantle', () => {
    cy.intercept({method:'GET',url:'**/country.json'}).as('countriesReq')
    cy.visit('https://oec.world/en/tradle/')
    cy.wait('@countriesReq').then((interception) => {
        const countries:Array<CountryType> = interception.response.body
        cy.get('iframe').then((iframe) => {
            //src comes in the following format:
            //https://oec.world/en/visualize/embed/tree_map/hs92/export/${COUNTRY_CODE}/all/show/2020
            //so we do some string manipulation to get the country code
            
            const code = iframe[0].src.substr(iframe[0].src.lastIndexOf('/export')+1).substr('/export'.length,3)
            const country = countries.find(country => country.label === code)
            //We pick the country from the guess dropdown and we solve it.
            pickCountry(country)
            //We validate that we won
            cy.get('.grid > :nth-child(3)').should('contain.text','🎉')
        })
    })
})


/**
 * Example
 * label: "ago"
 * level: "Country"
 * parent_id: "af"
 * title: "Angola"
 * value: "afago"
 */
type CountryType = {
    label: string,
    level: string,
    parent_id: string,
    title: string,
    value: string
}

function pickCountry(country:CountryType){
    cy.get('.mantine-Autocomplete-dropdown').should('not.exist')
    cy.get("input").should('be.visible')
    cy.get("input").click()
    cy.get('.mantine-Autocomplete-dropdown').should('be.visible')
    cy.get(`[name="${country.title}"]`).click()
    cy.get('.mantine-Autocomplete-dropdown').should('not.exist')
    cy.get("input").should('have.value',country.title)
    cy.get('.text-left > .my-2').click()
}