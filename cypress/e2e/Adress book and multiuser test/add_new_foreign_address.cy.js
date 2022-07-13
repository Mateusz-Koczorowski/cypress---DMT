describe('Add new adress to adress book', () => {

    it('Add new adress', () =>{ 
        //visit DMT
        cy.visit('https://dmt:Gp92457K6o2@stage.drukomat.co/') 
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
        cy.get('#_username').type('mateusz_koczorowski@wp.pl');
        cy.get('#_password').type('Pomidor123');
        cy.get('#button').click();
        cy.wait(7000);
    
  
        //check if it's HP
        cy.url().should('eq', 'https://stage.drukomat.co/');
        cy.get('.main-search__input-container').should('be.visible');
    
        //click "Mój drukomat"
        cy.get('[class="btn btn-blue-light btn-ir user-menu__link-anchor dropdown-toggle"]').click()
        cy.wait(3000)

        //goto adress book
        cy.contains('a','Książka adresowa').click({foce: true});
        cy.wait(3000);
        cy.url().should('eq','https://stage.drukomat.co/address-book')

        //click adding button
        cy.contains('button', 'Dodaj nowy adres').should('be.visible').click({force:true});
        cy.wait(1000)

        //check if window openned
        cy.url().should('eq','https://stage.drukomat.co/address-book/new')

        //select country
        cy.get('[class="btn dropdown-toggle form-control input-blue select-with-flags"]').should('be.visible').click()
        const country = ['Niemcy','Czechy','Słowacja','Austria','Belgia','Dania','Francja',
        'Holandia','Rumunia','Szwecja','Węgry','Włochy','Bułgaria',
        'Chorwacja','Estonia','Finlandia','Hiszpania','Irlandia','Litwa','Luksemburg','Łotwa','Portugalia','Słowenia']
        let selectedCountry =country[Math.floor(Math.random()*23+1)]
        cy.contains('span',selectedCountry).click()
        
        //select postal code for country
        let postalCode;
        if(['Niemcy','Czechy','Słowacja','Francja','Szwecja','Włochy','Chorwacja','Estonia','Finlandia','Hiszpania'].includes(selectedCountry)){
            postalCode='81002'
        }
        else if(['Austria','Belgia','Dania','Węgry','Bułgaria','Luksemburg','Łotwa','Słowenia'].includes(selectedCountry)){
            postalCode='8012'
        }
        else if(['Holandia'].includes(selectedCountry)){
            postalCode='8012 AA'
        }
        else if(['Rumunia'].includes(selectedCountry)){
            postalCode='999222'
        }
        else if(['Irlandia'].includes(selectedCountry)){
            postalCode='CF62 3DT'
        }
        else if(['Litwa'].includes(selectedCountry)){
            postalCode='LT-50143'
        }
        else if(['Portugalia'].includes(selectedCountry)){
            postalCode='4410-247'
        }
        //alert(postalCode)
        
        //fill fields
        cy.get('[name="company-name"]').type('Testowa');
        cy.get('[name="first-name"]').type('Łukasz');
        cy.get('[name="last-name"]').type('Testowy');
        cy.get('[name="street-address"]').type('Testowo 11');
        cy.get('[name="phone-number"]').type('111111111');
        cy.get('[name="zip-code"]').type(postalCode);
        cy.get('[name="city-name"]').type('Testowo');

        //randomly decide if it will be default addres
        /*if((Math.floor(Math.random()*100)%2==0)){
            cy.get('[name="default"]').check({force:true});
        } */

        //randomly decide if it will be no name sender addres
        //if((Math.floor(Math.random()*100)%3==0)){
            //cy.get('[name="no-name"]').check({force:true});
        //}
        cy.wait(2000)
        cy.contains('button', 'Zapisz').should('be.visible').click({force:true});

        //check if it is succesfull
        cy.url().should('eq','https://stage.drukomat.co/address-book')
    })
  })