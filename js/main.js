var app = angular.module('app', []);

app.controller('agGridCtrl', function($scope) {    
    // specify the columns
    const columnDefs = [
        { 
            field: "make", sortable: true, filter: true, cellRenderer: ({value}) => {
                const a = document.createElement('a');
                a.innerText = value;
                a.href = 'https://www.google.com';
                a.target = '_blank';
                
                // Prevent click from reaching AgGrid
                a.addEventListener('click', event => { event.stopPropagation() });
                return a;
            }
        },
        { field: "model", sortable: true, filter: true },
        { field: "price", sortable: true, filter: true }
    ];

    // specify the data
    const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
    ];

    // let the grid know which columns and what data to use
    const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowSelection: 'multiple'
    };

    var params = {
        skipHeader: false,
        skipFooters: true,
        skipGroups: true,
        fileName: "export.csv"
    };

    // lookup the container we want the Grid to use
    const eGridDiv = document.querySelector('#myGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);

    $scope.getSelectedRows = function() {
        var selectedNodes = gridOptions.api.getSelectedNodes();
        var selectedData = selectedNodes.map(node => node.data);
        var selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
        alert('Selected nodes: ' + selectedDataStringPresentation);
    }

    $scope.exportToCsv = function() {
        gridOptions.api.exportDataAsCsv(params);
    }
});