import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DragTimerComponent } from './drag-timer/drag-timer.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { ProfileComponent } from './profile/profile.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { StrangerProfileComponent } from './stranger-profile/stranger-profile.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DeveloperContentComponent } from './developer-content/developer-content.component';
import { SupportComponent } from './support/support.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'account/:id',component:AccountComponent,children:[
    {path:'friends',component:AllFriendsComponent},
    {path:'support',component:SupportComponent},
    {path:'projects',component:AllProjectsComponent},
    {path:'projects/:projectName',component:ProjectViewComponent,children:[
        {path:'Details',component:ProjectDetailsComponent},
        {path:'Flow',component:DeveloperContentComponent}
      
    ]},
    {path:'profile',component:ProfileComponent},
    {path:'user/:name',component:StrangerProfileComponent}
  ]},
  {path:'timer',component:DragTimerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
