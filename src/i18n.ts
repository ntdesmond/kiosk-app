import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        create: 'Create a request',
        faq: 'Frequently asked questions',
        contact: 'Contact us',
        feedback: 'Leave feedback',
      },
    },
    ru: {
      translation: {
        create: 'Создать заявку',
        faq: 'Частые вопросы',
        contact: 'Связаться с нами',
        feedback: 'Обратная связь',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
