
Ext.onReady(function(){

    var panel1 = new Ext.Panel({
        renderTo: 'showPanelInfo',
        height:200,
        width:600,
        title:'Ext js 4.2.2',
        html:'This is my first ext js panel'
    });

    var Container1 = new Ext.Container({
        layout:'column',
        renderTo:Ext.getBody(),
        items:[
            {   
                xtype:'component',
                html:'Hello',
                style:'border:1px solid black',
                columnWidth:0.49
            },
            {
                xtype:'component',
                html:'world',
                style:'border:1px solid black',
                columnWidth:0.49
            }
            
        ]
    })
});

