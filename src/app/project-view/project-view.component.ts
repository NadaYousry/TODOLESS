import { Component, OnInit } from '@angular/core';
import { AccountInfoService } from '../account-info.service';
import { ProjectDisplayService } from '../project-display.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  constructor(private loged:AccountInfoService,
    private currentProjects:ProjectDisplayService) { }
currentUser;
currentproject;
  ngOnInit(): void {
    this.loged.userloged.subscribe(arg=>{
      this.currentUser = arg
    })
    this.currentProjects.currentProject.subscribe(arg =>{
      this.currentproject = arg
    })
  }

}
