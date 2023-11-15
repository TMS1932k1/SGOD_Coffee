import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: {
        titleOnboarding: 'Coffee so good, your taste buds will love it.',
        subtitleOnboarding:
          'The best grain, the finest roast, the powerful flavor.',
        getStart: 'Get Started',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
