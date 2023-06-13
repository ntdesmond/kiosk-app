import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        newRequest: 'Create a request',
        newRequestTitle: 'New request',
        newRequestSuccessMessage: 'Your request has been successfully sent.',
        newRequestErrorMessage: 'An error occurred while trying to send your request.',
        faq: 'Frequently asked questions',
        contact: 'Contact us',
        contactTitle: 'Our contacts',
        feedback: 'Leave feedback',
        feedbackTitle: 'Leaving a feedback',
        feedbackSuccessMessage: 'Feedback sent! Thank you.',
        feedbackErrorMessage: 'An error occurred while trying to send your feedback.',

        room: 'Room',

        telegramInput: 'Your Telegram username',
        telegramInputPlaceholder: 'username',
        telegramInputHint: '4 to 32 characters after "@"',
        telegramInputInvalid: 'Check if the username is correct',
        telegramInputTooShort: 'Must be at least 4 characters',
        telegramInputTooLong: 'Maximum length exceeded',
        telegramInputRequired: 'Please fill out this field',

        subjectInput: 'Request title',
        subjectInputPlaceholder: 'Give a short description of your request',
        subjectInputHint: '3 to 40 characters',
        subjectInputTooShort: 'Must be at least 3 characters long',
        subjectInputTooLong: 'Maximum length exceeded',
        subjectInputRequired: 'Please fill out this field',

        requestInput: 'Request body',
        requestInputPlaceholder: 'State your problem in details here',
        requestInputHint: 'Minimum 10 characters',
        requestInputTooShort: 'Must be at least 10 characters long',
        requestInputRequired: 'Please fill out this field',

        feedbackInput: 'Your feedback',
        feedbackInputPlaceholder: 'Tell us what you think',
        feedbackInputHint: 'Minimum 10 characters',
        feedbackInputTooShort: 'Must be at least 10 characters long',
        feedbackInputRequired: 'Please fill out this field',

        successModalTitle: 'Success',
        errorModalTitle: 'Error',
        errorModalDetails: 'Technical details:',
        close: 'Close',
        backToMenu: 'Go to main menu',

        lettersKeyContent: 'ABC',
        doneKeyContent: 'Done',

        stepTelegram: 'Telegram',
        stepRequestSubject: 'Subject',
        stepRequestBody: 'Details',
        stepReview: 'Review and send',
        stepFeedback: 'Feedback',

        reviewEdit: 'Edit',
        reviewFieldEmpty: 'empty',
        reviewSend: 'Send',
      },
    },
    ru: {
      translation: {
        newRequest: 'Создать заявку',
        newRequestTitle: 'Новая заявка',
        newRequestSuccessMessage: 'Ваша заявка была успешно отправлена.',
        newRequestErrorMessage: 'Произошла ошибка при попытке отправки заявки.',
        faq: 'Частые вопросы',
        contact: 'Связаться с нами',
        contactTitle: 'Контакты',
        feedback: 'Оставить отзыв',
        feedbackTitle: 'Новый отзыв',
        feedbackSuccessMessage: 'Ваш отзыв сохранен. Спасибо!',
        feedbackErrorMessage: 'Произошла ошибка при попытке отправки отзыва.',

        room: 'Кабинет',

        telegramInput: 'Ваше имя пользователя в Telegram',
        telegramInputPlaceholder: 'username',
        telegramInputHint: 'От 4 до 32 символов после "@"',
        telegramInputInvalid: 'Проверьте корректность ввода',
        telegramInputTooShort: 'Необходимо ввести хотя бы 4 символа',
        telegramInputTooLong: 'Превышена максимальная длина',
        telegramInputRequired: 'Поле обязательно для заполнения',

        subjectInput: 'Тема заявки',
        subjectInputPlaceholder: 'Краткое описание вашей проблемы',
        subjectInputHint: 'От 3 до 40 символов',
        subjectInputTooShort: 'Необходимо ввести хотя бы 3 символа',
        subjectInputTooLong: 'Превышена максимальная длина',
        subjectInputRequired: 'Поле обязательно для заполнения',

        requestInput: 'Текст заявки',
        requestInputPlaceholder: 'Подробно опишите вашу проблему',
        requestInputHint: 'Минимум 10 символов',
        requestInputTooShort: 'Необходимо ввести хотя бы 10 символов',
        requestInputRequired: 'Поле обязательно для заполнения',

        feedbackInput: 'Ваш отзыв',
        feedbackInputPlaceholder: 'Напишите нам, что вы думаете',
        feedbackInputHint: 'Минимум 10 символов',
        feedbackInputTooShort: 'Необходимо ввести хотя бы 10 символов',
        feedbackInputRequired: 'Поле обязательно для заполнения',

        successModalTitle: 'Успешно',
        errorModalTitle: 'Ошибка',
        errorModalDetails: 'Технические подробности:',
        close: 'Закрыть',
        backToMenu: 'В главное меню',

        lettersKeyContent: 'АБВ',
        doneKeyContent: 'Готово',

        stepTelegram: 'Telegram',
        stepRequestSubject: 'Тема',
        stepRequestBody: 'Подробности',
        stepReview: 'Отправка',
        stepFeedback: 'Отзыв',

        reviewEdit: 'Изменить',
        reviewFieldEmpty: 'не заполнено',
        reviewSend: 'Отправить',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
