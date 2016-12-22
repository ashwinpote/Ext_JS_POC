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