import { Component, OnInit, TemplateRef } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {MatDialog} from '@angular/material/dialog';
import { projects } from '../modals/projects';
import { ProjectsService } from '../projects.service/projects.service';
import { CreateNewProjectComponent } from '../create-new-project/create-new-project.component';
import { AccountInfoService } from '../account-info.service';
import { ProjectDisplayService } from '../project-display.service';
@Component({
    selector: 'app-all-projects',
    templateUrl: './all-projects.component.html',
    styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

/* -------------------------------------------------------------------------- */
/*                             Projects Variables                             */
/* -------------------------------------------------------------------------- */

    projects: projects[];
    projectlength: number;
    projectId: any;
    currentUser;
    userProject:projects[];
    currentProject;
/* -------------------------------------------------------------------------- */
/*                                 constructor                                */
/* -------------------------------------------------------------------------- */

    constructor(private ProjectsService: ProjectsService, public dialog: MatDialog,
        private loged:AccountInfoService,
        private projectView:ProjectDisplayService) { }

/* -------------------------------------------------------------------------- */
/*                             ngOnInit life Cycle                            */
/* -------------------------------------------------------------------------- */

    ngOnInit() {
        this.loged.userloged.subscribe(user =>
            this.currentUser = user)
            console.log(this.currentUser)
        this.ProjectsService.getProject().subscribe((project: any) => {
            let userProjects = [];
            for(let i = 0 ; i < project.length ; i++){
                for(let j = 0 ; j < project[i].invitors.length ; j++){
                    if(project[i].invitors[j] === this.currentUser.email){
                        console.log(project[i])
                        userProjects.push(project[i])
                    }
                }
            }          
            this.userProject = userProjects
            this.projects = project;
            console.log(this.projects)
            // console.log(this.userProject)
        })
     
    }

/* -------------------------------------------------------------------------- */
/*                               Delete Project                               */
/* -------------------------------------------------------------------------- */

  delete(event , project){
    this.ProjectsService.deleteProject(project);
    console.log(project)
    }

/* -------------------------------------------------------------------------- */
/*                                    Chart                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                 Project ID                                 */
/* -------------------------------------------------------------------------- */

    selectProject(event, project) {
        this.currentProject = project;
        localStorage.setItem("currentProject",JSON.stringify(this.currentProject))
        this.projectView.displayProject()
        this.ProjectsService.editProject(project);
        // console.log(this.projectId)
    }

/* -------------------------------------------------------------------------- */
/*                            Create Project PopUp                            */
/* -------------------------------------------------------------------------- */

  openDialog() {
    const dialogRef = this.dialog.open(CreateNewProjectComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}