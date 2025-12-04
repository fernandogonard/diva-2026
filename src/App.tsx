import './App.css';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@components/common';
import { AppRoutes } from '@/app/routes';
import { Header } from '@components/layout';
import { initWebVitals, logWebVitalsSummary } from '@utils/performance';
import { injectSchemas, createOrganizationSchema, createLocalBusinessSchema } from '@utils/schema';

function App() {
  useEffect(() => {
    // Inicializar medición de Web Vitals
    if (import.meta.env.DEV) {
      initWebVitals();
      
      // Log resumen después de 10 segundos (cuando la mayoría de métricas están disponibles)
      const timer = setTimeout(() => {
        logWebVitalsSummary();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Inyectar schemas JSON-LD
    injectSchemas([
      { schema: createOrganizationSchema(), id: 'schema-org' },
      { schema: createLocalBusinessSchema(), id: 'schema-hotel' },
    ]);
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
