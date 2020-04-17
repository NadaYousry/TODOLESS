import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { usersService } from "../users.service/users.service";
import { users } from '../modals/users';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { AccountInfoService } from '../account-info.service';
import { VisitProfileService } from '../visit-profile.service';

@Component({
  selector: 'app-stranger-profile',
  templateUrl: './stranger-profile.component.html',
  styleUrls: ['./stranger-profile.component.scss']
})
export class StrangerProfileComponent implements OnInit {

   // *************************************** start  vars ***************************************//



/* -------------------------------------------------------------------------- */
/*                                 Constructor                                */
/* -------------------------------------------------------------------------- */

constructor(private f: FormBuilder,
  private usersService: usersService,
  private loged:AccountInfoService,
  private StrangeProfileService:VisitProfileService) { }

/* -------------------------------------------------------------------------- */
/*                                  Variable                                  */
/* -------------------------------------------------------------------------- */

userComment: FormGroup;
userProfile: FormGroup;
colors;
borderLeft;s
randomColor;
fileData: any;
fileSrc: string | ArrayBuffer;
file: any;
profile: users;

sum: number;
avgStars = 0;
userSum = 0;

visted;
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
/*                                  Comments                                  */
/* -------------------------------------------------------------------------- */


// strangeProfileProfile:users;
usersComments = [];
UserInLocalStorage;
strangeProfile;
currentUser;
/* -------------------------------------------------------------------------- */
/*                             NgOnInit LifeCycle                             */
/* -------------------------------------------------------------------------- */




// *************************************** start form ***************************************//
ngOnInit() {
  this.loged.userloged.subscribe(UserInfo =>{
    this.currentUser = UserInfo
  })

/* -------------------------------------------------------------------------- */
/*                            watch visited profile                           */
/* -------------------------------------------------------------------------- */

this.StrangeProfileService.vistedprofile.subscribe(UserInfo =>{
  this.strangeProfile = UserInfo
  if(this.strangeProfile.comments){
    this.usersComments = this.strangeProfile.comments
  }
})
  this.fileSrc = "../../assets/imgs/users/default-user-image-300x300.png";
  this.userComment = this.f.group({
    img: this.currentUser.image,
    name: this.currentUser.name,
    comment: ['', [Validators.required]],
    rate: 0
  });
  this.userProfile = this.f.group({
  
    image: '',
   
  });

}

onSubmit(form: FormGroup) {
  if (form.valid) {
    this.sum = 0;
    this.userComment.value.rate = this.rating //initialize rating on form submit 
    this.usersComments.push(this.userComment.value);
    console.log("valid");
    this.strangeProfile.comments = this.usersComments;
    console.log(this.strangeProfile)

    //calc avg
    for (let i = 0; i < this.usersComments.length; i++) {
      this.sum += this.usersComments[i].rate;
      this.avgStars = this.sum / this.usersComments.length;
      this.strangeProfile.starts = this.avgStars;
    }
    localStorage.setItem("friend",JSON.stringify(this.strangeProfile))
    this.StrangeProfileService.activeVistor()
    this.usersService.updateUser(this.strangeProfile)
  }


  // ************* start border coloring ***************//

  this.colors = ['#00ca5d', '#2ca6ef', '#192965'];
  this.randomColor = Math.floor(Math.random() * 3);
  // console.log(this.colors[this.randomColor]);
  this.borderLeft = "3px solid" + this.colors[this.randomColor];

  // ************* end border coloring ***************//

}
// *************************************** end form ***************************************//



// *************************************** start star rating ***************************************//

stars = [1, 2, 3, 4, 5];
rating = 0;
hoverState = 0;
displayRate;
onStarEnter(starId: number) {
  this.hoverState = starId;
}
onStarLeave() {
  this.hoverState = 0;
}
onStarClicked(starId: number, dataHovering) {
  this.rating = starId;
  dataHovering.style.top = '95%';
  setTimeout(() => {
    dataHovering.style.top = '100%';
  }, 1000)
  // console.log(dataHovering);
}


// *************************************** end star rating ***************************************//

}
