import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonList,
  IonAlert,
  IonItem,
  IonDatetime,
  DatetimeChangeEventDetail,
} from '@ionic/react';
import './Home.css';
import { RookSummaries } from 'capacitor-rook-sdk';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Summaries: React.FC = () => {
  const [dateSelected, setDate] = useState(String);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(String);
  const [message, setMessage] = useState(String);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleSyncSleep = async (): Promise<void> => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
      const day = currentDate.getDate().toString().padStart(2, '0');
      if (dateSelected.length === 0) {
        setDate(`${year}-${month}-${day}`);
      }
      const { result } = await RookSummaries.syncSleepSummary({
        date: dateSelected,
      });
      setTitle('Sleep');
      setMessage(`Sleep from date ${dateSelected} uploaded: ${result}`);
      setIsOpen(true);
    } catch (error) {
      setTitle('Sleep');
      setMessage(
        `Error while uploading sleep from date ${dateSelected} ${error}`,
      );
      setIsOpen(true);
    }
  };

  const handleSyncPhysical = async (): Promise<void> => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
      const day = currentDate.getDate().toString().padStart(2, '0');
      if (dateSelected.length === 0) {
        setDate(`${year}-${month}-${day}`);
      }
      const result = await RookSummaries.syncPhysicalSummary({
        date: dateSelected,
      });
      setTitle('Physical');
      setMessage(`Physical from date ${dateSelected} uploaded`);
      setIsOpen(true);
    } catch (error) {
      setTitle('Physical');
      setMessage(
        `Error while uploading physical from date ${dateSelected} ${error}`,
      );
      setIsOpen(true);
    }
  };

  const handleSyncBody = async (): Promise<void> => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
      const day = currentDate.getDate().toString().padStart(2, '0');
      if (dateSelected.length === 0) {
        setDate(`${year}-${month}-${day}`);
      }
      const result = await RookSummaries.syncBodySummary({
        date: dateSelected,
      });
      setTitle('Body');
      setMessage(`Sleep from date ${dateSelected} uploaded`);
      setIsOpen(true);
    } catch (error) {
      setTitle('Body');
      setMessage(
        `Error while uploading body from date ${dateSelected} ${error}`,
      );
      setIsOpen(true);
    }
  };

  const handleDateChange = (event: CustomEvent<DatetimeChangeEventDetail>) => {
    const dateValue = event.detail.value;
    if (Array.isArray(dateValue)) {
      const date: string = dateValue[0].split('T')[0];
      console.log(date);
      setDate(date);
    } else if (dateValue) {
      const date: string = dateValue.split('T')[0];
      console.log(date);
      setDate(date);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Summaries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <IonList>
          <IonDatetime onIonChange={handleDateChange} />

          <IonItem>
            <IonButton onClick={handleSyncSleep}>Sync sleep</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleSyncPhysical}>Sync physical</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleSyncBody}>Sync body</IonButton>
          </IonItem>
        </IonList>

        <IonAlert
          isOpen={isOpen}
          header={title}
          message={message}
          buttons={['Action']}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Summaries;
