  Ext.define('Poc.controller.Incomes', {
    refs: [{
      ref: 'formWindow',
      xtype: 'incomesform',
      selector: 'incomesform',
      autoCreate: true
    }],
    init: function () {
      this.control({
        'incomeslist > toolbar > button[action=add]': {
          click: this.showAddForm
        },
        'incomeslist': {
          itemdblclick: this.onRowdblclick
        },
        'incomesform button[action=add]': {
          click: this.doAddBook
        }
      });
    },
    onRowdblclick: function (me, record, item, index) {
      var win = this.getFormWindow();
      win.setTitle('Edit Income');
      win.setAction('edit');
      win.setRecordIndex(index);
      win.down('form').getForm().setValues(record.getData());
      win.show();
    },
    showAddForm: function () {
      var win = this.getFormWindow();
      win.setTitle('Add Income');
      win.setAction('add');
      win.down('form').getForm().reset();
      win.show();
    },
    doAddBook: function () {
      var win = this.getFormWindow();
      var store = this.getIncomesStore();
      var values = win.down('form').getValues();

      var action = win.getAction();
      var book = Ext.create('Poc.model.Income', values);
      if (action == 'edit') {
        store.removeAt(win.getRecordIndex());
        store.insert(win.getRecordIndex(), book);
      } else {
        store.add(book);
      }
      win.close();
    }
  });