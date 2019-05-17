import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {ExhibitionObject} from "../../interfaces/ExhibitionObject";
//@ts-ignore
import {Col, Collection, CollectionItem, Icon, Row} from 'react-materialize';
import './TextQuiz.css';
import {shuffleArray} from "../../utils/arrayUtils";
import {t, Trans} from '@lingui/macro';
import {LanguageString} from "../../App";
import ModalDialog from "../common/Modal";
import {LEVEL_THREE} from "../../constants";
import {I18n} from "@lingui/react";
import Continue from '../common/Continue';


interface ModalContentProps {
    item: ExhibitionObject,
    showContinue: boolean,
    language: string
}


interface Props {
    correctItems: ExhibitionObject[];
    setCurrentPage: Dispatch<SetStateAction<string>>
    language: LanguageString
}

const TextsQuiz = (props: Props) => {

    let modalTriggerRef: any;
    let modalRef: any;

    const getItemStyle = (draggablePropsStyle: any, isDragging: boolean) => {
        if (!isDragging) {
            return {...draggablePropsStyle}
        } else {
            return {
                ...draggablePropsStyle,
            }
        }
    };

    const ModalContent = ({item, showContinue, language}: ModalContentProps) => {

        return <I18n>
            {({i18n}) => (
                <div className='modal-content'>

                    <div className='image-wrapper'>
                        <img src={require(`../../assets/img/${item.src}`)}/>
                    </div>
                    <div className='text-wrapper'>
                        <p>{props.language === 'de' ? item.detailedDescription : item.locales.en.detailedDescription}</p>
                    </div>

                    {showContinue &&
                    <Continue text={i18n._(t`Glückwunsch, alle Objekte sind richtig zugeordnet!`)}
                              buttonText={i18n._(t`Gehe zu Level ${'3'}`)}
                              handleClick={() => props.setCurrentPage(LEVEL_THREE)}/>}
                </div>
            )}
        </I18n>
    };

    const onDragEnd = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }

        if (result.destination.droppableId === result.draggableId) {
            const shouldShowContinue = correctlyIdentifiedDescriptions.length === 2;
            setCorrectlyIdentifiedDescriptions(prevState => ([...prevState, result.draggableId]));
            const item = items.find(item => item.id === result.draggableId);
            if (item) {

                setModalContent(<ModalContent item={item} showContinue={shouldShowContinue} language={props.language}/>);
                // setItems(prevState => prevState.filter(item => item.id !== result.draggableId))
                modalTriggerRef.click();

            }

        }
    };

    const [items, setItems] = useState<ExhibitionObject[]>(props.correctItems);
    const [descriptions, setDescriptions] = useState<ExhibitionObject[]>([]);
    const [correctlyIdentifiedDescriptions, setCorrectlyIdentifiedDescriptions] = useState<string[]>([]);
    const [modalContent, setModalContent] = useState<ReactElement>(<React.Fragment/>);

    // useEffect(() => {
    //     const additionalItems = getRandomObjects(exhibitedObjects, props.correctItems);
    //     setItems([...additionalItems]);
    // }, [props.correctItems]);

    useEffect(() => {
        setDescriptions(shuffleArray(items));
    }, [items]);

    return <I18n>
        {({i18n}) => (
            <div className='level-two-objects'>
                {correctlyIdentifiedDescriptions.length === 3 && <Continue text={i18n._(t`Glückwunsch, alle Objekte sind richtig zugeordnet!`)}
                                                                           buttonText={i18n._(t`Gehe zu Level ${'3'}`)}
                                                                           handleClick={() => props.setCurrentPage(LEVEL_THREE)}/>}
                <ModalDialog trigger={<a ref={(anchor) => modalTriggerRef = anchor}/>} content={modalContent}/>
                <Trans render="h6">Jetzt wird es schon etwas schwieriger. Kannst du die korrekte Beschreibung dem Objekt
                    zuordnen? </Trans>
                <Trans render="h6">Ob du wirklich richtig liegst, siehst du, wenn du das Häckchen siehst.</Trans>


                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='images' isDropDisabled={true} direction='horizontal'>
                        {(provided) => (
                            <div className='row images-droppable'
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}>

                                {items.filter(item => !correctlyIdentifiedDescriptions.includes(item.id)).map((item, index) => {
                                    return <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <img src={require(`../../assets/img/${item.src}`)} alt={item.name}
                                                 ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}
                                                 style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}/>
                                        )}
                                    </Draggable>
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className='row'>
                        <Col s={6} className='descriptions'>
                            <div className='descriptions-collection'>
                                {descriptions.map((item, index) => (
                                    <div key={index}
                                         className={correctlyIdentifiedDescriptions.includes(item.id) ? 'description correct' : 'description'}>
                                        {props.language === 'de' ? item.quizDescription : item.locales.en.quizDescription}
                                        {correctlyIdentifiedDescriptions.includes(item.id) &&
                                        <Icon small>
                                            check
                                        </Icon>}
                                    </div>))}
                            </div>
                        </Col>
                        <Col s={6} className='images'>
                            <div>
                                {descriptions.map(description =>
                                    <div key={description.src}>
                                        <Droppable droppableId={description.id}>
                                            {(provided) => (
                                                <div className='placeholder'
                                                     ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                                                    {correctlyIdentifiedDescriptions.includes(description.id) ?
                                                        <ModalDialog content={<ModalContent item={description}
                                                                                            showContinue={false}
                                                                                            language={props.language}/>}
                                                                     trigger={<img
                                                                         src={require(`../../assets/img/${description.src}`)}/>}/> :
                                                        <span><Trans>Zieh ein Bild hierher</Trans></span>}
                                                </div>
                                            )}

                                        </Droppable>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </div>
                </DragDropContext>
            </div>
        )}
    </I18n>
};

export default TextsQuiz;