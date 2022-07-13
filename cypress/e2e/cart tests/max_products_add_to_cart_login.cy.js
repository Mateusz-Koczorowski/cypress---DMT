describe('Add random amount of product (max 120) to cart and order. Login before taking orders', () => {

    it('Take order', () =>{ 
        //visit DMT
       cy.visit('https://dmt:Gp92457K6o2@stage.drukomat.co/') 
       //cy.visit('https://stage.drukomat.co/') 

        //accept cookies
        cy.wait(1000);
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);

  
        //login
        cy.get('.user-menu__link').should('be.visible');
        cy.get('a[href*="/sign-in"]').click({force: true});
        cy.url().should('eq', 'https://stage.drukomat.co/sign-in');
        cy.get('#_username').type('mateusz_koczorowski@wp.pl');
        cy.get('#_password').type('Pomidor123');
        cy.get('#button').click();
        cy.wait(7000);
    
  
        //check if it's HP
        cy.url().should('eq', 'https://stage.drukomat.co/');
    
        for(var i=0; i<(Math.floor(Math.random()*120+1)); i++){
        //go to /products and pick randomly group or product
            cy.contains("a", "Produkty").click();
            cy.url('https://stage.drukomat.co/produkty').should('eq', 'https://stage.drukomat.co/produkty')
            var products = ['Wizytówki', 'Ulotki', 'Banery', 'Kalendarze', 'Notesy', 'Arkusze plano', 'Teczki ofertowe', 'Gazetki reklamowe']
            var chosenProduct = products[(Math.floor(Math.random()*8))]
        //window.alert(chosenProduct)
            cy.contains("a", chosenProduct).click({force: true});
            cy.get('.ga-product-name').should('be.visible').click({force: true, multiple: true });
                
    
        //add to cart
            cy.wait(12000)
            cy.get('.prices--container').click({force: true, multiple: true});
            cy.contains("button", 'Dodaj').click();
        }
        //go to cart and take order
        cy.get('.short-cart.jsShortCart').click({force:true}).wait(1000).click();
        cy.url().should('eq','https://stage.drukomat.co/cart');
        cy.contains('button','Zamawiam').click();
        cy.wait(7000);
    })
  })