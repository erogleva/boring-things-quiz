import {ExhibitionObject} from "../interfaces/ExhibitionObject";

// shuffle the elements of a given array
export function shuffleArray<Type> (array: Array<Type>): Array<Type> {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        let j = i;

        // ensure that the element is not in the same position as in the source array
        while (j == i){
            j = Math.floor(Math.random() * (i + 1));
        }

        // swap the positions
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// utility function that returns a random number within a given range
const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


// get three random objects from the lists
export function getRandomObjects<Type> (objects: ExhibitionObject[], initialList: ExhibitionObject[] = [], number = 3): ExhibitionObject[] {

    console.log(objects)
    let additionalObjects: ExhibitionObject[] = [];

    while (additionalObjects.length < number) {
        const randomNumber = getRandomInt(0, objects.length - 1);
        console.log(randomNumber)
         if (!additionalObjects.some(object => object._id === objects[randomNumber]._id)
            && !additionalObjects.some((object => object._id === objects[randomNumber]._id ))) {
            additionalObjects.push(objects[randomNumber]);
        }
    }

    return additionalObjects.concat(initialList.slice());
}

export function getSourcePath(source: string) {
    return
}
