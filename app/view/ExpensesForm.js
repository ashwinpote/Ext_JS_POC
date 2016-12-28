Ext.define('Poc.view.ExpensesForm', {
      extend  : 'Ext.window.Window',
      alias   : 'widget.expensesform',
      title   : 'Add Expense',
      width   : 350,
      layout  : 'fit',
      resizable: false,
      closeAction: 'hide',
      modal   : true,
      config  : {
        recordIndex : 0,
        action : ''
      },
      items   : [{
        xtype : 'form',
        layout: 'anchor',
        bodyStyle: {
          background: 'none',
          padding: '10px',
          border: '0'
        },
        defaults: {
          xtype : 'textfield',
          anchor: '100%'
        },
        items : [{
          name  : 'payee',
          fieldLabel: 'Payee'
        },{
          name: 'category',
          fieldLabel: 'Category'
        },{
          name: 'amount',
          fieldLabel: 'Amount'
        },{
          name: 'id',
          fieldLabel: 'Id'
        }]
      }],
      buttons: [{
        text: 'OK',
        action: 'add'
      },{
        text    : 'Reset',
        handler : function () { 
          this.up('window').down('form').getForm().reset(); 
        }
      },{
        text   : 'Cancel',
        handler: function () { 
          this.up('window').close();
        }
      }]
    });