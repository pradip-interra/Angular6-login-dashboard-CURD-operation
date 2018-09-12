import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { IPost } from '../services/posts.data';
import { Router } from '@angular/router';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  public posts = [];
  gridColumnDefn = [];

  private gridApi = undefined;
  private gridColumnApi = undefined;
  private gridReady = false;
  private gridRowSelected = false;
  private errorMessage = '';

  constructor(private postService: PostsService, private router: Router) {
    this.posts = [];
    this.gridColumnDefn = [
      { headerName: 'Post ID', field: 'id', checkboxSelection: true },
      { headerName: 'User ID', field: 'userId' },
      { headerName: 'Post Title', field: 'title' }
    ];
  }

  ngOnInit() {
    this.postService.getPosts().subscribe(
      data => this.posts = data,
      error => this.errorMessage = error
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridReady = true;
    this.gridApi.sizeColumnsToFit(); // autosizing of the grid based on content
  }

  onRowSelected(params) {
    let selectedRows = this.gridApi.getSelectedNodes(); // getting the row
    let selectedRowsInArray = selectedRows.map(post => post.data); // getting the data of the row
    this.gridRowSelected = (selectedRowsInArray.length === 0) ? false : true; // if row is unselected, set this property to disable buttons
  }

  onCreate() {
    console.log("onCreate");
    this.router.navigate(['/posts/create']);
  }

  onEdit() {
    console.log("onEdit");
    let id = this.getSelectedRow();
    this.router.navigate(['/posts/edit', id]);
  }

  onDelete() {
    console.log("onDelete");
    let id = this.getSelectedRow();
    this.router.navigate(['/posts/delete', id]);
  }

  onRefresh() {
    console.log("Refreshing ...");
    this.postService.getPosts().subscribe(
      data => this.posts = data
    )
  }

  onRowDoubleClicked(row) {
    let rowData = row.data;
    this.postService.setPostSubject(rowData);
    this.router.navigate(['/posts', rowData['id']]);
  }

  // this returns the ID, does not publish any event
  private getSelectedRow(): number {
    if (this.gridReady) {
      let selectedRows = this.gridApi.getSelectedNodes(); // getting the row
      let selectedRowsInArray = selectedRows.map(post => post.data); // getting the data of the row
      let firstRow = selectedRowsInArray[0]; // as single selection, pick up the post
      let id = firstRow['id']; // I need the 'id' field only.
      return id;
    } else {
      alert('Making the Grid Ready. Please try later ...  ');
    }
  }

}
