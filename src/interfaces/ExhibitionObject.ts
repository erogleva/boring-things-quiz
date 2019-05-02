export interface ExhibitionObject {
    id: string,
    name: string,
    src: string,
    quizDescription: string,
    locales: {
        en: {
            quizDescription: string
        }
    }
}