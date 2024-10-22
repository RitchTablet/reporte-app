import { FormControl } from "@angular/forms";

export interface ReportForm {
    provider: FormControl<string|null>;
    consultorId: FormControl<number|null>;
    userWinId: FormControl<string|null>;
    jiraId: FormControl<string|null>;
    axityTribe: FormControl<string|null>;
    axitySquadLead: FormControl<string|null>;
    wmTechLead: FormControl<string|null>;
    professionalName: FormControl<string|null>;
    assignmentProject: FormControl<number|null>;
    hours: FormControl<number|null>;
    date: FormControl<string|null>;
    activitiesDescription: FormControl<string|null>;
    deliverables: FormControl<string|null>;
    comments: FormControl<string|null>;
}