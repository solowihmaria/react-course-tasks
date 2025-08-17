import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';
import { Providers } from './providers';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </Providers>
    </NextIntlClientProvider>
  );
}
