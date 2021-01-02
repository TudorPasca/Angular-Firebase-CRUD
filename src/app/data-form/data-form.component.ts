import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  blogPost = {
    title: '',
    body: '',
    category: '',
    date_posted: new Date().toDateString()
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DataFormComponent>,
    private firebaseService: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.blogPost});
    this.dialogRef.close();
    console.log(this.blogPost);
  }

  isValid(): boolean {
    return(this.blogPost.title != '' && this.blogPost.body != '' && this.blogPost.category != '');
  }

  categories = [
    {value: 'Web Development', viewValue: 'Web Development'},
    {value: 'Android Development', viewValue: 'Android Development'},
    {value: 'IOS Development', viewValue: 'IOS Development'}
  ];
}