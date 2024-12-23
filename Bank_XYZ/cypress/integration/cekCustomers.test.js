/// <reference types="cypress"/>
import  BankingPage from "../support/pages/BankingPage";

describe('Validasi fitur Customers', () => {
    const Banking = new BankingPage;
    beforeEach(() => {
        Banking.visit();
        Banking.navigateToManagerLogin();
    });


    it('Harus berhasil mencari customer dengan fungsi search', () => {
        Banking.navigateToCustomer();
        Banking.searchCustomer('Harry');
        cy.get('table').contains('Harry').should('exist');


    });

    it('Harus berhasil melakukan sort kolom First Name', () => {
       //menambah customers
        cy.log('Menambah Customer')
        Banking.clickAddCustomer();
        Banking.fillCustomerDetails('agum','ruswandi','E12456');
        Banking.submitCustomerForm();
        Banking.verifyAlertText('Customer added successfully');

        //validasi penggunaan sort
        Banking.navigateToCustomer();
        cy.log('validasi penggunaan sort pertama')
        Banking.sortFname();
        cy.get('table').contains('td', 'Ron').should('exist');

        //validasi penggunaan sort ke dua
        cy.log('validasi penggunaan sort ke dua')
        Banking.sortFname();
        cy.get('table').contains('td', 'agum').should('exist');
    });
    

    it('Harus berhasil melakukan sort kolom Last Name', () => {
        //menambah customers
        cy.log('Menambah Customer');
        Banking.clickAddCustomer();
        Banking.fillCustomerDetails('agum','ruswandi','E12456');
        Banking.submitCustomerForm();
        Banking.verifyAlertText('Customer added successfully');

        //validasi penggunaan sort
        Banking.navigateToCustomer();
        cy.log('validasi penggunaan sort pertama');
        Banking.sortLname();
        cy.get('table').contains('td', 'Weasly').should('exist');

         //validasi penggunaan sort ke dua
         cy.log('validasi penggunaan sort ke dua')
         Banking.sortFname();
         cy.get('table').contains('td', 'ruswandi').should('exist');
    });

    it('Harus berhasil melakukan sort kolom Postcode', () => {
        //menambah customers
        cy.log('Menambah Customer');
        Banking.clickAddCustomer();
        Banking.fillCustomerDetails('agum','ruswandi','E12456');
        Banking.submitCustomerForm();
        Banking.verifyAlertText('Customer added successfully');

        //validasi penggunaan sort
        Banking.navigateToCustomer();
        cy.log('validasi penggunaan sort pertama');
        Banking.sortPostcd();
        cy.get('table').contains('td','E89898').should('exist');

        //validasi penggunaan sort ke dua
        cy.log('validasi penggunaan sort ke dua')
        Banking.sortPostcd();
        cy.get('table').contains('td', 'E12456').should('exist');

    });

    it('Harus berhasil menghapus customer', () => {
        //menambah customers
        cy.log('Menambah Customer');
        Banking.clickAddCustomer();
        Banking.fillCustomerDetails('agum','ruswandi','E12456');
        Banking.submitCustomerForm();
        Banking.verifyAlertText('Customer added successfully');

        //mencari customer yg akan di delete
        Banking.navigateToCustomer();
        Banking.searchCustomer('agum');

        //validasi nama customer ada di tabel
        cy.log('validasi nama customer ada di tabel');
        cy.get('table').contains('agum').should('exist');

        //menghapus customer
        cy.log('menghapus customer');
        Banking.deleteCustomer();

        //validasi nama customer tidak ada di tabel
        cy.log('validasi nama customer tidak ada di tabel');
        cy.get('table').contains('agum').should('not.exist');
    });

    it('Harus berhasil memvalidasi tombol navigasi Home di halaman Customers', () => {
        Banking.navigateToOpenaccount();
        Banking.navigateTohome();

        //assertion
        cy.get('button[ng-click="home()"]').should('be.visible');
        cy.get('button[ng-click="customer()"]').should('be.visible');
        cy.get('button[ng-click="manager()"]').should('be.visible');
    });

    

});

