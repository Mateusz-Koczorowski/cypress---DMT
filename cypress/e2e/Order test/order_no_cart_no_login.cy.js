describe('Take a simple order with files (no cart), but login after press Order in Cart', () => {

    it('Take order', () =>{ 
        //visit DMT
       cy.visit('https://dmt:Gp92457K6o2@stage.drukomat.co/') 
       //cy.visit('https://stage.drukomat.co/') 

        //accept cookies
        cy.wait(1000);
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
  
        //check if it's HP
        cy.url().should('eq', 'https://stage.drukomat.co/');
    
        
        cy.contains("a", "Produkty").click();
        cy.url('https://stage.drukomat.co/produkty').should('eq', 'https://stage.drukomat.co/produkty')
        var products = ['Wizytówki', 'Ulotki', 'Banery', 'Kalendarze', 'Notesy', 'Arkusze plano', 'Teczki ofertowe', 'Gazetki reklamowe']
        var chosenProduct = products[(Math.floor(Math.random()*8))]
        //window.alert(chosenProduct)
        cy.contains("a", chosenProduct).click({force: true});
        cy.get('.ga-product-name').should('be.visible').click({force: true, multiple: true });
                
        //take order
        cy.contains("button", "Zamów").click();
        cy.wait(7000);
            
        //login
        //cy.url().should('eq', 'https://stage.drukomat.co/sign-in');
        cy.get('#_username').type('mateusz_koczorowski@wp.pl');
        cy.get('#_password').type('Pomidor123');
        cy.get('#button').click();
        cy.wait(7000);
    
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

        cy.get('[data-ga-tab-name="payment"]').click();
        cy.contains("span", "Przejdź do zapłaty").click();
        cy.wait(5000);
        cy.contains("span", "przelew").click();
        cy.wait(5000);
        cy.get('#payment_button').click({force: true});
        cy.wait(5000);
        cy.contains("a", "Powrót").click();
    })
  })