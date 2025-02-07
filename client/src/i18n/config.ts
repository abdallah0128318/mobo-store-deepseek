// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define our translation schema for type safety
export interface TranslationSchema {
  common: {
    theme: {
      light: string;
      dark: string;
      toggle: string;
    };
    language: {
      ar: string;
      en: string;
      select: string;
    };
  };
  auth: {
    register: {
      title: string;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      submit: string;
      validation: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordMin: string;
        passwordMatch: string;
      };
    };
  };
}

// Arabic translations
const arTranslations: TranslationSchema = {
  common: {
    theme: {
      light: 'فاتح',
      dark: 'داكن',
      toggle: 'تغيير المظهر'
    },
    language: {
      ar: 'العربية',
      en: 'الإنجليزية',
      select: 'اختر اللغة'
    }
  },
  auth: {
    register: {
      title: 'إنشاء حساب جديد',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      submit: 'تسجيل',
      validation: {
        nameRequired: 'الاسم مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'البريد الإلكتروني غير صالح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMin: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
        passwordMatch: 'كلمة المرور غير متطابقة'
      }
    }
  }
};

// English translations
const enTranslations: TranslationSchema = {
  common: {
    theme: {
      light: 'Light',
      dark: 'Dark',
      toggle: 'Toggle theme'
    },
    language: {
      ar: 'Arabic',
      en: 'English',
      select: 'Select language'
    }
  },
  auth: {
    register: {
      title: 'Create New Account',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Register',
      validation: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 8 characters',
        passwordMatch: 'Passwords do not match'
      }
    }
  }
};

// Helper function to get initial language
const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'ar';
  
  const cookieLang = document.cookie
    .split('; ')
    .find(row => row.startsWith('language='))
    ?.split('=')[1];
    
  return cookieLang || 'ar';
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslations },
      en: { translation: enTranslations }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Set document direction based on language
document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

export default i18n;