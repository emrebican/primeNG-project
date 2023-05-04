import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [null, Validators.required],
      subTitle: [null, Validators.required],
      content: [null, Validators.required],
      imageURL: [null, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
