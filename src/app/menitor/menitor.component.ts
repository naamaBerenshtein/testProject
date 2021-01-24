import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataBase/data.service';
import { Data } from '../Models/Data.model';
import { DataState } from '../Models/dataState.model';

@Component({
  selector: 'pm-menitor',
  templateUrl: './menitor.component.html',
  styleUrls: ['./menitor.component.css']
})
export class MenitorComponent implements OnInit {

  constructor(private DataService: DataService) { }
  data: Data[];
  passedData: DataState[] = [];
  failedData: DataState[] = [];
  dataState: DataState[] = [];
  IDs: number[] = [];
  ngOnInit() {
    debugger;
    this.data = this.DataService.getData();
    // this.dataState.length = Data.length;
    var ids = this.data.map(function (obj) { return obj.Id; });
    ids = ids.filter(function (v, i) { return ids.indexOf(v) == i; });
    this.IDs = ids;
    console.log(ids);
    for (let indexData = 0; indexData < this.data.length; indexData++) {
      if (indexData < this.IDs.length) {
        this.dataState[indexData] = new DataState();
      }
      for (let indexIds = 0; indexIds < this.IDs.length; indexIds++) {
        if (this.data[indexData].Id == this.IDs[indexIds]) {
          this.dataState[indexIds].Id = this.data[indexData].Id;
          this.dataState[indexIds].Name = this.data[indexData].Name;
          this.dataState[indexIds].Sum += this.data[indexData].Grade;
          this.dataState[indexIds].Exam++;
          break;
        }

      }
    }
    this.dataState = this.dataState.filter(x => x);
    console.log(this.dataState);


    this.getAverages();
  }
  getAverages() {
    this.dataState.forEach(element => {
      if (element.Sum / element.Exam >= 65) {
        this.passedData.push(element);
      }
      else {
        this.failedData.push(element);
      }

    });
  }

}

