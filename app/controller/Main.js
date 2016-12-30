Ext.define('Poc.controller.Main', {
  extend: 'Ext.app.Controller',
  stores: ['Incomes', 'Expenses'],
  // Attach model classes to this controller
  models: ['Income', 'Expense'],
  // ..and last but not least - the view classes
  views: ['IncomesList', 'IncomesForm', 'ExpensesList', 'ExpensesForm'],
  refs: [{
    ref: 'cards',
    selector: 'viewport > #cards'
  }],
  init: function () {
    this.control({
      'viewport > #menu button': {
        click: function (button) {
          this.getCards().getLayout().setActiveItem(button.action);
        }
      }
    });
  }
});