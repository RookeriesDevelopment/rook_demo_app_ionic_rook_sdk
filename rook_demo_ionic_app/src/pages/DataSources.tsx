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
  IonSpinner,
  IonLabel,
} from '@ionic/react';
import './Home.css';
import { DataSourceRevoke, DataSourceStatus, RookConfig, RookDataSource } from 'capacitor-rook-sdk';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Browser } from '@capacitor/browser';


const DataSourcesPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(String);
  const [message, setMessage] = useState(String);
  const [dataSources, setDataSources] = useState(Array<DataSourceStatus>);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setLoading(true);
    RookDataSource.getAuthorizedDataSources()
    .then( (result) => {
      setDataSources(result.result);
      setLoading(false);
    })
    .catch( (error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    })
    }, []);

  const handleSourceSelected = (source: DataSourceStatus) => {
    RookDataSource.getDataSourceAuthorizer({source: source.source})
    .then( (result) => {
      if (result.authorizationURL != null) {
        Browser.open({ url: result.authorizationURL });
      }
      setLoading(false);
    })
    .catch( (error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    })
  };

  const handleDisconnect = (source: DataSourceStatus) => {
    RookConfig.revokeDataSource({dataSource: getDataSourceToDiscconnect(source.source)})
  };

  const getDataSourceToDiscconnect = (sourceName: string): DataSourceRevoke => {
    switch (sourceName) {
      case 'Oura':
        return 'Oura';
      case 'Garmin':
        return 'Garmin';
      case 'Polar':
        return 'Polar';
      case 'Fitbit':
        return 'Fitbit';
      case 'Withings':
        return 'Withings';
      case 'Dexcom':
        return 'Dexcom';
      case 'Whoop':
        return 'Whoop';
      default:
        return 'Oura';
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
        { loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {dataSources.map(item => (
               <IonItem key={item.source} button detail>
                <IonLabel>
                  <h2>{item.source}</h2>
                  <p>{item.status}</p>
                  { item.status ? (
                    <IonButton onClick={() => {
                      handleDisconnect(item);
                      }}> Disconnect
                    </IonButton>
                    ): (
                    <IonButton onClick={() => {
                      handleSourceSelected(item); }}> Connect
                    </IonButton>
                    )
                   }
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
          )}
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

export default DataSourcesPage;
