import React, {ReactElement} from 'react';
//@ts-ignore
import {Button, Col, Icon, Modal, Row} from 'react-materialize';

interface Props {
    trigger: ReactElement,
    content: ReactElement,
    options?: object
}

const ModalDialog = (props: Props) => {
    return <Modal trigger={props.trigger} options={props.options}>
        {props.content}
    </Modal>
};

export default ModalDialog;