describe('Check lockalhost', () => {
  it('has title "ToDo List"', () => {
    cy.visit('http://localhost:5556');
    cy.title().should('include', 'ToDo List');
  });

  it('should add a new task to the list', () => {
    cy.visit('http://localhost:5556');
    cy.get('.form__input').type('New task');
    cy.get('.form__btn').click();
    cy.get('.js--todos-wrapper .todo-item__description').last().contains('New task').should('be.visible');
  });
  

  it('should add a new task with numbers to the list', () => {
    cy.visit('http://localhost:5556');
    cy.get('.form__input').type('0123456789');
    cy.get('.form__btn').click();
    cy.get('.js--todos-wrapper .todo-item__description').last().contains('0123456789').should('be.visible');
  });
  

  it('should display the ToDoList title, input field, and submit button', () => {
    cy.visit('http://localhost:5556');
    cy.get('h1').contains('ToDoList').should('be.visible');
    cy.get('.form__input').should('be.visible');
    cy.get('.form__btn').contains('Add task').should('be.visible');
  });

  it('should display error when trying to submit an empty task', () => {
    cy.visit('http://localhost:5556');
    cy.get('.form__btn').click();
    cy.get('.new_text_error').should('be.visible');
  });

  it('should display error when trying to submit a task with length < 5 chars', () => {
    cy.visit('http://localhost:5556');
    cy.get('.form__input').type('some');
    cy.get('.form__btn').click();
    cy.get('.new_text_error').should('be.visible');
  });

  it('should mark a task as completed when checkbox is clicked', () => {
    cy.visit('http://localhost:5556');
    cy.get('.form__input').type('Task to complete');
    cy.get('.form__btn').click();
    cy.get('.todo-item__checkbox').last().check();
    cy.get('.todo-item__description').last().should('have.class', 'todo-item--checked');
  });

  it('should delete a task when delete button is clicked', () => {
    cy.visit('http://localhost:5556');
    cy.get('.form__input').type('Task to delete');
    cy.get('.form__btn').click();
    cy.get('.todo-item__delete').last().click();
    cy.get('.js--todos-wrapper').should('not.contain', 'Task to delete');
  });
  
});