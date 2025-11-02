import { getRequestConfig } from "next-intl/server";

import { TypeLocales, routing } from "./routing";

export const getLocaleData = async (locale: string | undefined) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as TypeLocales)) {
    locale = routing.defaultLocale;
  }

  // Import the requested locale's messages and the fallback (English) messages'
  const localeMessages = (await import(`../../locales/${locale}.json`)).default;
  const fallbackMessages = (await import(`../../locales/en.json`)).default;

  // Merge locale messages with fallback messages, using fallback if key is missing
  const mergedMessages = { ...fallbackMessages, ...localeMessages };
  return {
    messages: mergedMessages,
    locale,
  };
};

export default getRequestConfig(
  async ({ requestLocale }: { requestLocale: Promise<string | undefined> }) => {
    const locale = await requestLocale;
    return await getLocaleData(locale);
  }
);
