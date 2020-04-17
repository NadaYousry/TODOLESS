import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  flag = true
  constructor(private fb: FormBuilder) { }


  support: FormGroup;
  problemName;
  problemLetter;


  ngOnInit(): void {
    this.support = this.fb.group({
      problemName: '',
      problemLetter: ['', [Validators.required]]
    })

  }

  activeProblem(event) {
    if (!event.target.classList.contains('active')) {
      event.target.classList.add("active");
      console.log('active')
      this.problemName = event.target.innerText;
      this.flag = false;
      event.target.classList.remove("active");
    } else {
      console.log('not active')
      event.target.classList.remove("active")
      this.flag = true;
    }
  }

  onSubmit(support:FormGroup) {
    if(support.valid){
      console.log('valid');
      this.support.value.problemName = this.problemName;
      console.log(this.support.value);  
    }else{
      console.log('not valid')
    }
  }
}
