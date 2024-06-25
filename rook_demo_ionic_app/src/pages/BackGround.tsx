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
      setTitle('Background');
      setMessage(`scheduleYesterdaySync enable ${result.result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while enable scheduleYesterdaySync ${error}`);
    }
    setIsOpen(true);
  };

  const handleEnableSteps = async (): Promise<void> => {
    try {
      const result = await RookHealthConnect.enableBackgroundAndroidSteps();
      setTitle('Background');
      setMessage(`steps enable ${result.result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while enable steps ${error}`);
    }
    setIsOpen(true);
  };

  const handleDisableSteps = async (): Promise<void> => {
    try {
      const result = await RookHealthConnect.disableBackgroundAndroidSteps();
      setTitle('Background');
      setMessage(`steps diasble ${result.result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while diasble steps ${error}`);
    }
    setIsOpen(true);
  };

  const handleIsStepsEnable = async (): Promise<void> => {
    try {
      const result = await RookHealthConnect.isBackgroundAndroidStepsActive();
      setTitle('Background');
      setMessage(`steps status ${result.result}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while fetching steps status ${error}`);
    }
    setIsOpen(true);
  };

  const handleEnableAppleHealthSync = async (): Promise<void> => {
    try {
      const result = await RookConfig.enableAppleHealthSync();
      setTitle('Background');
      setMessage(`AppleHealthSync enable ${result}`);
    } catch (error) {
      setTitle('Background');
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

  const handleSyncStepsAndroid = async (): Promise<void> => {
    try {
      const result = await RookHealthConnect.syncTodayAndroidStepsCount();
      setTitle('Background');
      setMessage(`Andoird sytem steps ${result.stepCount}`);
    } catch (error) {
      setTitle('Background');
      setMessage(`error while fetch system android step  ${error}`);
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
          <IonTitle>Background</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
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
            <IonButton onClick={handleEnableAppleHealthSync}>
              Enable sync apple
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleDisableAppleHealthSync}>
              Disable sync apple
            </IonButton>
          </IonItem>
        </IonList>

        <IonItem>
            <IonButton onClick={handleScheduleYesterdaySync}>
              Start ScheduleYesterdaySync android
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleEnableSteps}>
              Enable background steps android
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleDisableSteps}>
              Disable background steps android
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleIsStepsEnable}>
              is background steps android
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleSyncStepsAndroid}>
              Sync android system steps
            </IonButton>
          </IonItem>

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
