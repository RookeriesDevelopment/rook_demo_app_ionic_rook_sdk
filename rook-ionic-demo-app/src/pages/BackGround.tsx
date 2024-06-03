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
import {
  RookConfig,
  RookHealthConnect,
  RookAppleHealth,
} from 'capacitor-rook-sdk';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const BackGround: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(String);
  const [message, setMessage] = useState(String);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleEnableBackGround = async (): Promise<void> => {
    try {
      const result = await RookAppleHealth.enableBackGroundUpdates();
      setTitle('Background');
      setMessage(`background enable ${result.result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while enable background ${error}`);
    }
    setIsOpen(true);
  };

  const handleDisableBackGround = async (): Promise<void> => {
    try {
      const result = await RookAppleHealth.disableBackGroundUpdates();
      setTitle('Background');
      setMessage(`background disable ${result.result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while disable background ${error}`);
    }
    setIsOpen(true);
  };

  const handleScheduleYesterdaySync = async (): Promise<void> => {
    try {
      const result = await RookHealthConnect.scheduleYesterdaySync({
        doOnEnd: 'latest',
      });
      setTitle('Schedule Yesterday Sync');
      setMessage(`scheduleYesterdaySync enable ${result.result}`);
    } catch (error) {
      setTitle('Schedule Yesterday Sync');
      setMessage(`error while enable scheduleYesterdaySync ${error}`);
    }
    setIsOpen(true);
  };

  const handleEnableAppleHealthSync = async (): Promise<void> => {
    try {
      const result = await RookConfig.enableAppleHealthSync();
      setTitle('ForeGround');
      setMessage(`AppleHealthSync enable ${result}`);
    } catch (error) {
      setTitle('ForeGround');
      setMessage(`error while enable AppleHealthSync ${error}`);
    }
    setIsOpen(true);
  };

  const handleDisableAppleHealthSync = async (): Promise<void> => {
    try {
      const result = await RookConfig.disableAppleHealthSync();
      setTitle('Background');
      setMessage(`AppleHealthSync disable ${result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while disable AppleHealthSync ${error}`);
    }
    setIsOpen(true);
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
        <IonButton onClick={goBack}>Go Back</IonButton>
        <IonList>
          <IonItem>
            <IonButton onClick={handleEnableBackGround}>
              Enable back ground sync apple
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleDisableBackGround}>
              Disable back ground sync apple
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleScheduleYesterdaySync}>
              Schedule yesterday android
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleEnableAppleHealthSync}>
              Enable apple Foreground sync
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleDisableAppleHealthSync}>
              Disable apple Foreground sync
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

export default BackGround;
