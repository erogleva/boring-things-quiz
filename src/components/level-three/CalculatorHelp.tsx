import React from 'react';
import {Trans} from '@lingui/macro';

interface Props {
    isHelpPage: boolean
}

const CalculatorHelp = (props: Props) => {
  return <React.Fragment>
          <Trans render="h6">Jetzt ist es an der Zeit, Schickarts Rechenmaschine auszuprobieren! </Trans>
          <Trans render="h6">Oben siehst du eine Aufgabe, die du ausrechnen sollst. Es gibt insgesamt drei Aufgaben. </Trans>
      <Trans render="h6">Fange an, indem du die erste Zahl in die Rechenmaschine eingibst. Dazu klickst du die Scheiben unter den bunten Nullen. Die farbigen Felder von rechts nach links stehen für Einser, Zehner, Hunderter usw. Daher musst du immer von rechts nach links arbeiten.</Trans>
      <Trans render="h6">Wenn die Aufgabe 23 + 45 ist, gibst du erst die Drei ein, indem du drei mal auf die erste Scheibe von rechts klickst, dann gehst du eine Scheibe nach links und klickst zwei mal. </Trans>
      <Trans render="h6">Nun kannst du die zweite Zahl addieren. Die Maschine macht die Addition automatisch. Man braucht kein Pluszeichen. Die zweite Zahl gibst du genau so wie die Erste ein, aber vergiss nicht zu zählen, wie oft du geklickt hast! Die Rechenmaschine zählt jeden Klick mit!</Trans>
      <Trans render="h6">Das Endergebnis wird dir in den farbigen Feldern angezeigt. Drück auf <em>Eingeben!</em> um dein Ergebnis zu überprüfen.</Trans>
      {!props.isHelpPage && <Trans render="h6">Unter <em>Brauchst du Hilfe?</em> findest du auch eine Videoanleitung für die Maschine.</Trans>}
      <Trans render="h6">Viel Spaß!</Trans>
  </React.Fragment>;
};

export default CalculatorHelp;