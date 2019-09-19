import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {Trans} from '@lingui/macro';
import "./TinderObjects.css";
//@ts-ignore
import {Button} from 'react-materialize';
import {dislikeObject, likeObject} from "../../api";
import {LEVEL_ONE} from "../../constants";
import ModalDialog from "../common/Modal";
import {shuffleArray} from "../../utils/objectUtils";

interface Props {
    resetGame: () => void;
    setCurrentPage: Dispatch<SetStateAction<string>>,
    language: string,
    exhibitedObjects: ExhibitionObject[];
}

const reactionTypes = {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE'
};

const reactions = {
    [reactionTypes.LIKE]: (id: string) => likeObject(id),
    [reactionTypes.DISLIKE]: (id: string) => dislikeObject(id)
};

const TinderObjects = (props: Props) => {

    useEffect(() => {
        setObjects(shuffleArray([...props.exhibitedObjects]))
    }, [props.exhibitedObjects]);

    const handleClick = () => {
        setCurrentObject(prevState => {
            return prevState + 1
        });

        setLikesPercentage(null);
        setError(false);
    };

    const resetGame = () => {
        props.resetGame();
        props.setCurrentPage(LEVEL_ONE)
    };

    const handleReaction = async (type: string) => {
        setError(false);
        setReactionType(type);
        const id = objects[currentObject]._id;

        try {
            const res = await reactions[type](id);
            const likes = Number.parseInt(res.data.likes, 10);
            const dislikes = Number.parseInt(res.data.dislikes, 10);

            const totalVotes = likes + dislikes;

            const likesPercentage = Math.trunc((likes / totalVotes) * 100);

            setLikesPercentage(likesPercentage);
        } catch (e) {
            setError(true)
        }
    };

    const [currentObject, setCurrentObject] = useState(0);
    const [likesPercentage, setLikesPercentage] = useState<null | number>(null);
    const [error, setError] = useState(false);
    const [reactionType, setReactionType] = useState(reactionTypes.LIKE);
    const [objects, setObjects] = useState<ExhibitionObject[]>([]);

    const renderTitle = 'h6';
    const dislikePercentage = likesPercentage !== null ? 100 - likesPercentage : null;
    return <div className='level-four'>
        <Trans render={renderTitle}>Jetzt darfst du uns mal deine Meinung sagen! Findest du das Objekt
            "langweilig" oder nicht? <br/> Klicke auf das Bild, um mehr über das Objekt zu erfahren. </Trans>
        {objects.length > 0 && <ModalDialog content={
            <div>{props.language === 'de' ? objects[currentObject].detailedDescriptionDE : objects[currentObject].detailedDescriptionEN}</div>}
                                            trigger={<img src={objects[currentObject].src}
                                                          alt={objects[currentObject].src}/>}/>}

        {likesPercentage !== null && reactionType === reactionTypes.LIKE &&
        <Trans render={renderTitle}>{likesPercentage} Prozent der Nutzer fanden dieses Objekt auch interessant!</Trans>}
        {dislikePercentage !== null && reactionType === reactionTypes.DISLIKE &&
        <Trans render={renderTitle}>{dislikePercentage} Prozent der Nutzer fanden dieses Objekt auch
            langweilig!</Trans>}

        {error &&
        <Trans render={renderTitle}> <span className='error'>Auf dem Server ist ein interner Fehler aufgetreten.</span></Trans>}
        <div className='reactions'>
            <div className='bored'>
                <img src={require('../../assets/img/level-four/bored-reaction.png')} alt="bored"
                     onClick={() => handleReaction(reactionTypes.DISLIKE)}/>
            </div>
            <div className='heart'>
                <img src={require('../../assets/img/level-four/heart-reaction.png')} alt="bored"
                     onClick={() => handleReaction(reactionTypes.LIKE)}/>
            </div>
        </div>

        <div className='cta'>

            <Button onClick={resetGame} className='start-again'><Trans>Spiel von vorne starten!</Trans></Button>
            {currentObject < props.exhibitedObjects.length - 1 &&
            <Button onClick={handleClick} className='next-object'><Trans>Nächstes Objekt bewerten?</Trans></Button>}
        </div>
    </div>;
};

export default TinderObjects;
