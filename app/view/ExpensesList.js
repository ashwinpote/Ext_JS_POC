  Ext.define('Poc.view.ExpensesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.expenseslist',
    title: 'Expense List',
    store: 'Expenses',
    initComponent: function () {
      this.tbar = [{
        text    : 'Add Expense',
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
                      var grid = Ext.ComponentQuery.query('expenseslist')[0];
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