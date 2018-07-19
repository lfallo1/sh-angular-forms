import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  superheroForm: FormGroup;

  constructor(private matSnackBar: MatSnackBar){}

  onSubmit(formDirective: FormGroupDirective){
    this.matSnackBar.open(`${this.superheroForm.value['alias']} has been added!`, '', {duration: 4000});
    formDirective.resetForm();
    this.superheroForm.reset();
  }

  ngOnInit(): void {
    this.superheroForm = this.generateForm();
  }

  addSuit(): void{
    (<FormArray>this.superheroForm.get('suits')).push(this._generateSuit())
  }

  removeSuit(index: number): void{
    (<FormArray>this.superheroForm.get('suits')).removeAt(index);
  }

  generateForm(): FormGroup{
    return new FormGroup({
      'alias' : new FormControl(null, [Validators.required]),
      'fname' : new FormControl(null, [Validators.required]),
      'lname' : new FormControl(null, [Validators.required]),
      'powerLevel': new FormControl(1000, [Validators.required]),
      'suits' : new FormArray([ this._generateSuit() ])
    })
  }

  private _generateSuit(): FormGroup{
    return new FormGroup({
      'description' : new FormControl(null, Validators.required),
      'gloves' : new FormControl(true),
      'boots' : new FormControl(true),
    })
  }

}
