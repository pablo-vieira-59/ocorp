import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  
  @Input()
  public steps :string[] = ["Inicio","Meio","Fim"];

  public initialStep :string = "";
  public middleSteps :string[] = [];
  public finalStep :string = "";
  public currentStep :string = "";

  @Input()
  public enableStepChange :boolean = true;

  @Input()
  public currentIdx :number = 0;

  @Output()
  OnStepChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.currentStep = this.steps[0];
    this.initialStep = this.steps[0];
    this.middleSteps = this.steps.slice(1, this.steps.length - 1);
    this.finalStep = this.steps[this.steps.length - 1];
  }

  public getStepClass(step :string, isPrevious :boolean, isMarker :boolean) :string {
    var idx = this.steps.indexOf(step);

    if(isPrevious) {
      idx--;
    }

    if(idx < this.currentIdx) {
      if(isMarker){
        return "bg-primary progress-start rounded-circle text-center";
      }
      return "bg-primary progress-bar";
    }
    else {
      if(isMarker){
        return "bg-white-ddd progress-start rounded-circle text-center";
      }
      return "bg-white-ddd progress-bar";
    }
  }

  public setStep(step :string) :void {
    if(!this.enableStepChange) {
      return;
    }
    
    this.currentStep = step;
    this.currentIdx = this.steps.indexOf(step);

    this.OnStepChange.emit(this.currentIdx);
  }
}
