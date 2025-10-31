import { TypeLocales, routing } from './routing';

export const hasLocale = (locale: string): boolean => {
  return routing.locales.includes(locale as TypeLocales);
};
