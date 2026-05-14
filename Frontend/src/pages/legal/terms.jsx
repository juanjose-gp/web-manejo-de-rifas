import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

export default function TermsAndConditions() {
  return (
    <>
      <Header showSearchButton={false} />

      <main className="min-h-screen  px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
          <h1 className="text-3xl font-bold text-slate-800 text-center">
            Términos y Condiciones
          </h1>

          <p className="text-sm text-slate-500 text-center">
            Última actualización: {new Date().toLocaleDateString()}
          </p>

          {/* PARTICIPACIÓN */}
          <section className="space-y-4 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-800">
              Participación en Rifas
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>
                Los <strong>números de rifa</strong> se asignarán únicamente
                después de la <strong>confirmación exitosa del pago</strong>.
              </li>
              <li>
                Una vez confirmado el pago, el usuario recibirá una
                <strong> notificación de confirmación</strong> al número de
                WhatsApp registrado.
              </li>
              <li>
                En caso de{" "}
                <strong>
                  errores técnicos, fallos del sistema o duplicidad de números
                </strong>
                , la empresa se reserva el derecho de:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Reasignar un nuevo número de rifa.</li>
                  <li>
                    Realizar la <strong>devolución total del dinero</strong>.
                  </li>
                </ul>
              </li>
              <li>
                La participación en las rifas implica la
                <strong> aceptación expresa</strong> de estos términos y
                condiciones.
              </li>
            </ul>
          </section>

          {/* DESCUENTOS */}
          <section className="space-y-4 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-800">
              Política de Stickers y Cupones de Descuento
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>
                Cada sticker o cupón promocional contará con una
                <strong> fecha y hora límite de uso</strong>.
              </li>
              <li>
                Una vez vencido el tiempo establecido, el descuento
                <strong>
                  {" "}
                  no podrá ser redimido bajo ninguna circunstancia
                </strong>
                .
              </li>
              <li>
                Los descuentos <strong>no son acumulables</strong> con otras
                promociones o beneficios.
              </li>
              <li>
                Los stickers y cupones son de
                <strong> uso personal e intransferible</strong>.
              </li>
              <li>
                Cualquier intento de{" "}
                <strong>fraude, manipulación o uso indebido</strong> invalidará
                automáticamente el beneficio, sin derecho a reclamo.
              </li>
            </ul>
          </section>

          {/* PRIVACIDAD */}
          <section className="space-y-4 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-800">
              Política de Privacidad
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>
                Los datos personales proporcionados por los usuarios serán
                utilizados exclusivamente para:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>La gestión de rifas.</li>
                  <li>La asignación de números.</li>
                  <li>La comunicación con los participantes.</li>
                </ul>
              </li>
              <li>
                La información personal{" "}
                <strong>no será vendida, cedida ni compartida</strong> con
                terceros sin autorización, salvo cuando sea requerido por ley.
              </li>
              <li>
                La empresa adopta medidas razonables para
                <strong> proteger la seguridad y confidencialidad</strong>
                de la información.
              </li>
            </ul>
          </section>

          {/* RESPONSABILIDAD */}
          <section className="space-y-4 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-800">
              Responsabilidad y modificaciones
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>
                La empresa no se hace responsable por errores derivados de
                información incorrecta proporcionada por el usuario (por
                ejemplo, un número de contacto erróneo).
              </li>
              <li>
                La empresa se reserva el derecho de
                <strong> modificar estos términos y condiciones</strong> en
                cualquier momento. Las actualizaciones serán publicadas en esta
                misma sección.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}