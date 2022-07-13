describe('Take wizytówki or ulotki order with crop and files (cart)', () => {

    function generateRandom(min, max) {

        // find diff
        let difference = max - min;
    
        // generate random number 
        let rand = Math.random();
    
        // multiply with difference 
        rand = Math.floor( rand * difference);
    
        // add with min value 
        rand = rand + min;
    
        return rand;
    }
        it('Take order', () =>{ 
            //visit DMT
            cy.viewport('iphone-xr')
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
        
            
            var products = ['https://dmt:Gp92457K6o2@stage.drukomat.co/ulotki', 'https://dmt:Gp92457K6o2@stage.drukomat.co/wizytowki']
            var chosenProduct = products[generateRandom(0,1)]
            cy.visit(chosenProduct)
                    
        
            //add to cart
            cy.wait(5000)
            //cy.get('div[data-property-id="crop"]').click({force: true});
            cy.contains('div','Brak').click()
            if(chosenProduct=='https://dmt:Gp92457K6o2@stage.drukomat.co/ulotki')
            {
                cy.get('[name="customParameter-width"]').type(generateRandom(50,99))
                cy.get('[name="customParameter-height"]').type(generateRandom(80,210))
            }
            else
            {
                cy.get('[name="customParameter-width"]').type(generateRandom(50,85))
                cy.get('[name="customParameter-height"]').type(generateRandom(35,55))
            }
            cy.contains('button', 'Akceptuj').click()

            /*cy.get('[class="error-container"]').then($errorCropBox => {
                while($errorCropBox.is(':visible'))
                {
                    if(chosenProduct=='https://dmt:Gp92457K6o2@stage.drukomat.co/ulotki')
                    {
                        cy.get('[name="customParameter-width"]').type(generateRandom(50,99))
                        cy.get('[name="customParameter-height"]').type(generateRandom(80,210))
                    }
                    else
                    {
                        cy.get('[name="customParameter-width"]').type(generateRandom(50,85))
                        cy.get('[name="customParameter-height"]').type(generateRandom(35,55))
                    }
                    cy.contains('button', 'Akceptuj').click()
                }
            })*/
            cy.wait(4000)
            cy.get('.prices--container').click({force: true, multiple: true});
            cy.contains("button", "Zamów").click();
        
            //upload files to order
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
    
        cy.wait(7000);
        cy.get('[data-ga-tab-name="payment"]').click();
        cy.contains("span", "Przejdź do zapłaty").click();
        cy.wait(5000);
        cy.contains("span", "płatność odroczona").click();
        cy.wait(5000);
        cy.get('#payment_button').click({force: true});
        cy.wait(5000);
        cy.contains("a", "Powrót").click();
        })
      
    })