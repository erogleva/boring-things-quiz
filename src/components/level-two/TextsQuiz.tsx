import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
//@ts-ignore
import {Col, Collection, CollectionItem, Icon, Row} from 'react-materialize';
import './TextQuiz.css';
import {getRandomObjects, shuffleArray} from "../../utils/arrayUtils";
import {exhibitedObjects} from "../../data";
import Continue from '../common/Continue';

interface Props {
    correctItems: ExhibitionObject[];
    setCurrentPage: Dispatch<SetStateAction<string>>
}

const TextsQuiz = (props: Props) => {

    const onDragEnd = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }

        const newIdx: number = +result.destination.index;
        const srcIdx: number = +result.source.index;

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
                        <Droppable droppableId='description-droppable'>
                            {(provided) => (
                                <div className='descriptions-collection'
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                >
                                    {descriptions.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

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
        {descriptions.every((description, index) => items[index].id === description.id) &&
        <Continue text='Congratulations! All descriptions are now matched correctly!'
                  handleClick={() => props.setCurrentPage('level-three')}/>}
    </div>;
};

export default TextsQuiz;