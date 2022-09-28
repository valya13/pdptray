describe('PDP', () => {

    it('Product description  on the page', () => {
        cy.visit("https://www.jennair.com/ranges/dual-stacked-burner-ranges/p.noir-36-dual-fuel-professional-range-with-gas-grill.jdrp636hm.html?usersurvey=false")
        Cypress.on('uncaught:exception', (err, runnable) => {
                return false
        })

    
        cy.on('window:confirm', () => false)
        cy.wait(2000)
        
        //GET PRODUCT SKU
        cy.get('.breadcrumbs-list-item-last').then(function(sku){
            cy.log(sku.text())
        })

        //GET Product Images  SRC
        cy.get('.dynamic-media-component > img').each(($el, index, $list) => { 
            cy.log('Product Image url is ' + $el.attr('src'))
         })

        //Get product NAME
        cy.get('.pdp-tray__prd-title').then(function(name){
          cy.log(name.text())
        })

       
        //ADD to Package CTA
        cy.get('.pdp-tray__action-buttons > .add-to-package-cta').contains('Add To Package').click({force: true})
        cy.wait(3000)

        //Verify Prroduct ADDed to Package
        cy.get('.css-1f2a48b').contains('BUILD YOUR SUITE')
    
        //Click BUY NOW  CTA
        cy.get('.pdp-tray__price-action-container > a').contains('Buy Now')
             .invoke('attr', 'href')
             .then(href => {
             cy.log(href)
             cy.get('.pdp-tray__action').click({force: true})
           })
           
        //Verified Buy Now button redirect to correct section
        cy.get('.ps-dual-column-local-tab-label > span').contains('SEARCH NEARBY')
        cy.get('.ps-dual-column-local-tab-label > span').should('have.text','\n                                SEARCH NEARBY\n                                \n                                    \n                                \n                            ')
        cy.wait(2000)  
    })
  })