import { ProjectsService } from './../projects.service/projects.service';
import { projects } from './../modals/projects';
import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { RouterOutlet } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ProjectDisplayService } from '../project-display.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  animations: [
    // rotateInDownLeftAnimation()
  ]
})
export class ProjectDetailsComponent implements OnInit {



  project;

  /* ==================================== edit project popup ================================== */
  constructor(public dialog: MatDialog, private ProjectsService:ProjectsService,
    private projectView:ProjectDisplayService) { }
  openDialog() {
    const dialogRef = this.dialog.open(EditProjectComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  /* ======================================= chart========================================== */
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
        position: 'right', 
                    
    },
    plugins: {
        datalabels: {
            formatter: (value, ctx) => {
                const label = ctx.chart.data.labels[ctx.dataIndex];
                return label;
            },
        },
    }
};
public pieChartLabels: Label[] = ['pending tasks', 'bonus', 'delay'];
public pieChartData: number[] = [300, 500, 100];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartColors = [
    {
        backgroundColor: ['rgba(247,149,99,1)', 'rgba(0,171,178,1)', 'rgba(216,70,114,1)'],
    },
];
  
  ngOnInit(): void {
    // this.ProjectsService.currentId.subscribe((message: any) => {
    //  console.log(message)
    //  this.project = message;
    // })
    this.projectView.currentProject.subscribe(arg =>{
      this.project = arg
    })
  }

}
