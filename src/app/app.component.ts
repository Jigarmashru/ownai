import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ownaitask';

  purchaseForm!: FormGroup;

  expandedIndex: number | null = null;
  clients: string[] = ['a', 'b', 'c'];
  poTypes: string[] = ['Group PO', 'Individual PO'];
  currencies: string[] = ['USD', 'EUR', 'GBP'];
  jobTitleData: string[] = ['Application Development', 'Buisness Administrator']
  jobIDMap = {
    'Application Development': 'OWNAI_234',
    'Buisness Administrator': 'CLK_12880',
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.purchaseForm = this.fb.group({
      clientName: ['', Validators.required],
      purchaseOrderType: ['', Validators.required],
      purchaseOrderNo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/)]],
      receivedOn: ['', Validators.required],
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      poStartDate: ['', Validators.required],
      poEndDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.max(99999), Validators.min(0)]],
      currency: ['', Validators.required],
      talentDetails: this.fb.array([])
    });
  }

  addTalentDetails() {
    const talentData = this.purchaseForm.controls['talentDetails'] as FormArray;
    const talentGroup = this.fb.group({
      jobTitle: ['', Validators.required],
      jobID: [''],

      name1: [false],
      contractDuration1: [{ value: '', disabled: true }, Validators.required],
      billRate1: [{ value: '', disabled: true }, Validators.required],
      billRateCurrancy1: [{ value: '', disabled: true }, Validators.required],
      standardTime1: [{ value: '', disabled: true }, Validators.required],
      standardTimeCurrancy1: [{ value: '', disabled: true }, Validators.required],
      overTime1: [{ value: '', disabled: true }, Validators.required],
      overTimeCurrancy1: [{ value: '', disabled: true }, Validators.required],

      name2: [false],
      contractDuration2: [{ value: '', disabled: true }, Validators.required],
      billRate2: [{ value: '', disabled: true }, Validators.required],
      billRateCurrancy2: [{ value: '', disabled: true }, Validators.required],
      standardTime2: [{ value: '', disabled: true }, Validators.required],
      standardTimeCurrancy2: [{ value: '', disabled: true }, Validators.required],
      overTime2: [{ value: '', disabled: true }, Validators.required],
      overTimeCurrancy2: [{ value: '', disabled: true }, Validators.required]
    });

    talentData.push(talentGroup);

    talentGroup.get('jobTitle')?.valueChanges.subscribe(value => {
      const jobID = this.jobIDMap[value as keyof typeof this.jobIDMap] || '';
      talentGroup.get('jobID')?.setValue(jobID);
    });

    talentGroup.get('name1')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.enableFormGroup(talentGroup, 1);
      } else {
        this.disableFormGroup(talentGroup, 1);
      }
    });

    talentGroup.get('name2')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.enableFormGroup(talentGroup, 2);
      } else {
        this.disableFormGroup(talentGroup, 2);
      }
    });
  }

  enableFormGroup(formGroup: FormGroup, datanumber: number) {
    formGroup.get(`contractDuration${datanumber}`)?.enable();
    formGroup.get(`billRate${datanumber}`)?.enable();
    formGroup.get(`billRateCurrancy${datanumber}`)?.enable();
    formGroup.get(`standardTime${datanumber}`)?.enable();
    formGroup.get(`standardTimeCurrancy${datanumber}`)?.enable();
    formGroup.get(`overTime${datanumber}`)?.enable();
    formGroup.get(`overTimeCurrancy${datanumber}`)?.enable();
  }

  disableFormGroup(formGroup: FormGroup, datanumber: number) {
    formGroup.get(`contractDuration${datanumber}`)?.disable();
    formGroup.get(`billRate${datanumber}`)?.disable();
    formGroup.get(`billRateCurrancy${datanumber}`)?.disable();
    formGroup.get(`standardTime${datanumber}`)?.disable();
    formGroup.get(`standardTimeCurrancy${datanumber}`)?.disable();
    formGroup.get(`overTime${datanumber}`)?.disable();
    formGroup.get(`overTimeCurrancy${datanumber}`)?.disable();
  }

  onReset() {
    this.purchaseForm.reset();
  }

  submit() {
    console.log("Purchase Form Is : ", this.purchaseForm.value);
    this.onReset();
  }

  moreData(index: any) {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

}
