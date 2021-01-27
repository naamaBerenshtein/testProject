import { Component, OnInit } from '@angular/core';
import { Ids } from '../Models/Ids.model';
import { COMMA, ENTER, Y } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Data } from '../Models/Data.model';
import { DataService } from '../dataBase/data.service';
import { DataChart } from '../Models/DataChart.model';
import { Spline } from '../Models/Spline.model';
import { DatePipe } from '@angular/common';

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
  Subjects: string[] = [];
  dates: Date[] = [];
  aaa: DataChart[] = [];
  aa: DataChart[] = []
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ids: Ids[] = [

  ];

  public dataSpline: Spline[] = [
    // { id: 12313, data: [{ x: 'xs', y: 15 }, { x: 'xl', y: 20 }, { x: 'm', y: 25 }, { x: 'l', y: 30 }] },
    // { id: 12313, data: [{ x: 'xs', y: 20 }, { x: 'xl', y: 15 }, { x: 'm', y: 20 }, { x: 'l', y: 25 },] },
    // { id: 12313, data: [{ x: 'xs', y: 13 }, { x: 'xl', y: 15 }, { x: 'm', y: 13 }, { x: 'l', y: 25 },] },
    // { id: 12313, data: [{ x: 'xs', y: 56 }, { x: 'xl', y: 20 }, { x: 'm', y: 200 }, { x: 'l', y: 25 },] },
    // { id: 12313, data: [{ x: 'xs', y: 11 }, { x: 'xl', y: 15 }, { x: 'm', y: 20 }, { x: 'l', y: 25 }] }
  ];

  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',

  };


  public dataChart: DataChart[] = [
    // { x: 'GER', y: 172 },
    // { x: 'RUS', y: 172 },
    // { x: 'BRZ', y: 172 },
    // { x: 'IND', y: 172 },
    // { x: 'CHN', y: 172 },
  ];
  public primaryXAxisSpline: Object = {
    valueType: 'Category',

  }


  constructor(private DataService: DataService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.Subjects = this.DataService.getSubjects();
    this.data = this.DataService.getData();
    this.dates = this.DataService.getDates();

    this.getSubjectsAverages();
    this.getSplineAverage();
  }
  getSplineAverage() {
    // var ids=this.DataService.data.
    var ids = this.data.map(function (obj) { return obj.Id; });
    ids = ids.filter(function (v, i) { return ids.indexOf(v) == i; });
    ids.forEach(id => {
      this.dates.forEach(date => {
        this.data.filter(x => x.Id == id).forEach(x => { this.aa.push({ x: this.datepipe.transform(x.Date, 'dd/MM/yyyy'), y: x.Grade }) });
        this.dataSpline.push({ id: id, data: this.aa });

      })
    })
  }
  getSubjectsAverages() {
    this.Subjects.forEach(subject => {
      var aa = this.data.filter(x => x.Subject == subject).map(x => x.Grade)
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
      this.ids.push({ id: value.trim() });
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

    }
    // this.FilterName();

  }
}
