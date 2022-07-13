describe('Take a simple order with files (cart) WARNING - RUN ON PRODUCTION', () => {

    it('Take order', () =>{ 
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
    
        
        cy.contains("a", "Produkty").click();
        cy.get('.main-search__input-container').should('be.visible');
        //cy.url('https://drukomat.pl/produkty').should('eq', 'https://drukomat.pl/produkty')
        var products = ['Wizytówki', 'Ulotki', 'Banery', 'Kalendarze', 'Notesy', 'Arkusze plano', 'Teczki ofertowe', 'Gazetki reklamowe']
        var chosenProduct = products[(Math.floor(Math.random()*8))]
        cy.get('.main-search__input-container').should('be.visible');
        //window.alert(chosenProduct)
        cy.contains("a", chosenProduct).click({force: true});
        cy.get('.ga-product-name').should('be.visible').click({force: true, multiple: true });
                
    
        //add to cart
        cy.get('.main-search__input-container').should('be.visible');
            cy.wait(12000)
            cy.get('.prices--container').click({force: true, multiple: true});
            cy.contains("button", 'Dodaj').click();
            cy.get('.main-search__input-container').should('be.visible');
            
        //go to cart and take order
        cy.get('.short-cart.jsShortCart').click({force:true}).wait(1000).click();
        //cy.url().should('eq','https://drukomat.pl/cart');
        cy.get('.main-search__input-container').should('be.visible');
        cy.contains('button','Zamawiam').click();
        cy.wait(7000);
    
        //upload files to order
        cy.get('.main-search__input-container').should('be.visible');
        cy.get('[data-ga-tab-name="workWithFiles"]').click();
        var file1 = 'file1.jpg';
        var file2 = 'file2.jpg';
        var file3 = 'file3.jpg';
        var file4 = 'file4.jpg';
        var file5 = 'file5.jpg';
        var file6 = 'file6.jpg';
        var file7 = 'file7.jpg';
        var file8 = 'file8.jpg';
        var file9 = 'file9.jpg';
        cy.wait(7000);
        cy.get('[title="file input"]').attachFile(file1);
        cy.get('[title="file input"]').attachFile(file2);
        cy.get('[title="file input"]').attachFile(file3);
        cy.get('[title="file input"]').attachFile(file4);
        cy.get('[title="file input"]').attachFile(file5);
        cy.get('[title="file input"]').attachFile(file6);
        cy.get('[title="file input"]').attachFile(file7);
        cy.get('[title="file input"]').attachFile(file8);
        cy.get('[title="file input"]').attachFile(file9);
        cy.wait(12000)
        cy.get('.btn.btn-bordered.pc-auto-assign').click()
        cy.wait(4000)
        cy.get('[class="preflight-file-options scale-action"]').click({multiple: true})
        cy.wait(4000)
        cy.contains('a','Prześlij do weryfikacji').click({force: true})
        cy.get('[class="top-reject-button-contener"', {timeout: 1000000}).should('be.visible')
        cy.get('[class="pc-verification-errors files-status--container error"]').then($box =>{
            if($box.is(':visible')){
              cy.get('[class="btn btn-white btn-xs accept-error"]').then($errors_buton => {
                if($errors_buton.is(':visible')){
                  cy.get('[class="btn btn-white btn-xs accept-error"]').click({multiple: true});
                  cy.wait(2000)
                  cy.get('[class="pc-accept-project btn"]').click({multiple: true})
                  cy.wait(7000)
                }
              })
            }
            else{
                cy.wait(2000)
                cy.get('[class="pc-accept-project btn"]').click({multiple: true})
                cy.wait(7000)
            }
          })
    })
  })