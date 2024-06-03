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
} from '@ionic/react';
import './Home.css';
import { RookConfig } from 'capacitor-rook-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  useEffect(() => {
    RookConfig.initRook({
      environment: 'sandbox',
      clientUUID: '',
      password: '',
    })
      .then(() => console.log('Initialized'))
      .catch((e: any) => console.log('error', e));
  }, []);

  const history = useHistory();

  const goToPremissionsView = () => {
    history.push('/permissions');
  };

  const goToSummariesView = async () => {
    try {
      const result = await RookConfig.getUserId();
      history.push('/summary');
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
      history.push('/events');
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
  const [userIdToUpdate, setuserIdToUpdate] = useState(String);

  const handleUpdateUserId = async (): Promise<void> => {
    try {
      console.log('updating . . .');
      const result = await RookConfig.updateUserId({ userId: userIdToUpdate });
      console.log('updated', result);
      setMessage('User id added');
    } catch (error) {
      setMessage('User id error');
      console.log('error', error);
    }
    setTitle('User id updated');
    setIsOpen(true);
  };

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
    } catch (error) {
      setMessage('error');
      console.log('error', error);
    }
    setTitle('User Id clear');
    setIsOpen(true);
  };

  const handleEvent = (ev: Event) => {
    const value: string = (ev.target as HTMLInputElement).value;
    setuserIdToUpdate(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput
              label="Enter user id"
              labelPlacement="floating"
              fill="solid"
              placeholder="Enter text"
              onIonInput={event => handleEvent(event)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonButton onClick={handleUpdateUserId}>Add user id</IonButton>
          </IonItem>
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
