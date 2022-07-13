function generateString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * (characters.length)));
   }
   return result;
}
function generateString2(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * (characters.length)));
   }
   return result;
}
const Names = ['Łukasz', 'Hubert', 'Kaźmierz', 'Taco', 'Jack', 'John', 'Mateusz']
const SecondNames = ['Kowalski', 'Nowak', 'Grzybek', 'Wiśniewski', "O'Neil", 'Wyborowy', 'Brzęczyszczykiewicz']

function generateRandomInt(range){
    return (Math.floor(Math.random()*range))
}
let username = generateString(5) +'@' + generateString(5) + '.' + generateString2(2)
let password = generateString(8) + generateRandomInt(1)

describe('Add new user to multiuser', () => {

    it('Add new user to multiuser', () =>{ 
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
        cy.contains('a','Multiuser').click({foce: true});
        cy.wait(3000);
        cy.url().should('eq','https://stage.drukomat.co/multiuser')

        //click add new user
        cy.contains('button', 'Dodaj nowe konto').should('be.visible').click({force:true});
        cy.wait(1000)

        //chceck url
        cy.url().should('eq','https://stage.drukomat.co/multiuser/new');

        //fill data
        cy.get('[name="first-name"]').type(Names[generateRandomInt(6)]);
        cy.get('[name="last-name"]').type(SecondNames[generateRandomInt(6)]);
        cy.get('[name="email"]').type(username);
        cy.get('[name="password"]').type(password)

        //random check - account administration
        if(generateRandomInt(3)==1){
            cy.get('[name="account_admin"]').check().should('be.checked');
        }
        //random check - take order
        if(generateRandomInt(3)==1){
            cy.get('[name="order_placement"]').check().should('be.checked');
        }
        //random check - payments
        if(generateRandomInt(3)==2){
            cy.get('[name="do_payments"]').check().should('be.checked');
        }
        //random check - preflight
        if(generateRandomInt(3)==2){
            cy.get('[name="preflight"]').check().should('be.checked');
        }

        //options of email notifications
        //only user's account
        if(generateRandomInt(1)==1){
            cy.get('[name="mail_messages"]').first().check().should('be.checked');
        }
        //all acounts
        else{
            cy.get('[name="mail_messages"]').last().check().should('be.checked');
        }

        //save user
        cy.wait(2000);
        cy.contains('button', 'Zapisz').should('be.visible').click({force:true});
        cy.wait(2000);
        cy.get('[class="alerts-container"]').should('be.visible');
        cy.wait(2000);
    })
    it('Login on new account', () =>{
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
        cy.get('#_username').type(username);
        cy.get('#_password').type(password);
        cy.get('#button').click();
        cy.wait(7000);

        //check url after first login
        cy.url().should('eq','https://stage.drukomat.co/account-settings/zgody')

        //accept approvals (required)
        cy.get('[id="approval_regulations"]').click();

        //save settings
        cy.wait(2000)
        cy.contains('button', 'Zapisz').should('be.visible').click({force:true});
        cy.wait(4000)

        //check if it's HP
        cy.url().should('eq', 'https://stage.drukomat.co/');
    })
  })