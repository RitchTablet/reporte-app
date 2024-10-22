export interface CreateReportRequest {
  provider: string;
  consultorId: number;
  userWinId: string;
  jiraId: string;
  axityTribe: string;
  axitySquadLead: string;
  wmTechLead: string;
  assignmentProject: number;
  proyectName:string;
  hours: number;
  date: string;
  activitiesDescription: string;
  deliverables: string;
  comments: string;
}
