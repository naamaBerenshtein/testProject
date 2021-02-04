import { Component, OnInit } from '@angular/core';
import { Ids } from '../Models/Ids.model';
import { COMMA, ENTER, X, Y } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Data } from '../Models/Data.model';
import { DataService } from '../dataBase/data.service';
import { DataChart } from '../Models/DataChart.model';
import { Spline } from '../Models/Spline.model';
import { DatePipe } from '@angular/common';
import { DataState } from '../Models/dataState.model';

@Component({
  selector: 'pm-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  data: Data[];
  filterData: Data[] = [];
  Subjects: string[] = [];
  dates: string[] = [];
  aaa: DataChart[] = [];
  aa: DataChart[] = []
  dataChart: DataChart[] = [];
  dataStudent: DataState[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ids: Ids[] = [];
  filterSubject: Ids[] = [];
  dataSpline: Spline[] = [];
  public primaryXAxis: Object = {
    valueType: 'Category',

  };
  public primaryStudentAvarages: Object = {
    valueType: 'Category',

  };
  public primaryXAxisSpline: Object = {
    valueType: 'Category',
  }


  constructor(private DataService: DataService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.Subjects = this.DataService.getSubjects();
    this.data = this.DataService.getData();
    this.filterData = this.data;
    this.dates = this.DataService.getDates().map(x => this.datepipe.transform(x));
    this.getSubjectsAverages();
    this.getSplineAverage();
    this.getStudentAverages();
  }
  getSplineAverage() {
    this.dataSpline = [];
    var ids = this.filterData.map(function (obj) { return obj.Id; });
    ids = ids.filter(function (v, i) { return ids.indexOf(v) == i; });
    var datess = this.dates.map(function (obj) { return obj; });
    datess = datess.filter(function (v, i) { return datess.indexOf(v) == i; });
    var bb;
    ids.forEach(id => {
      this.aa = [];
      datess.forEach(date => {
        var filter = this.filterData.filter(x => x.Id == id && this.datepipe.transform(x.Date) == date);
        if (filter.length) {
          this.aa.push({ x: date, y: filter.map(x => x.Grade)[0] })
        }
      })
      this.dataSpline.push({ id: id, data: this.aa });

    })
  }
  getSubjectsAverages() {
    this.dataChart = [];
    this.Subjects.forEach(subject => {
      var aa = this.filterData.filter(x => x.Subject == subject).map(x => x.Grade)
      var bb = aa.reduce((acc, cur) => acc + cur, 0)
      var average = bb / aa.length;
      this.dataChart.push({ x: subject, y: average })
    });



  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our id
    if ((value || '').trim()) {
      if (this.filterSubject.length < 1 && this.ids.length < 1) {
        this.filterData = [];
      }
      this.ids.push({ id: value.trim() });
      this.data.filter(x => x.Id.toString() == value.trim()).forEach(x => this.filterData.push(x));
      this.getSubjectsAverages();
      this.getSplineAverage();
      this.getStudentAverages();

    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(id: Ids): void {
    const index = this.ids.indexOf(id);
    if (index >= 0) {
      this.ids.splice(index, 1);
      this.filterData = this.filterData.filter(x => x.Id.toString() != id.id);
    }
    if (this.ids.length < 1) {
      this.filterData = this.data;
    }




    this.getSubjectsAverages();
    this.getSplineAverage();
    this.getStudentAverages();

  }
  getStudentAverages() {
    this.dataStudent = [];
    var ids = this.filterData.map(function (obj) { return obj.Id; });
    ids = ids.filter(function (v, i) { return ids.indexOf(v) == i; });

    for (let indexData = 0; indexData < this.filterData.length; indexData++) {
      if (indexData < ids.length) {
        this.dataStudent[indexData] = new DataState();
      }
      for (let indexIds = 0; indexIds < ids.length; indexIds++) {
        if (this.data[indexData].Id == ids[indexIds]) {
          this.dataStudent[indexIds].Id = this.filterData[indexData].Id;
          this.dataStudent[indexIds].Name = this.filterData[indexData].Name;
          this.dataStudent[indexIds].Sum += this.filterData[indexData].Grade;
          this.dataStudent[indexIds].Exam++;
          break;
        }

      }
    }


    this.dataStudent.forEach(x => x.Average = x.Sum / x.Exam);

  }
  addSubject(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our id
    if ((value || '').trim()) {
      this.filterSubject.push({ id: value.trim() });
      this.filterData = this.filterData.filter(x => x.Subject == value.trim())
      this.getSubjectsAverages();
      this.getSplineAverage();
      this.getStudentAverages();

    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeSubject(id: Ids): void {
    const index = this.filterSubject.indexOf(id);
    if (index >= 0) {
      this.filterSubject.splice(index, 1);
      this.filterData = this.filterData.filter(x => x.Subject.toString() != id.id);
    }
    if (this.ids.length < 1) {
      this.filterData = this.data;
    }
    this.getSubjectsAverages();
    this.getSplineAverage();
    this.getStudentAverages();

  }

}
