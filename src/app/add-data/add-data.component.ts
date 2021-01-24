import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../dataBase/data.service';
import { Data } from '../Models/Data.model';

@Component({
  selector: 'pm-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  constructor(private DataService: DataService,private dialogRef: MatDialogRef<AddDataComponent>) { }
  data: Data = new Data();
  ngOnInit() {
  }
  AddData() {
    this.DataService.addData(this.data);
    this.dialogRef.close();

  }

}
