import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../Models/Data.model';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../dataBase/data.service';
import { AddDataComponent } from '../add-data/add-data.component';

@Component({
  selector: 'pm-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],

})
export class DataComponent implements OnInit, AfterViewInit {

  constructor(private _router: Router, private _route: ActivatedRoute, private DataService: DataService, public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  data: Data[];
  chooseDate: Data = new Data();
  displayedColumns: string[] = ['Id', 'Name', 'Date', 'Grade', 'Subject', 'Edit', 'Delete'];
  paramFilter: string;
  dataSource;
  ngOnInit() {
    this.getData();
    this._route.params.subscribe(params => {
      if (params.Filter) {
        this.paramFilter = params.Filter;
        this.filter();
      }
      else {
        // this.data = this.DataService.getData();
        this.getData();

      }
      this.getDataSorce();

    });





  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  filterData() {
    this.getData();
    this._router.navigate(['../', { Filter: this.paramFilter }]);
    this.filter();
    this.getDataSorce();
  }
  getDetiles(id: number) {
    this.chooseDate = this.data.filter(x => x.Id == id)[0];
  }
  getDataSorce() {
    this.dataSource = new MatTableDataSource<Data>(this.data);
  }
  filter() {
    this.data = this.data.filter(x =>
      x.Id.toString() == this.paramFilter
      // ||x.Name.toLowerCase == this.paramFilter.toLowerCase
      //  x.City==this.paramFilter
    );

  }
  openAddDialog() {

    const dialogRef = this.dialog.open(AddDataComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => {
    
      this.getData();
      this.getDataSorce();
    });
  }
  Delete(index:number) {
    this.DataService.deleteData(index);
    this.getData();
    this.getDataSorce();


  }
  getData() {
    this.data = this.DataService.getData();

  }

}
