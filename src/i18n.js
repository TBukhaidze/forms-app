import { createTranslator } from "next-intl";

const messages = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  ru: () => import("@/messages/ru.json").then((m) => m.default),
};

export const locales = Object.keys(messages);
export const defaultLocale = "en";

export async function getTranslator(locale) {
  const messages = await messages[locale]();
  return createTranslator({ locale, messages });
}

export async function getMessages(locale) {
  return await messages[locale]();
}
