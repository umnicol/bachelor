export {};


describe("Laurafit exam project", () => {
  it("passes", () => {
    cy.visit("https://bachelor-laurafit.vercel.app");
    cy.get("button").should("have.text", "Sign InSign InJOIN NOWJOIN NOWJOIN NOW"); 
  });

   //for testing if button opens a new page
   it('should open a new page when button is clicked', () => { 
  
    cy.visit('https://bachelor-laurafit.vercel.app');

    // Click the button
    cy.get('button.MainHeader_mainheader_button__3uUKp').click();

    // Assert that a new page has been opened
    cy.url().should('include', 'https://bachelor-laurafit.vercel.app/signin');
});

});