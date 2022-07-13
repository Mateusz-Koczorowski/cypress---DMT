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

describe('Register on random mail and password', () => {

    it('Add new user to multiuser', () =>{ 
        //visit DMT
        cy.visit('https://dmt:Gp92457K6o2@stage.drukomat.co/') 
       //cy.visit('https://drukomat.pl/') 

        //accept cookies
        cy.wait(1000);
        cy.get('.btn.btn-blue.jsCookiesAccept').should('be.visible').click();
        cy.wait(1500);
        cy.get('.main-search__input-container').should('be.visible');

  
        
    })
    
  })