 Ext.define('Poc.model.Book', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'payee', type: 'string'},
      {name: 'category',  type: 'string'},
      {name: 'amount', type: 'int'},
      {name: 'id',  type: 'int'}
    ]
  });