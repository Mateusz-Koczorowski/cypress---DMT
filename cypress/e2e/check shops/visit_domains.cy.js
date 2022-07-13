describe('Visit websites and check if they are working well', () =>{
    it("Visit drukomat.pl", () => {
        cy.visit('https://drukomat.pl')
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
    })

    it("Visit justprint.cz", () => {
        cy.visit('https://justprint.cz')
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
    })

    it("Visit justprint.sk", () => {
        cy.visit('https://justprint.sk')
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
    })

    it("Visit printendo.de", () => {
        cy.visit('https://printendo.de')
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
    })

    it("Visit printendo.com", () => {
        cy.visit('https://printendo.com')
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
    })

    it("Visit printendo.at", () => {
        cy.visit('https://printendo.at')
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
    })
}
)