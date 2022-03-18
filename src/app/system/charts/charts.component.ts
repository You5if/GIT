import { Component, OnInit } from '@angular/core';
import { Chart } from './chart.model';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

 lineChart: Chart = {
    ChartOptions : {
      scaleShowVerticalLines: false,
      responsive: true
    },
     ChartLabels : ['1', '2', '3', '4', '5', '6'],
     ChartType : 'line',
     ChartLegend : true,
     ChartData : [
      { data: [85, 80, 78, 75, 77, 75], label: 'Crude oil prices' , fill: false}
    ],
    ChartColors: [
    ]
  }

   barChart: Chart = {
    ChartOptions : {
      scaleShowVerticalLines: false,
      responsive: true
    },
     ChartLabels : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
     ChartType : 'bar',
     ChartLegend : true,
     ChartData : [
      {data: [22, 34, 67, 24, 88, 63, 96, 88, 80, 20, 22, 34, 67, 24, 88, 63, 96, 88, 50, 20, 22, 34, 67, 24, 88, 63, 96, 88, 10, 20], label:'Days'},
      
  
    ],
    ChartColors: [
      {backgroundColor: '#55efc4'},
    ]
  }
   horizantalBarChart: Chart = {
    ChartOptions : {
      scaleShowVerticalLines: false,
      responsive: true
    },
     ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
     ChartType : 'horizontalBar',
     ChartLegend : true,
     ChartData : [
      {data: [22, 34, 67, 24, 88, 63, 96], label:'Expense'},
      {data: [45, 87, 34, 65, 44, 86, 55], label:'Revenue'}
  
    ],
    ChartColors: [
      {backgroundColor: '#30336b'},
      {backgroundColor: '#6ab04c'},
    ]
  }

  radarChart: Chart = {
    ChartOptions : null,
     ChartLabels : ['1', '2', '3', '4'],
     ChartType : 'radar',
     ChartLegend : null,
     ChartData : [
      {data: [22, 34, 67, 24], label:'Series A'},
      {data: [45, 87, 34, 65], label:'Series B'}
  
    ],
    ChartColors: null
  }

  pieChart: Chart = {
    ChartOptions : null,
     ChartLabels : [' sales 1', 'sales 2', ' sales 3', 'sales 4'],
     ChartType : 'pie',
     ChartLegend : null,
     ChartData : [120, 150, 90, 180],
     ChartColors: [
      {backgroundColor: ['#22a6b3',
      '#4834d4',
      '#f0932b',
      '#95afc0',]}
    ]
  }
  polarChart: Chart = {
    ChartOptions : null,
     ChartLabels : [' sales 1', 'sales 2', ' sales 3', 'sales 4'],
     ChartType : 'polarArea',
     ChartLegend : null,
     ChartData : [120, 150, 90, 180],
     ChartColors: [
      {backgroundColor: ['#55efc4',
      '#fab1a0',
      '#0984e3',
      '#d63031',]}
    ]
  }

  DoughnutChart: Chart = {
    ChartOptions : null,
     ChartLabels : [' sales 1', 'sales 2', ' sales 3', 'sales 4'],
     ChartType : 'doughnut',
     ChartLegend : null,
     ChartData : [120, 150, 90, 180],
     ChartColors: null
  }
  

  foods: Food[] = [
    {value: '1', viewValue: 'Feb 2021'},
    {value: '2', viewValue: 'Oct 2021'},
    {value: '3', viewValue: 'Dec 2021'}
  ];
  Days: Food[] = [
    {value: 'D', viewValue: 'Days'},
    {value: 'M', viewValue: 'Months'},
    
  ];
  

  constructor() { }

  ngOnInit() {

    var num = 6
    setInterval(() => {
      var count = Math.floor(Math.random() * 100).toString()
       num ++
      this.lineChart.ChartData[0].data.push(count)
      this.lineChart.ChartLabels.push(num.toString())
      }, 500);

    
    
  }

  onDateChange(event: string) {
    if (event == '1') {
      this.horizantalBarChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
         ChartType : 'horizontalBar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 34, 67, 24, 88, 63, 96], label:'Expense'},
          {data: [45, 87, 34, 65, 44, 86, 55], label:'Revenue'}
      
        ],
        ChartColors: [
          {backgroundColor: '#30336b'},
          {backgroundColor: '#6ab04c'},
        ]
      }
      
    }else if (event == '2') {
      this.horizantalBarChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
         ChartType : 'horizontalBar',
         ChartLegend : true,
         ChartData : [
          {data: [45, 87, 34, 65, 44, 86, 55], label:'Expense'},
          {data: [77, 34, 22, 68, 87, 23, 88], label:'Revenue'}
      
        ],
        ChartColors: [
          {backgroundColor: '#30336b'},
          {backgroundColor: '#6ab04c'},
        ]
      }
    } else if (event == '3') {
      this.horizantalBarChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7'],
         ChartType : 'horizontalBar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 25, 77, 99, 14, 24, 47], label:'Expense'},
          {data: [44, 88, 25, 85, 36, 47, 25], label:'Revenue'}
      
        ],
        ChartColors: [
          {backgroundColor: '#30336b'},
          {backgroundColor: '#6ab04c'},
        ]
      }
    }
  }

  onChangeDays(event: string) {
    if (event == 'M') {
      this.barChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['Jan', 'Feb', 'Mar'],
         ChartType : 'bar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 34, 67], label:'Months'},
          
      
        ],
        ChartColors: [
          {backgroundColor: '#55efc4'},
        ]
      }
    }else {
      this.barChart = {
        ChartOptions : {
          scaleShowVerticalLines: false,
          responsive: true
        },
         ChartLabels : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
         ChartType : 'bar',
         ChartLegend : true,
         ChartData : [
          {data: [22, 34, 67, 24, 88, 63, 96, 88, 80, 20, 22, 34, 67, 24, 88, 63, 96, 88, 50, 20, 22, 34, 67, 24, 88, 63, 96, 88, 10, 20], label:'Days'},
          
      
        ],
        ChartColors: [
          {backgroundColor: '#55efc4'},
        ]
      }
    }
    
  }
  


}
interface Food {
  value: string;
  viewValue: string;
}
