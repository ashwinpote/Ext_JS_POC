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