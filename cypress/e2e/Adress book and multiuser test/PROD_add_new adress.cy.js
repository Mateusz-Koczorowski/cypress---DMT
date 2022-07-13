describe('Add new adress to adress book', () => {

    it('Add new adress', () =>{ 
        //visit DMT
       cy.visit('https://drukomat.pl/') 
       //cy.visit('https://drukomat.pl/') 

        //accept cookies
        cy.wait(1000);
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
        cy.get('.main-search__input-container').should('be.visible');

  
        //login
        cy.get('.user-menu__link').should('be.visible');
        cy.get('a[href*="/sign-in"]').click({force: true});
        //cy.url().should('eq', 'https://drukomat.pl/sign-in');
        cy.get('#_username').type('mateusz.koczorowski@coloursfactory.pl');
        cy.get('#_password').type('ColoursMat2021');
        cy.get('#button').click();
        cy.wait(7000);
    
  
        //check if it's HP
        cy.url().should('eq', 'https://www.drukomat.pl/');
        cy.get('.main-search__input-container').should('be.visible');
    
        //click "Mój drukomat"
        cy.get('[class="btn btn-blue-light btn-ir user-menu__link-anchor dropdown-toggle"]').click()
        cy.wait(3000)

        //goto adress book
        cy.contains('a','Książka adresowa').click({foce: true});
        cy.wait(3000);
        cy.url().should('eq','https://www.drukomat.pl/address-book')

        //click adding button
        cy.contains('button', 'Dodaj nowy adres').should('be.visible').click({force:true});
        cy.wait(1000)

        //check if window openned
        cy.url().should('eq','https://www.drukomat.pl/address-book/new')

        //fill fields
        cy.get('[name="company-name"]').type('Testowa');
        cy.get('[name="first-name"]').type('Łukasz');
        cy.get('[name="last-name"]').type('Testowy');
        cy.get('[name="street-address"]').type('Testowo 11');
        cy.get('[name="phone-number"]').type('111 111 111');
        cy.get('[name="zip-code"]').type('11111');
        cy.get('[name="city-name"]').type('Testowo');

       //randomly decide if it will be default addres
        if((Math.floor(Math.random()*100)%2==0)){
            cy.get('[name="default"]').check();
        }

        //randomly decide if it will be no name sender addres
        if((Math.floor(Math.random()*100)%3==0)){
            cy.get('[name="no-name"]').check();
        }
        cy.wait(2000)

        cy.contains('button', 'Zapisz').should('be.visible').click({force:true});

        //check if it's sucesfull
        cy.url().should('eq','https://www.drukomat.pl/address-book')
    })
  })