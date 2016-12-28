Ext.define('Poc.controller.Main', {
	extend: 'Ext.app.Controller',
	stores: ['Incomes'],
  // Attach model classes to this controller
  models: ['Income'],
  // ..and last but not least - the view classes
  //views: ['incomesList', 'incomesForm'],
	refs: [
		{
			ref: 'cards',
			selector: 'viewport > #cards'
		}
	],
	init: function () {
		this.control({
			'viewport > #menu button': {
				click: function (button) {
					console.log(button);
					this.getCards().getLayout().setActiveItem(button.action);
				}
			}
		});
	}
});
