import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonAlert,
  IonInput,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import './Home.css';
import { RookConfig } from 'capacitor-rook-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {

  const history = useHistory();

  useEffect(() => {
    RookConfig.getUserId()
    .then((idResult) => {
      setuserId(idResult.userId);
    })
  }, []);

  const goToPremissionsView = () => {
    history.push('/permissions');
  };

  const goToSummariesView = async () => {
    try {
      const result = await RookConfig.getUserId();
      console.log('result user id', result.userId);
      if (result.userId.length > 0) {
        history.push('/summary');
      }
    } catch (error) {
      setMessage('no user id set');
      setTitle('Empty User');
      setIsOpen(true);
      console.log('error', error);
    }
  };

  const goToEventsView = async () => {
    try {
      const result = await RookConfig.getUserId();
      console.log('result user id', result.userId);
      if (result.userId.length > 0) {
        history.push('/events');
      }
    } catch (error) {
      setMessage('fisrt add a user');
      setTitle('Empty User');
      setIsOpen(true);
      console.log('error', error);
    }
  };

  const goToBackgroundsView = async () => {
    try {
      const result = await RookConfig.getUserId();
      history.push('/background');
    } catch (error) {
      setMessage('fisrt add a user');
      setTitle('Empty User');
      setIsOpen(true);
      console.log('error', error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(String);
  const [message, setMessage] = useState(String);
  const [userId, setuserId] = useState(String);

  const handleGetUserId = async (): Promise<void> => {
    try {
      console.log('searching . . .');
      const result = await RookConfig.getUserId();
      console.log('user id', result.userId);
      setMessage(result.userId);
    } catch (error) {
      setMessage('no user id set');
      console.log('error', error);
    }
    setTitle('User id stored');
    setIsOpen(true);
  };

  const handleClearUserId = async (): Promise<void> => {
    try {
      const result = await RookConfig.clearUserId();
      setMessage('user id deleted');
      history.goBack();
    } catch (error) {
      setMessage('error');
      console.log('error', error);
    }
    setTitle('User Id clear');
    setIsOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Home user:{userId}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>

          <IonItem>
            <IonButton onClick={handleGetUserId}>Get user id</IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={handleClearUserId}>Clear user id</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={goToPremissionsView}>
              Go To Permissions
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={goToSummariesView}>Go To Summaries</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={goToEventsView}>Go To Events</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={goToBackgroundsView}>
              Go To Background
            </IonButton>
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

export default Home;
