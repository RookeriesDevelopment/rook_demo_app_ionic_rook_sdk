import { IonButtons,
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
  DatetimeChangeEventDetail
        } from '@ionic/react';
import './Home.css';
import { RookEvents } from 'capacitor-rook-sdk';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Events: React.FC = () => {
  
  const [dateSelected, setDate] = useState(String);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(String);
  const [message, setMessage] = useState(String);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

 const handleSyncPhysicalHeartRateEvents = async (): Promise<void> => {
   try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    if (dateSelected.length === 0) {
      setDate(`${year}-${month}-${day}`);
    }
     const result = await RookEvents.syncPhysicalHeartRateEvents({date: dateSelected});
     setTitle('Heart Rate Physical');
     setMessage(`Heart Rate Physical events from date ${dateSelected} uploaded`);
     setIsOpen(true);
   } catch (error) {
    setTitle('Heart Rate Physical');
    setMessage(`Error while uploading Heart Rate Physical events from date ${dateSelected} ${error}`);
    setIsOpen(true);     
   }
 };

 const handleSyncBodyHeartRateEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncBodyHeartRateEvents({date: dateSelected});
    setTitle('Heart Rate Body');
    setMessage(`Heart Rate body events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Heart Rate Body');
   setMessage(`Error while uploading Heart Rate body events  from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncBodyOxygenationEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncBodyOxygenationEvents({date: dateSelected});
    setTitle('Body Oxygenation events');
    setMessage(`Body Oxygenation events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Body Oxygenation');
   setMessage(`Error while uploading Body Oxygenation events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncPhysicalOxygenationEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncPhysicalOxygenationEvents({date: dateSelected});
    setTitle('physical Oxygenation events');
    setMessage(`physical Oxygenation events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('physical Oxygenation events');
   setMessage(`Error while uploading physical Oxygenation events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncActivityEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncPhysicalEvents({date: dateSelected});
    setTitle('Physical events');
    setMessage(`Physical events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Physical events');
   setMessage(`Error while uploading Physical events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncBodyMetricsEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncBodyMetricsEvents({date: dateSelected});
    setTitle('Body metrics events');
    setMessage(`Body metrics events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Body metrics events');
   setMessage(`Error while uploading Body metrics events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncBloodGlucoseEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncBloodGlucoseEvents({date: dateSelected});
    setTitle('Blood glucose events');
    setMessage(`Blood glucose events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Blood glucose events');
   setMessage(`Error while uploading Blood glucose events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncBloodPressureEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncBloodPressureEvents({date: dateSelected});
    setTitle('Blood pressure events');
    setMessage(`Blood pressure events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Blood pressure events');
   setMessage(`Error while uploading Blood pressure events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncNutritionEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncNutritionEvents({date: dateSelected});
    setTitle('Nutrition');
    setMessage(`Nutrition events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Nutrition');
   setMessage(`Error while uploading Nutrition events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncTemperatureEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncTemperatureEvents({date: dateSelected});
    setTitle('Temperature events');
    setMessage(`Temperature events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Temperature events');
   setMessage(`Error while uploading Temperature events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleSyncHydrationEvents = async (): Promise<void> => {
  try {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because January is 0
   const day = currentDate.getDate().toString().padStart(2, '0');
   if (dateSelected.length === 0) {
     setDate(`${year}-${month}-${day}`);
   }
    const result = await RookEvents.syncHydrationEvents({date: dateSelected});
    setTitle('Hydration events');
    setMessage(`Hydration events from date ${dateSelected} uploaded`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Hydration events');
   setMessage(`Error while uploading Hydration events from date ${dateSelected} ${error}`);
   setIsOpen(true);     
  }
};

const handleGetCurrentSteps = async (): Promise<void> => {
  try {
    const result = await RookEvents.getTodayStepCount();
    setTitle('Steps');
    setMessage(`current count: ${result.stepCount} steps`);
    setIsOpen(true);
  } catch (error) {
   setTitle('Steps');
   setMessage(`Error while fetching steps ${error}`);
   setIsOpen(true);     
  }
};

 const handleDateChange = (event: CustomEvent<DatetimeChangeEventDetail>) => {
  const dateValue = event.detail.value;
  if (Array.isArray(dateValue)) {
    const date: string = dateValue[0].split("T")[0]
    console.log(date);
    setDate(date);
  } else if (dateValue) {
    const date: string = dateValue.split("T")[0]
    console.log(date)
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
         <IonTitle>Events</IonTitle>
       </IonToolbar>
     </IonHeader>
     <IonContent fullscreen>
       <IonList>
       <IonDatetime
          onIonChange={handleDateChange}
        />

         <IonItem>
           <IonButton onClick={handleSyncActivityEvents}>Sync physical events</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncPhysicalHeartRateEvents}>Sync heart rate physical events</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncBodyHeartRateEvents}>Sync body heart rate events</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncPhysicalOxygenationEvents}>Sync physical oxygenation</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncBodyOxygenationEvents}>Sync body oxygenation</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncBodyMetricsEvents}>Sync body metrics</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncBloodGlucoseEvents}>Sync blood glucose</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncBloodPressureEvents}>Sync blood pressure</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncNutritionEvents}>Sync Nutrition</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncTemperatureEvents}>Sync Temperature</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleSyncHydrationEvents}>Sync Hydration</IonButton>
         </IonItem>

         <IonItem>
           <IonButton onClick={handleGetCurrentSteps}>Get current steps</IonButton>
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

export default Events;
