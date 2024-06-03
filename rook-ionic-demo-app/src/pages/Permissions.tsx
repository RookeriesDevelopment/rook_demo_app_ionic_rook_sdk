import { IonButtons,
   IonContent,
   IonHeader,
   IonPage,
   IonTitle,
   IonToolbar,
   IonButton,
   IonBackButton,
   IonList,
   IonItem
         } from '@ionic/react';
import './Home.css';
import { RookPermissions } from 'capacitor-rook-sdk';
import { useHistory } from 'react-router-dom';

const Permissions: React.FC = () => {

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleRequestAllPermissions = async (): Promise<void> => {
    try {
      const result = await RookPermissions.requestAllPermissions();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRequestAllAppleHealthPermissions = async (): Promise<void> => {
    try {
      const result = await RookPermissions.requestAllAppleHealthPermissions();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRequestAllHealthConnectPermissions = async (): Promise<void> => {
    try {
      const result = await RookPermissions.requestAllHealthConnectPermissions();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const hanleOpenIOSSettings = async (): Promise<void> => {
    try {
      const result = await RookPermissions.openIOSSettings();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOpenHealthConnectSettings = async (): Promise<void> => {
    try {
      const result = await RookPermissions.openHealthConnectSettings();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRequestAndroidBackgroundPermissions = async (): Promise<void> => {
    try {
      const result = await RookPermissions.requestAndroidBackgroundPermissions();
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Permissions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonButton onClick={goBack}>Go Back</IonButton>
        <IonList>

          <IonItem>
            <IonButton onClick={handleRequestAllPermissions}>Request permissions</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleRequestAllAppleHealthPermissions}>Request  apple health permissions iOS</IonButton>
          </IonItem>


          <IonItem>
            <IonButton onClick={handleRequestAllHealthConnectPermissions}>Request health connect permissions</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={hanleOpenIOSSettings}> open  iOS settings</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleOpenHealthConnectSettings}>open health connect settings</IonButton>
          </IonItem>

          <IonItem>
            <IonButton onClick={handleRequestAndroidBackgroundPermissions}>Request background permissions android</IonButton>
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Permissions;
