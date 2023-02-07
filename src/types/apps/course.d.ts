export interface ICourse {
    _id: string,
    title: string,
    number_of_lessons: number,
    duration: string,   
    // instructor: string,  // type: Schema.Types.ObjectId,
    details: string,
    thumbnail: string,
    // attachment: string[],
    // isPublish: Boolean,
}