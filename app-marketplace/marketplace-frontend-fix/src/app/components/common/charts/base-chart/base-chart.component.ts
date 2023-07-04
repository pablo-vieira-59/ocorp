import { Component, Input } from '@angular/core';
import { offset } from '@popperjs/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss']
})
export class BaseChartComponent {
  @Input()
  title :string = "";

  @Input()
  labels :string[] = [];

  @Input()
  data :any[] = [];

  @Input()
  legend :boolean = false;

  @Input()
  position :any = "top";

  @Input()
  dataNames :string[] = [""];

  @Input()
  chartType :ChartType = ChartType.Doughnut;

  @Input()
  direction :any = "x";

  @Input()
  aspect :number = 1;

  @Input()
  scalesX :boolean = true;

  @Input()
  scalesY :boolean = true;

  public chart_options :any = {};

  public chart_data :ChartData = {
    labels : [],
    datasets : []
  }

  public chart_type :any = "pie";
  public colors = ['#294566', '#2C677D', '#287273', '#2D2873', '#2C3C7D']
  public colors_individual = [['#294566'], ['#2C677D'], ['#287273'], ['#2D2873'], ['#2C3C7D']]

  ngOnInit(){
    this.chart_options = {};

    if(this.chartType == ChartType.Doughnut){
      var dataset = this.CreateDataset(this.data, 0, ChartType.Doughnut);
      
      var options :ChartOptions<'doughnut'> = {
        cutout : "80%"
      }

      this.chart_options = options;
      this.chart_data.datasets.push(dataset);
      this.chart_data.labels = this.labels;
      this.chart_type = "doughnut";
      this.chart_options.aspectRatio = 1;
    } 

    if(this.chartType == ChartType.Pie){
      var dataset = this.CreateDataset(this.data, 0, ChartType.Pie);
      this.chart_data.datasets.push(dataset);
      this.chart_data.labels = this.labels;
      this.chart_type = "pie";
    } 

    if(this.chartType == ChartType.Bar){
      this.chart_options.indexAxis = this.direction;
      this.chart_options.aspectRatio = this.aspect;
      this.chart_options.scales = {
        x : {
          display : this.scalesX
        },
        y : {
          display : this.scalesY
        }
      }

      for (let i = 0; i < this.data.length; i++) {
        var newDataset = this.CreateDataset(this.data[i], i, ChartType.Bar);
        this.chart_data.datasets.push(newDataset);
      }

      this.chart_data.labels = this.labels;
      this.chart_type = "bar";
    }

    if(this.chartType == ChartType.Line){
      this.chart_options.aspectRatio = this.aspect;
      this.chart_options.scales = {
        x : {
          display : this.scalesX
        },
        y : {
          display : this.scalesY
        }
      }

      for (let i = 0; i < this.data.length; i++) {
        var newDataset = this.CreateDataset(this.data[i], i, ChartType.Line);
        this.chart_data.datasets.push(newDataset);
      }

      this.chart_data.labels = this.labels;
      this.chart_type = "line";
    }
    
    this.chart_options.plugins = {
      responsive: true ,
      legend: {
        display : this.legend,
        position: this.position,
        align:'start' 
      }
    };
  }

  CreateDataset(data :any[], index :number, type : ChartType):any{
    var newDataset :any = {
      label : this.dataNames[index],
      data : data,
    };
    
    if(type == ChartType.Line){
        newDataset.backgroundColor = this.colors;
        newDataset.borderColor = this.colors;
        newDataset.fill = false;
        newDataset.pointBorderColor = '#000000';
        newDataset.pointBackgroundColor = '#ffffff';
  
      return newDataset;
    }

    if(type == ChartType.Bar){
      newDataset.backgroundColor = this.colors_individual[index];
      return newDataset;
    }

    newDataset.backgroundColor = this.colors;
    return newDataset;
  }

}

export enum ChartType{
  Doughnut = 1,
  Pie = 2,
  Bar = 3,
  Line = 4
}