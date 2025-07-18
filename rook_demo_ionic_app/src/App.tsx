import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Permissions from './pages/Permissions';
import Summaries from './pages/Summaries';
import BackGround from './pages/BackGround';
import Events from './pages/Events';
import User from './pages/User';
import DataSourcesPage from './pages/DataSources';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/user">
          <User />
        </Route>
        <Route exact path="/">
          <Redirect to="/user" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/permissions" component={Permissions} />
        <Route exact path="/summary" component={Summaries} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/background" component={BackGround} />
        <Route exact path="/datasourcespage" component={DataSourcesPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
