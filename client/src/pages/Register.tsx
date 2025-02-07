// src/pages/Register.tsx
import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

  // Update HTML form validation messages based on language
  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if (i18n.language === 'ar') {
        input.setAttribute('oninvalid', "this.setCustomValidity('هذا الحقل مطلوب')");
        input.setAttribute('oninput', "this.setCustomValidity('')");
      } else {
        input.setAttribute('oninvalid', "this.setCustomValidity('This field is required')");
        input.setAttribute('oninput', "this.setCustomValidity('')");
      }

      if (input.type === 'email') {
        const emailMessage = i18n.language === 'ar' 
          ? 'يرجى إدخال بريد إلكتروني صحيح'
          : 'Please enter a valid email address';
        input.setAttribute('oninvalid', `this.setCustomValidity('${emailMessage}')`);
      }
    });
  }, [i18n.language]);


  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('auth.register.validation.nameRequired');
    }

    if (!formData.email) {
      newErrors.email = t('auth.register.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.register.validation.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.register.validation.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.register.validation.passwordMin');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.register.validation.passwordMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // API call will go here
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-[var(--bg-secondary)] p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold">
            {t('auth.register.title')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t('auth.register.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t('auth.register.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                {t('auth.register.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                {t('auth.register.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--border-color)] bg-[var(--bg-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-transparent"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--accent-color)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color)] disabled:opacity-50"
            >
              {loading ? t('common.loading') : t('auth.register.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
