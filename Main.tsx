import {PaperProvider} from 'react-native-paper';
import App from './src/App';
import {MyThemes} from './src/themes';
import './src/translations/i18n';

export default function Main() {
  return (
    <PaperProvider theme={MyThemes.lightTheme}>
      <App />
    </PaperProvider>
  );
}
