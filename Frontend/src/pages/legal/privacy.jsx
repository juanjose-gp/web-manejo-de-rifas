import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-100 px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">
          <h1 className="text-3xl font-bold text-slate-800 text-center">
            Política de Privacidad
          </h1>

          <p className="text-slate-600 text-sm text-center">
            Última actualización: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4 text-slate-700">
            <p>
              La protección de tus datos personales es una prioridad para
              nosotros. Esta Política de Privacidad describe cómo recopilamos,
              utilizamos y protegemos la información proporcionada por los
              usuarios de nuestra plataforma de rifas.
            </p>

            <h2 className="text-xl font-semibold text-slate-800">
              1. Información que recopilamos
            </h2>

            <p>
              Recopilamos información personal únicamente cuando es necesaria
              para la correcta prestación de nuestros servicios, incluyendo:
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>Nombre y apellido</li>
              <li>Correo electrónico</li>
              <li>Número de WhatsApp o contacto</li>
              <li>Información relacionada con la participación en rifas</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800">
              2. Uso de la información
            </h2>

            <p>
              Los datos personales son utilizados exclusivamente para:
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>Gestionar la participación en rifas</li>
              <li>Asignar números de manera correcta</li>
              <li>Notificar confirmaciones, resultados o información relevante</li>
              <li>Brindar soporte al usuario</li>
            </ul>

            <h2 className="text-xl font-semibold text-slate-800">
              3. Protección de datos
            </h2>

            <p>
              Implementamos medidas técnicas y organizativas razonables para
              proteger la información personal contra accesos no autorizados,
              pérdidas, alteraciones o divulgación indebida.
            </p>

            <h2 className="text-xl font-semibold text-slate-800">
              4. Compartición de información
            </h2>

            <p>
              No vendemos, cedemos ni compartimos los datos personales con
              terceros sin el consentimiento del usuario, salvo cuando sea
              estrictamente necesario por requerimientos legales o autoridades
              competentes.
            </p>

            <h2 className="text-xl font-semibold text-slate-800">
              5. Derechos del usuario
            </h2>

            <p>
              El usuario tiene derecho a solicitar la actualización,
              corrección o eliminación de sus datos personales, así como a
              retirar su consentimiento para el uso de los mismos.
            </p>

            <h2 className="text-xl font-semibold text-slate-800">
              6. Cambios en esta política
            </h2>

            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad
              en cualquier momento. Las actualizaciones serán publicadas en
              esta misma sección y entrarán en vigencia desde su publicación.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}