import React from 'react';
// @ts-ignore
import { Row, Button, Container } from 'react-materialize';

interface Props  {
    setShowHelp (shouldShowHelp: boolean): void
}

const HelpPage = (props: Props) => {
    return <Container className='help-page-help-container'>
        <h5> Help text </h5>

        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis metus purus, molestie sit amet justo non, suscipit ornare leo.
        Sed accumsan feugiat diam vitae tincidunt. Suspendisse consectetur nisl nulla,
        in efficitur lectus pulvinar sed. Proin tincidunt nibh eget volutpat feugiat.
        Sed id condimentum lacus, at consequat lectus.
        Mauris eget tellus ac tortor auctor faucibus.
        Aliquam facilisis sem quis justo laoreet, eget pretium est mattis.

      <Row>
          <Button onClick={() => props.setShowHelp(false)}>Go Back</Button>
      </Row>
    </Container>;
};

export default HelpPage;