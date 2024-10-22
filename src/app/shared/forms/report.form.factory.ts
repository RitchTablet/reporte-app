import { inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReportForm } from "@shared/interfaces/forms/report.form";
import { DateService } from "@shared/services/date.service";

export class ReportFormFactory {
    
    static createFormControls() : ReportForm {
        return {
            provider: new FormControl('', Validators.required),
            consultorId: new FormControl(0, Validators.required),
            userWinId: new FormControl('', Validators.required),
            jiraId: new FormControl('', Validators.required),
            axityTribe: new FormControl(),
            axitySquadLead: new FormControl('', Validators.required),
            wmTechLead: new FormControl('', Validators.required),
            professionalName: new FormControl('', Validators.required),
            assignmentProject: new FormControl(0, Validators.required),
            hours: new FormControl(0, Validators.required),
            date: new FormControl('', Validators.required),
            activitiesDescription: new FormControl('', Validators.required),
            deliverables: new FormControl(''),
            comments: new FormControl(''),
        }
    } 
}

export class FormTool {
    static disableControls(formGroup:FormGroup, controlsNames:string[]): FormGroup {
        controlsNames.forEach(name => {
            formGroup.get(name)?.disable();
        });

        return new FormGroup(formGroup.controls);
    }

    static setForm<T>(formGroup: FormGroup, value: T): FormGroup {
        formGroup.patchValue(value as any);
        return new FormGroup(formGroup.controls);
    }
}