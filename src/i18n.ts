import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        newRequest: 'Create a request',
        newRequestTitle: 'New request',
        faq: 'Frequently asked questions',
        contact: 'Contact us',
        contactTitle: 'Our contacts',
        feedback: 'Leave feedback',
        feedbackTitle: 'Leaving a feedback',

        room: 'Room',

        telegramInput: 'Your Telegram username',
        telegramInputPlaceholder: 'username',
        telegramInputHint: '5 to 32 characters after "@"',

        subjectInput: 'Request title',
        subjectInputPlaceholder: 'Give a short description of your request',
        subjectInputHint: '3 to 40 characters',

        requestInput: 'Request body',
        requestInputPlaceholder: 'State your problem in details here',
        requestInputHint: 'Minimum 10 characters',

        feedbackInput: 'Your feedback',
        feedbackInputPlaceholder: 'Tell us what you think',
        feedbackInputHint: 'Minimum 10 characters',

        send: 'Send',
      },
    },
    ru: {
      translation: {
        newRequest: 'Создать заявку',
        newRequestTitle: 'Новая заявка',
        faq: 'Частые вопросы',
        contact: 'Связаться с нами',
        contactTitle: 'Контакты',
        feedback: 'Оставить отзыв',
        feedbackTitle: 'Новый отзыв',

        room: 'Кабинет',

        telegramInput: 'Ваше имя пользователя в Telegram',
        telegramInputPlaceholder: 'username',
        telegramInputHint: 'От 5 до 32 символов после "@"',

        subjectInput: 'Тема заявки',
        subjectInputPlaceholder: 'Краткое описание вашей проблемы',
        subjectInputHint: 'От 3 до 40 символов',

        requestInput: 'Текст заявки',
        requestInputPlaceholder: 'Подробно опишите вашу проблему',
        requestInputHint: 'Минимум 10 символов',

        feedbackInput: 'Ваш отзыв',
        feedbackInputPlaceholder: 'Напишите нам, что вы думаете',
        feedbackInputHint: 'Минимум 10 символов',

        send: 'Отправить',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
