import React, {useState} from 'react';
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
import {Trans} from '@lingui/macro';
import "./TinderObjects.css";
//@ts-ignore
import {Button} from 'react-materialize';
import {dislikeObject, likeObject} from "../../api";
import { exhibitedObjects } from "../../data";

interface Props {
    correctItems: ExhibitionObject[];
    resetGame: () => void;
}

const reactionTypes = {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE'
};

const TinderObjects = (props: Props) => {

    const objects = [...exhibitedObjects];

    const handleClick = () => {
        setCurrentObject(prevState => {
            return prevState + 1
        });

        setLikesPercentage(null);
    };

    const handleReaction = async (type: string) => {
        let res;
        const id = objects[currentObject].id;

        try {
            if (type === reactionTypes.LIKE) {
                res = await likeObject(id)
            } else {
                res = await dislikeObject(id)
            }

            const likes = Number.parseInt(res.data.likes, 10);
            const dislikes = Number.parseInt(res.data.dislikes, 10);

            console.log(res);

            const totalVotes = likes + dislikes;

            const likesPercentage = Math.trunc((likes / totalVotes) * 100);

            setLikesPercentage(likesPercentage);
        } catch (e) {
            console.log(e)
        }
    };

    const [currentObject, setCurrentObject] = useState(0);
    const [likesPercentage, setLikesPercentage] = useState<null|number>(null);

    const renderTitle = 'h6';
    return <div className='level-four'>
        <Trans render={renderTitle}>Jetzt darft du uns mal deine Meinung sagen! Findest du das Objekt
            "langweilig"?</Trans>
        <img src={require(`../../assets/img/${objects[currentObject].src}`)}
             alt={objects[currentObject].name}/>
        {likesPercentage !== null && <Trans render={renderTitle}>{likesPercentage} Prozent der Nutzer fanden dieses Objekt nicht langweilig!</Trans>}
        <div className='reactions'>
            <div className='bored'>
                <img src={require('../../assets/img/level-four/bored-reaction.png')} alt="bored" onClick={() => handleReaction(reactionTypes.DISLIKE)}/>
            </div>
            <div className='heart'>
                <img src={require('../../assets/img/level-four/heart-reaction.png')} alt="bored" onClick={() => handleReaction(reactionTypes.LIKE)}/>
            </div>
        </div>

        <div className='cta'>

        <Button onClick={props.resetGame} className='start-again'>Spiel neu starten!</Button>
        {currentObject < 39 && <Button onClick={handleClick} className='next-object'><Trans>Nächstes Objekt bewerten?</Trans></Button>}
        </div>
    </div>;
};

export default TinderObjects;