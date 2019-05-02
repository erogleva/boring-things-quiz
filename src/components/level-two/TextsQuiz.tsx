import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
//@ts-ignore
import {Col, Collection, CollectionItem, Icon, Row} from 'react-materialize';
import './TextQuiz.css';
import {getRandomObjects, shuffleArray} from "../../utils/arrayUtils";
import {exhibitedObjects} from "../level-one/objects/data";

interface Props {
    correctItems: ExhibitionObject[];
}

const TextsQuiz = (props: Props) => {

    const onDragEnd = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }

        console.log(result);

        const newIdx: number = +result.destination.droppableId;
        const srcIdx: number = +result.source.droppableId;

        const item = descriptions[srcIdx];
        console.log(item);

        const destItem = descriptions[newIdx];
        console.log(destItem);

        if (newIdx === items.findIndex((object) => object.id === destItem.id)) {
            return
        }

        const descriptionsReordered = [...descriptions];

        const [removed] = descriptionsReordered.splice(srcIdx, 1);
        descriptionsReordered.splice(newIdx, 0, removed);
        setDescriptions(descriptionsReordered);
    };

    const [items, setItems] = useState<ExhibitionObject[]>([]);
    const [descriptions, setDescriptions] = useState<ExhibitionObject[]>([]);

    useEffect(() => {
        const additionalItems = getRandomObjects(exhibitedObjects, props.correctItems);
        setItems([...additionalItems, ...props.correctItems]);
    }, [props.correctItems]);

    useEffect(() => {
        setDescriptions(shuffleArray(items));
    }, [items]);

    return <div className='level-two-objects'>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='row'>
                <Col s={6} className='descriptions'>
                    {descriptions.map((item, index) => (
                        <Droppable droppableId={index.toString()} isDropDisabled={index === items.findIndex((object) => object.id === item.id)}>
                            {(provided) => (
                                <div className='descriptions-collection'
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                >
                                    <Draggable key={item.id} draggableId={item.id} index={0}
                                               isDragDisabled={index === items.findIndex((object) => object.id === item.id)}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={index === items.findIndex((object) => object.id === item.id) ? 'description correct' : 'description'}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{...provided.draggableProps.style}}
                                            >
                                                {item.quizDescription}
                                                {index === items.findIndex((object) => object.id === item.id) &&
                                                <Icon small>
                                                    check
                                                </Icon>}
                                            </div>
                                        )}
                                    </Draggable>

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </Col>
                <Col s={6} className='images'>
                    <div>
                        {items.map(item =>
                            <div key={item.src}>
                                <img src={require(`../../assets/img/${item.src}`)} alt={item.name}/>
                            </div>
                        )}
                    </div>
                </Col>
            </div>
        </DragDropContext>
    </div>;
};

export default TextsQuiz;