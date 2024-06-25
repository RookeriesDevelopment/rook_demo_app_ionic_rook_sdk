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
  AlertButton,
} from '@ionic/react';
import { RookConfig } from 'capacitor-rook-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const User: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isUserIdAdded, setIsUserAdded] = useState(false);
  const [title, setTitle] = useState(String);
  const [message, setMessage] = useState(String);
  const [userIdToUpdate, setuserIdToUpdate] = useState(String);

  const history = useHistory();

  useEffect(() => {
    RookConfig.initRook({
      environment: 'sandbox',
      clientUUID: 'YOUR-CLIENT-UUIF',
      password: 'YOUR-PASSWORD',
    })
      .then(() => {
        console.log('Initialized')
        RookConfig.getUserId().then ((userResult) => {
        if (userResult.userId.length > 0) {
          history.push('/home');
        }
        })
        .catch((e: any) => console.log('error get user id', e));
      })
      .catch((e: any) => console.log('error init rook sdk', e));
  }, []);

  const handleUpdateUserId = async (): Promise<void> => {
    try {
      console.log('updating . . .');
      const result = await RookConfig.updateUserId({ userId: userIdToUpdate });
      console.log('updated', result);
      setMessage('User id added');
      setIsUserAdded(true);
    } catch (error) {
      setMessage('User id error');
      console.log('error', error);
    }
    setTitle('User id updated');
    setIsOpen(true);
  };

  const handleGetAlertAction = (): [AlertButton] => {
    if (isUserIdAdded) {
      return [{
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          setIsOpen(false);
          history.push('/home');
        }
      }];
    } else {
      return [{
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          setIsOpen(false);
          console.log('ok tapped');
        }
      }];
    }
  };

  const handleEvent = (ev: Event) => {
    const value: string = (ev.target as HTMLInputElement).value;
    setuserIdToUpdate(value);
  };

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>User</IonTitle>
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

      </IonList>
      <IonAlert
        isOpen={isOpen}
        header={title}
        message={message}
        buttons={handleGetAlertAction()}
        onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
    </IonContent>
  </IonPage>);
};

export default User;
