import { FormControl } from "@angular/forms";

export interface ReportMonthYearForm {
  month: FormControl<number | null>;
  year: FormControl<number | null>;
}
