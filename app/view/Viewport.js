Ext.define('Poc.view.Viewport', {
  extend: 'Ext.container.Viewport',
  controller: 'Main',
  name: 'Poc',
  views: ['IncomesList', 'IncomesForm', 'ExpensesList', 'ExpensesForm'],
  layout: 'border',
  items: [{
      itemId: 'menu',
      region: 'west',
      collapsible: true,
      title: 'Menu',
      width: 200,
      items: [{
          xtype: 'button',
          height: 27,
          style: 'margin-left:30px;margin-top:12px;\n',
          width: 128,
          text: 'Show Income',
          action: 'income-view'
        },
        {
          xtype: 'button',
          height: 27,
          style: 'margin-left:30px;margin-top:12px;\n',
          width: 128,
          text: 'Show Expense',
          action: 'expense-view'
        },
        {
          xtype: 'button',
          height: 27,
          style: 'margin-left:30px;margin-top:12px;\n',
          width: 128,
          text: 'Show Report',
          action: 'report-view'
        },
        {
          xtype: 'button',
          height: 27,
          style: 'margin-left:30px;margin-top:12px;\n',
          width: 128,
          text: 'Show Chart',
          action: 'chart-view'
        }
      ],
      margins: '5 0 5 5'
    },
    {
      itemId: 'cards',
      region: 'center',
      margins: '5 5 5 5',
      border: false,
      layout: 'card',
      defaults: { bodyPadding: 10 },
      items: [{
          title: 'Income Information',
          itemId: 'income-view',
          xtype: 'incomeslist',
          collapsible: false
        },
        {
          title: 'Expense Information',
          itemId: 'expense-view',
          xtype: 'expenseslist',
          collapsible: false
        },
        {
          title: 'Report Information',
          itemId: 'report-view',
          //xtype: 'reports',
          collapsible: false
        },
        {
          title: 'Chart Information',
          itemId: 'chart-view',
          collapsible: false
        }
      ]
    }
  ]
});