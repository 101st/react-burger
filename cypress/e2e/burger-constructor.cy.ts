describe('service is available', function () {
  beforeEach(function () {
    cy.viewport(1450, 1100)
    cy.visit('/');
  })

  const itemIngredient = '[data-cy="item-ingredient"]';
  const constructorForm = '[data-cy="constructor-form"]';

  it(`should be available on ${URL}`, function () {
    cy.get(itemIngredient).contains('Краторная булка N-200i').click();
    cy.get('[data-cy="modal"]').contains("Детали ингредиента");
    cy.wait(1000);
    cy.get('[data-cy="modal-close"]').click();

    cy.get(itemIngredient).contains("Флюоресцентная булка R2-D3").trigger('dragstart');
    cy.get(constructorForm).trigger('drop');
    cy.wait(1000);
    cy.get(itemIngredient).contains("Плоды Фалленианского дерева").trigger('dragstart');
    cy.get(constructorForm).trigger('drop');
    cy.wait(1000);
    cy.get(itemIngredient).contains("Соус традиционный галактический").trigger('dragstart');
    cy.get(constructorForm).trigger('drop');
    cy.wait(1000);
    cy.get(itemIngredient).contains("Филе Люминесцентного тетраодонтимформа").trigger('dragstart');
    cy.get(constructorForm).trigger('drop');
    cy.wait(1000);
    cy.get("button").contains("Оформить заказ").click();

    cy.get('[data-cy="login-form"]').contains('Вход');
    cy.get('input[name=email]').click().type('potorochinau@ya.ru');
    cy.get('input[name=password]').click().type('1234567qQ');
    cy.wait(1000);
    cy.contains('button', 'Войти').click();
    cy.location('pathname', { timeout: 1000 }).should('eq', '/');
    cy.wait(1000);

    cy.get("button").contains("Оформить заказ").click();
  })


});