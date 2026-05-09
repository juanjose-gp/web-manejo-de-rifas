import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";

export default function FaqPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen  px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
          
          <h1 className="text-3xl font-bold text-slate-800 text-center">
            Preguntas Frecuentes
          </h1>

          <p className="text-sm text-slate-500 text-center">
            Aquí encontrarás las respuestas a las dudas más comunes sobre
            nuestras rifas.
          </p>

          {/* FAQ ITEM */}
          <section className="space-y-6 text-slate-700">
            
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Cómo participo en una rifa?
              </h2>
              <p>
                Para participar, selecciona la rifa de tu interés, realiza el
                pago correspondiente y, una vez confirmado, se te asignará un
                número de rifa automáticamente.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Cuándo se asigna mi número de rifa?
              </h2>
              <p>
                El número se asigna únicamente después de que el pago haya sido
                confirmado correctamente. Recibirás la confirmación vía
                WhatsApp.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Dónde recibo la confirmación de mi participación?
              </h2>
              <p>
                La confirmación se envía al número de WhatsApp registrado al
                momento de realizar la compra.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Cómo puedo buscar mis números de rifa?
              </h2>
              <p>
                Puedes hacer clic en el botón <strong>“Busca tus números”</strong>
                e ingresar tu información para ver los números asignados a tu
                participación.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Qué son los stickers o cupones de descuento?
              </h2>
              <p>
                Son promociones que otorgan descuentos especiales y cuentan con
                una fecha y hora límite de uso. Una vez vencidos, no pueden
                utilizarse.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Los descuentos son acumulables?
              </h2>
              <p>
                No. Los cupones o stickers de descuento no son acumulables con
                otras promociones vigentes.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Qué pasa si hay un error técnico o duplicidad de números?
              </h2>
              <p>
                En caso de error técnico, la empresa se reserva el derecho de
                reasignar un nuevo número de rifa o realizar la devolución del
                dinero correspondiente.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-slate-800">
                 ¿Mis datos personales están seguros?
              </h2>
              <p>
                Sí. Tus datos se utilizan únicamente para la gestión de rifas y
                comunicación contigo. No se comparten con terceros sin tu
                autorización.
              </p>
            </div>

          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}