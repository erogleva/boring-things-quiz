export interface ExhibitionObject {
    id: string,
    name: string,
    src: string,
    quizDescription: string,
    detailedDescription: string,
    locales: {
        en: {
            quizDescription: string,
            detailedDescription: string
        }
    }
}