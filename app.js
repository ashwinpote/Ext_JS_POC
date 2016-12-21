Ext.onReady(function () {
  Ext.define('Poc.model.Book', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'payee', type: 'string'},
      {name: 'category',  type: 'string'},
      {name: 'amount', type: 'int'},
      {name: 'id',  type: 'int'}
    ]
  });
 
  Ext.define('Poc.store.Books', {
    extend  : 'Ext.data.Store',
    model   : 'Poc.model.Book',
    fields  : ['payee', 'category','amount', 'id'],
    data    : [
      { payee: 'Ashwin Pote', 
        category: 'FD Intrest', amount: 3000, id : 1 },
      { payee: 'Shrikant Paprikar', 
        category: 'RD Intrest', amount: 5500, id : 2 },
      { payee: 'Darshan Patil', 
        category: 'From Shop rent', amount: 6500, id : 3 },
      { payee: 'Ravi Penna', 
        category: 'FD Intrest', amount: 3500, id : 4 }
    ]
  });
 
  Ext.define('Poc.view.BooksList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bookslist',
    title: 'Income List',
    store: 'Books',
    initComponent: function () {
      this.tbar = [{
        text    : 'Add Income',
        action  : 'add',
        iconCls : 'income-add'
      }];
      this.columns = [
        { header: 'Payee', dataIndex: 'payee', flex: 1 },
        { header: 'Category', dataIndex: 'category' },
        { header: 'Amount', dataIndex: 'amount' , width: 60 },
        { header: 'Id', dataIndex: 'id', width: 80 },
        { header: 'Action', width: 50,
          renderer: function (v, m, r) {
            var id = Ext.id();
            var max = 15;
            Ext.defer(function () {
              Ext.widget('image', {
                renderTo: id,
                name: 'delete',
                src : 'images/income_delete.png',
                listeners : {
                  afterrender: function (me) { 
                    me.getEl().on('click', function() {
                      var grid = Ext.ComponentQuery.query('bookslist')[0];
                      if (grid) {
                        var sm = grid.getSelectionModel();
                        var rs = sm.getSelection();
                        if (!rs.length) {
                          Ext.Msg.alert('Info', 'No Income Selected');
                          return;
                        }
                        Ext.Msg.confirm('Remove Income', 
                          'Are you sure you want to delete?', 
                          function (button) {
                            if (button == 'yes') {
                              grid.store.remove(rs[0]);
                            }
                        });
                      }
                    });
                  }
                }
              });
            }, 50);
            return Ext.String.format('<div id="{0}"></div>', id);
          }
        }
      ];
      this.callParent(arguments);
    }
  });
 
    Ext.define('Poc.view.BooksForm', {
      extend  : 'Ext.window.Window',
      alias   : 'widget.booksform',
      title   : 'Add Income',
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
 
  Ext.define('Poc.controller.Books', {
    extend  : 'Ext.app.Controller',
    stores  : ['Books'],
    views   : ['BooksList', 'BooksForm'],
    refs    : [{
      ref   : 'formWindow',
      xtype : 'booksform',
      selector: 'booksform',
      autoCreate: true
    }],
    init: function () {
      this.control({
        'bookslist > toolbar > button[action=add]': {
          click: this.showAddForm
        },
        'bookslist': {
          itemdblclick: this.onRowdblclick
        },
        'booksform button[action=add]': {
          click: this.doAddBook
        }
      });
    },
    onRowdblclick: function(me, record, item, index) {
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
      var store = this.getBooksStore();
      var values = win.down('form').getValues();
      
      var action = win.getAction();
      var book = Ext.create('Poc.model.Book', values);
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
 
  Ext.application({
    name  : 'Poc',
    controllers: ['Books'],
      launch: function () {
        Ext.widget('bookslist', {
          width : 500,
          height: 300,
          renderTo: 'output'
        });
      }
    }
  );
});