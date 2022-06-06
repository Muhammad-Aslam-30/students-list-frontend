import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  public count: number = 1;
  constructor( private api: ApiService, private dialogRef: MatDialog) { }
  
  public studentList: any;

  ngOnInit(): void {
    {
      //to display the first student's name and id at home page
      this.api.getBySid(this.count)
      .subscribe(res => {
        this.studentList = res;
      })
      console.log(this.count)
    }
  }

  avoidBlanck(count){
    this.api.getBySid(count)
    .subscribe(res => {
      this.studentList = res;
    });
  }

  back(){
    this.count = this.count - 1;
    this.api.getBySid(this.count)
      .subscribe(res => {
        this.studentList = res;
      })
      if(this.count == 0){
        this.count = 1;
        alert("you already reached the starting person in the list and you can't go behind");
        this.avoidBlanck(this.count)
        console.log(this.count);
        return;
      }
      console.log(this.count)
  }
  next(){
    this.api.getBySid(this.count)
    .subscribe(res => {
      this.studentList = res;
      if(res == ''){
        alert("end of students list")
        this.count = this.count - 1 ;
        this.avoidBlanck(this.count);
      }
      else{
        this.count = this.count + 1;
      }
    })
    console.log(this.count)
  }

}
