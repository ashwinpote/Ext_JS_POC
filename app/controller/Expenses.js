  Ext.define('Poc.controller.Expenses', {
    extend  : 'Ext.app.Controller',
    stores  : ['Expenses'],
    views   : ['ExpensesList', 'ExpensesForm'],
    refs    : [{
      ref   : 'formWindow',
      xtype : 'expensesform',
      selector: 'expensesform',
      autoCreate: true
    }],
    init: function () {
      this.control({
        'expenseslist > toolbar > button[action=add]': {
          click: this.showAddForm
        },
        'expenseslist': {
          itemdblclick: this.onRowdblclick
        },
        'expensesform button[action=add]': {
          click: this.doAddBook
        }
      });
    },
    onRowdblclick: function(me, record, item, index) {
      var win = this.getFormWindow();
      win.setTitle('Edit Expense');
      win.setAction('edit');
      win.setRecordIndex(index);
      win.down('form').getForm().setValues(record.getData());
      win.show();
    },
    showAddForm: function () {
      var win = this.getFormWindow();
      win.setTitle('Add Expense');
      win.setAction('add');
      win.down('form').getForm().reset();
      win.show();
    },
    doAddBook: function () {
      var win = this.getFormWindow();
      var store = this.getExpensesStore();
      var values = win.down('form').getValues();
      
      var action = win.getAction();
      var book = Ext.create('Poc.model.Expense', values);
      if(action == 'edit') {
        store.removeAt(win.getRecordIndex());
        store.insert(win.getRecordIndex(), book);  
      }
      else {
        store.add(book);
      }
      win.close();
    }
  });