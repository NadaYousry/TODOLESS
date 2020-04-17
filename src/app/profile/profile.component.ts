import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { usersService } from "../users.service/users.service";
import { users } from '../modals/users';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType ,ChartDataSets } from 'chart.js';
import { AccountInfoService } from '../account-info.service';
import { ToggleasideService } from '../toggleaside.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // *************************************** start  vars ***************************************//



/* -------------------------------------------------------------------------- */
/*                                 Constructor                                */
/* -------------------------------------------------------------------------- */

  constructor(private f: FormBuilder,
    private usersService: usersService,
    private loged:AccountInfoService,
    private toggler:ToggleasideService) { }

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
  avgStars = 1;
  userSum = 0;
  

/* -------------------------------------------------------------------------- */
/*                                    Chart                                   */
/* -------------------------------------------------------------------------- */

public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
};
public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
public barChartType: ChartType = 'line';
public barChartLegend = true;

public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Delay' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Bonus' }
];


// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

/* public randomize(): void {
  this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
} */





/* -------------------------------------------------------------------------- */
/*                                  Comments                                  */
/* -------------------------------------------------------------------------- */


  // currentUserProfile:users;
  usersComments = [];
  UserInLocalStorage;
  currentUser:users;
/* -------------------------------------------------------------------------- */
/*                             NgOnInit LifeCycle                             */
/* -------------------------------------------------------------------------- */




  // *************************************** start form ***************************************//
  ngOnInit() {
    this.loged.userloged.subscribe(UserInfo =>{
      this.currentUser = UserInfo
      if(this.currentUser.comments){
        this.usersComments = this.currentUser.comments
      }
    })
    this.toggler.currentStatus.subscribe(status =>{
      if(document.querySelector('.profile-info__details-rating') || document.querySelector('.profile__chart')){
      if(status && window.matchMedia("(max-width: 768px)").matches){
          document.querySelector('.profile-info__details-rating').classList.add("displayHidden")
          document.querySelector('.profile__chart').classList.add("displayHidden")
        }else{
          document.querySelector('.profile-info__details-rating').classList.remove("displayHidden")
          document.querySelector('.profile__chart').classList.remove("displayHidden")
        }
      }
    })

    this.fileSrc = "../../assets/imgs/users/default-user-image-300x300.png";
    this.userComment = this.f.group({
      img: '../assets/imgs/users/default-user-image-300x300.png',
      name: 'nada',
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
      this.currentUser.comments = this.usersComments;

      //calc avg
      for (let i = 0; i < this.usersComments.length; i++) {
        this.sum += this.usersComments[i].rate;
        this.avgStars = this.sum / this.usersComments.length;
        this.currentUser.starts = this.avgStars;
      }
      console.log(this.currentUser)

    }


    // ************* start border coloring ***************//

    this.colors = ['#00ca5d', '#2ca6ef', '#192965'];
    this.randomColor = Math.floor(Math.random() * 3);
    // console.log(this.colors[this.randomColor]);
    this.borderLeft = "3px solid" + this.colors[this.randomColor];

    // ************* end border coloring ***************//

  }
  // *************************************** end form ***************************************//





  // *************************************** start edit profile data*****************************************//
  onEditClick(event, textArea, bioParagraph, titleTextArea, titleEdit, saveDataBtn) {
    event.target.style.display = "none";
    textArea.style.display = 'block';
    bioParagraph.style.display = 'none';
    titleTextArea.style.display = 'block';
    titleEdit.style.display = 'none';
    saveDataBtn.style.display = 'inline-block';
  }
  // ************* end edit profile data***************//




  // *************************************** start save profile data*****************************************//
    onSaveClick(event, textArea, bioParagraph, editDataBtn, titleTextArea, titleEdit) {
      console.log(this.currentUser)

      event.target.style.display = "none";
      textArea.style.display = 'none';
      bioParagraph.style.display = 'block';
      titleTextArea.style.display = 'none';
      titleEdit.style.display = 'block';
      editDataBtn.style.display = "inline-block";
      this.currentUser.bio = textArea.value;
      this.currentUser.title = titleTextArea.value;
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
      this.usersService.updateUser(this.currentUser);
      this.loged.getAccount()
  }
  // *************************************** end save profile data*****************************************//





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

  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    // console.log(this.fileData);
    this.preview();
  }

  preview() {
    let mimeType = this.fileData.type;
    if (mimeType.match(/image||text\/*/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = event => {
      this.fileSrc = reader.result;
      this.file = reader.result;
      // console.log(this.file)
      // this.users.value.attachment = this.file;
      // console.log(this.projectForm.value.attachment) ;
      this.currentUser.image = this.file;
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
      this.usersService.updateUser(this.currentUser);
      this.loged.getAccount()
    };
    
  }
  
}
