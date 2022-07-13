describe('Test accepting cookies random times (min 5, max 20))', () => {

    it('Visit DMT', () =>{
       cy.visit('https://dmt:Gp92457K6o2@stage.drukomat.co/') 
       //cy.visit('https://stage.drukomat.co/') 
    })
  
    it('Accept cookies', () => {
        cy.wait(1000);
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
        for(var i=0; i<(Math.floor(Math.random()*20+5)); i++)
        {
            cy.contains("a","Ustawienia cookies").click({force: true})
            cy.wait(1000);
            cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        }
    })
  
    it('Login and accept', () => {
      cy.get('.user-menu__link').should('be.visible');
      cy.get('a[href*="/sign-in"]').click({force: true});
      cy.url().should('eq', 'https://stage.drukomat.co/sign-in');
      cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
      cy.get('#_username').type('mateusz_koczorowski@wp.pl');
      cy.get('#_password').type('Pomidor123');
      cy.get('#button').click();
      cy.wait(7000);
      for(var i=0; i<(Math.floor(Math.random()*20+5)); i++)
        {
            cy.contains("a","Ustawienia cookies").click({force: true})
            cy.wait(1000);
            cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        }
    })
  

  })