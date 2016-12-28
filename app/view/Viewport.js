Ext.define('Poc.view.Viewport', {
	extend: 'Ext.container.Viewport',
	layout: 'border',
	items: [
		{
			itemId: 'menu',
			region: 'west',
			collapsible: true,
			title: 'Menu',
			width: 200,
			items: [
				{
					xtype: 'panel',
					height: 110,
					padding: '10 10 25 10',
					width: 200,
					collapsible: true,
					title: 'Income Information',
					items: [
						{
							xtype: 'button',
							height: 27,
							style: 'margin-left:30px;margin-top:12px;\n',
							width: 128,
							text: 'Income',
							action: 'income-view'
						}
					]
				},
				{
					xtype: 'panel',
					height: 110,
					padding: '10 10 25 10',
					width: 200,
					collapsible: true,
					title: 'Expense Information',
					items: [
						{
							xtype: 'button',
							height: 27,
							style: 'margin-left:30px;margin-top:12px;\n',
							width: 128,
							text: 'Expense',
							action: 'expense-view'
						}
					]
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
			items: [
				{
					title: 'Income Information',
					itemId: 'income-view',
					view: 'Incomes'
				},
				{
					title: 'Expense Information',
					itemId: 'expense-view',
					html: 'Expense Information Details'
				}
			]
		}
	]
});
