import useSettings from './use-settings'
import { useTranslation } from 'react-i18next';

export default function useCurrency() {
  const { settings } = useSettings();
  const { t, i18n } = useTranslation();
  const currency = i18n.language === "ar" ? settings.currency_ar : settings.currency_ar;
  return {
    currency
  }
}
