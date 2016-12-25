// Ext.require('Ext.chart.*');

Ext.onReady(function(){

  // Line chart model
  Ext.define('WeatherPoint', {
    extend: 'Ext.data.Model',
    fields: ['temperature', 'date']
  });

    // Line chart store
  var temperatureStore = Ext.create('Ext.data.Store', {
    model: 'WeatherPoint',
    data: [
      { temperature: 58, date: new Date(2011, 1, 1, 8) },
      { temperature: 63, date: new Date(2011, 1, 1, 9) },
      { temperature: 73, date: new Date(2011, 1, 1, 10) },
      { temperature: 78, date: new Date(2011, 1, 1, 11) },
      { temperature: 81, date: new Date(2011, 1, 1, 12) }
    ]
  });

  // Line chart code
  var temperatureChart = Ext.create('Ext.chart.Chart', {
     // renderTo: Ext.getBody(),
    store: temperatureStore,
    title: 'Line Chart',
    width: 600,
    height: 400,
    axes: [
      {
        title: 'Temperature',
        type: 'Numeric',
        position: 'left',
        fields: ['temperature'],
        minimum: 0,
        maximum: 100
      },
      {
        title: 'Time',
        type: 'Time',
        position: 'bottom',
        fields: ['date'],
        dateFormat: 'ga'
      }
    ],
    series: [
      {
        type: 'line',
        xField: 'date',
        yField: 'temperature',
        tips: {
          trackMouse: true,
          renderer: function(storeItem, item) {
            //calculate percentage.
            var total = 0;
            // expensesStore.each(function(rec) {
            //   total += rec.get('amount');
            // });
            this.setTitle(storeItem.get('date') + ': ' + storeItem.get('temperature') );
          }
        }
      }
    ]
  });

  /*
   ************************** Pie Chart ************************
  */
  // Pie chart model
  Ext.define('Expenses', {
    extend: 'Ext.data.Model',
    fields: ['month', 'amount']
  });

    // Pie chart store
  var expensesStore = Ext.create('Ext.data.Store', {
    model: 'Expenses',
    data: [
      { amount: 158, month: 'Jan' },
      { amount: 63, month: 'Feb' },
      { amount: 173, month: 'Mar' },
      { amount: 78, month: 'Apr' },
      { amount: 121, month: 'may' }
    ]
  });


  // Pie chart
  var expensesChart = Ext.create('Ext.chart.Chart', {
    xtype: 'chart',
    title: 'Pie Chart',
    width: 600,
    height: 400,
    animate: true,
    store: expensesStore,
    shadow: true,
    legend: {
      position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
      type: 'pie',
      field: 'amount',
      showInLegend: true,
      donut: true,
      tips: {
        trackMouse: true,
        renderer: function(storeItem, item) {
          //calculate percentage.
          var total = 0;
          expensesStore.each(function(rec) {
            total += rec.get('amount');
          });
          this.setTitle(storeItem.get('month') + ': ' + Math.round(storeItem.get('amount') / total * 100) + '%');
        }
      },
      highlight: {
        segment: {
            margin: 20
        }
      },
      label: {
        field: 'month',
        display: 'rotate',
        contrast: true,
        font: '18px Arial'
      }
    }]
  });


  /*
   ************************** Bar Chart ************************
  */
  // Bar Chart Theme
  Ext.define('Ext.chart.theme.CustomBlue', {
    extend: 'Ext.chart.theme.Base',

    constructor: function(config) {
      var titleLabel = {
        font: 'bold 18px Arial'
      }, axisLabel = {
        fill: 'rgb(8,69,148)',
        font: '12px Arial',
        spacing: 2,
        padding: 5
      };

      this.callParent([Ext.apply({
        axis: {
          stroke: '#084594'
        },
        axisLabelLeft: axisLabel,
        axisLabelBottom: axisLabel,
        axisTitleLeft: titleLabel,
        axisTitleBottom: titleLabel
      }, config)]);
    }
  });

  // Bar chart model
  Ext.define('BugsResolved', {
    extend: 'Ext.data.Model',
    fields: ['month', 'bugsResolvedCount']
  });

    // Bar chart store
  var bugsResolvedStore = Ext.create('Ext.data.Store', {
    model: 'BugsResolved',
    data: [
      { bugsResolvedCount: 15, month: 'Jan' },
      { bugsResolvedCount: 6, month: 'Feb' },
      { bugsResolvedCount: 17, month: 'Mar' },
      { bugsResolvedCount: 7, month: 'Apr' },
      { bugsResolvedCount: 12, month: 'May' },
      { bugsResolvedCount: 21, month: 'June' },
      { bugsResolvedCount: 27, month: 'July' },
      { bugsResolvedCount: 22, month: 'Aug' },
      { bugsResolvedCount: 11, month: 'Sep' },
      { bugsResolvedCount: 17, month: 'Oct' },
      { bugsResolvedCount: 8, month: 'Nov' },
      { bugsResolvedCount: 19, month: 'Dec' }
    ]
  });

  var bugsResolvedChart = Ext.create('Ext.chart.Chart', {
    animate: true,
    title: 'Bar Chart',
    shadow: true,
    store: bugsResolvedStore,
    axes: [{
      type: 'Numeric',
      position: 'bottom',
      fields: ['bugsResolvedCount'],
      label: {
        renderer: Ext.util.Format.numberRenderer('0,0')
      },
      title: 'Bugs Resolved',
      grid: true,
      minimum: 0
    }, {
      type: 'Category',
      position: 'left',
      fields: ['month'],
      title: 'Month of the Year'
    }],
    theme: 'CustomBlue',
    background: {
      gradient: {
        id: 'backgroundGradient',
        angle: 45,
        stops: {
          0: {
            color: '#ffffff'
          },
          100: {
            color: '#eaf1f8'
          }
        }
      }
    },
    series: [{
      type: 'bar',
      axis: 'bottom',
      highlight: true,
      tips: {
        trackMouse: true,
        renderer: function(storeItem, item) {
          this.setTitle(storeItem.get('month') + ': ' + storeItem.get('bugsResolvedCount'));
        }
      },
      label: {
        display: 'insideEnd',
          field: 'bugsResolvedCount',
          renderer: Ext.util.Format.numberRenderer('0'),
          orientation: 'horizontal',
          color: '#333',
          'text-anchor': 'middle'
      },
      xField: 'month',
      yField: ['bugsResolvedCount']
    }]
  });


    // Create a viewport with border layout
    // center will contain a tab panel with multiple tabs
    // each tab will represent a chart
    Ext.create('Ext.container.Viewport', {
    layout: 'border',
    items: [{
        region: 'north',
        html: '<h1 class="x-panel-header"> Charts App</h1>',
        border: false,
        margins: '0 0 5 0'
    }, {
        region: 'west',
        collapsible: true,
        title: 'Navigation',
        width: 150,
        collapsed: true
        // could use a TreePanel or AccordionLayout for navigational items
    }, {
        region: 'south',
        title: 'South Panel',
        collapsible: true,
        html: 'Information goes here',
        split: true,
        height: 100,
        minHeight: 100
    }, {
        region: 'east',
        title: 'East Panel',
        collapsible: true,
        split: true,
        width: 150
    }, {
        region: 'center',
        xtype: 'tabpanel', // TabPanel itself has no title
        activeTab: 0,      // First tab active by default
        items: [{
          xtype: temperatureChart
        }, {
          xtype: expensesChart
        }, {
          xtype: bugsResolvedChart
        }]
    }]
  });
});
