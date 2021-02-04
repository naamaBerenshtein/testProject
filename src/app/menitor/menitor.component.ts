import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataBase/data.service';
import { Data } from '../Models/Data.model';
import { DataState } from '../Models/dataState.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Ids } from '../Models/Ids.model';


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
  filterDataState: DataState[] = [];
  filterIdDataState: DataState[] = [];
  IDs: number[] = [];
  ids: Ids[] = [];
  NameFilter: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit() {
    this.data = this.DataService.getData();
    var ids = this.data.map(function (obj) { return obj.Id; });
    ids = ids.filter(function (v, i) { return ids.indexOf(v) == i; });
    this.IDs = ids;
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

    this.filterDataState = this.dataState;
    this.filterIdDataState = this.dataState;

    this.getAverages(this.dataState);
  }
  getAverages(dataState: DataState[]) {
    this.passedData = [];
    this.failedData = [];
    dataState.forEach(element => {
      if (element.Sum / element.Exam >= 65) {
        this.passedData.push(element);
      }
      else {
        this.failedData.push(element);
      }

    });
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value != "") {
      if (this.ids.length < 1) {
        this.filterIdDataState = [];
      }

      // Add our id
      if ((value || '').trim()) {
        this.ids.push({ id: value.trim() });

        this.filterIdDataState.push(this.dataState.filter(x => x.Id.toString() == value.trim())[0]);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.filterDataState = this.filterIdDataState;
      this.getAverages(this.filterDataState);
      if (this.NameFilter.length) {
        this.FilterName();
      }
    }
  }

  remove(id: Ids): void {

    const index = this.ids.indexOf(id);
    if (index >= 0) {
      this.ids.splice(index, 1);
      this.filterIdDataState = this.filterIdDataState.filter(x => x.Id.toString() != id.id);
      this.filterDataState = this.filterIdDataState;

      if (this.ids.length == 0) {

        this.filterIdDataState = this.filterDataState = this.dataState;
      }
    }
    this.getAverages(this.filterDataState);

  }
  FilterName() {
    this.filterDataState = this.filterIdDataState.filter(x => x.Name.indexOf(this.NameFilter) != -1);
    this.getAverages(this.filterDataState);


  }

}

