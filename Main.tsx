import {PaperProvider} from 'react-native-paper';
import App from './src/App';
import {MyThemes} from './src/themes';
import './src/translations/i18n';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={MyThemes.lightTheme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}
