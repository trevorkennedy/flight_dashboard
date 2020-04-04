var hours_day_gantt_date = new Date(2013, 9, 22, 0, 0, 0);
var hours_day_gantt_data = [
    {name: 'Sortie A', data: "iq|MQ-1", tasks: [
        {name: 'Planned', color: '#9FC5F8', from: new Date(2013, 9, 22, 15, 30, 0), to: new Date(2013, 9, 22, 18, 30, 0)},
        {name: 'Actual', color: '#F1C232', from: new Date(2013, 9, 22, 19, 0, 0), to: new Date(2013, 9, 22, 23, 0, 0)}
    ]},
    {name: 'Sortie B', data: "iq|MQ-1", tasks: [{name: 'As Scheduled', priority: 20, content: '<i class="fa fa-cog"></i> {{task.model.name}}', color: '#F1C232', from: new Date(2013, 9, 22, 8, 0, 0), to: new Date(2013, 9, 22, 14, 0, 0), progress: 100}]},
    {name: 'Sortie C', data: "ye|MQ-9", tasks: [{id: 'Finalize', name: 'YE', priority: 10, color: '#F1C232', from: new Date(2013, 9, 22, 8, 0, 0), to: new Date(2013, 9, 22, 18, 0, 0), progress: 100}]},
    {name: 'BWI', data: "af", children: ['Sortie 1', 'Sortie 2', 'Sortie 3', 'Sortie 4'], content: '<i class="fa fa-plane"></i> {{row.model.name}}'},
    {name: 'Sortie 1', data: "af|MQ-1", tasks: [{id: 'Product list', name: 'AF', color: '#F1C232', from: new Date(2013, 9, 22, 0, 0, 0), to: new Date(2013, 9, 22, 3, 0, 0), progress: 25}]},
    {name: 'Sortie 2', data: "af|MQ-1", tasks: [{id: 'Order basket', name: 'AF', color: '#F1C232', from: new Date(2013, 9, 22, 4, 0, 0), to: new Date(2013, 9, 22, 8, 0, 0)}]},
    {name: 'Sortie 3', data: "af|MQ-9", tasks: [{id: 'Checkout', name: 'AF', color: '#F1C232', from: new Date(2013, 9, 22, 8, 0, 0), to: new Date(2013, 9, 22, 15, 0, 0)}]},
    {name: 'Sortie 4', data: "af|MQ-9", tasks: [{id: 'Login & Signup', name: 'AF', color: '#F1C232', from: new Date(2013, 9, 22, 16, 0, 0), to: new Date(2013, 9, 22, 17, 0, 0)}]},
    {name: 'Crazy Sortie', data: "ye|MQ-1", tasks: [{name: 'YE', color: '#F1C232', from: new Date(2013, 9, 25, 8, 0, 0), to: new Date(2013, 9, 25, 18, 0, 0)}]}
];