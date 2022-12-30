
export interface IReport {
    // name: string,
    // max_image: number,
    // max_video: number,
    // max_doc: number,
    // labelId: string,
    // assignmentId: string,
    [key: string]: any
}

export type LabelsOnReports = {
    details: string | null
    reportId: string
    labelId: string
}
