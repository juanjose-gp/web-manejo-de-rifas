import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  async sendPurchaseEmail(to: string, data: any) {
    const {
      buyerName,
      raffle,
      numbers,
      validationCode,
      code,
      description,
      patrocinador,
      expiresAt,
    } = data;

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'RIVO',
          email: 'juanjodev218@gmail.com',
        },
        to: [{ email: to }],
        subject: 'Compra confirmada',

        htmlContent: `
<div style="font-family: Arial, sans-serif; background:#f3f4f6; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

    <!-- HEADER -->
    <div style="background:#2563eb; color:white; padding:20px; text-align:center;">
      <h2 style="margin:0;">Compra confirmada</h2>
    </div>

    <!-- BODY -->
    <div style="padding:20px; color:#1f2937;">
      <p>Hola <strong>${buyerName}</strong>,</p>

      <p>Tu compra fue realizada con éxito. ¡Gracias por participar!</p>

      <p><strong>RIVO:</strong> ${raffle}</p>

      <!-- NÚMEROS -->
      <div style="margin-top:20px;">
        <p><strong>Tus números:</strong></p>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${numbers
            .map(
              (n) => `
            <span style="
              background:#dbeafe;
              color:#1e40af;
              padding:6px 10px;
              border-radius:6px;
              font-family: monospace;
              font-weight:bold;
            ">
              ${n}
            </span>
          `,
            )
            .join('')}
        </div>
      </div>

      ${
        validationCode
          ? `
      <!-- PREMIO -->
      <div style="margin-top:30px;">
        <p style="font-weight:bold; font-size:18px;">
           ¡Has ganado un beneficio exclusivo!
        </p>

        <div style="
          border:1px solid #e5e7eb;
          background:#f9fafb;
          padding:20px;
          border-radius:10px;
          margin-top:10px;
        ">

          <!-- DESCUENTO -->
          <p style="margin:0 0 10px 0;">
            <strong style="font-size:20px; color:#16a34a;">
              ${code} de descuento
            </strong>
          </p>

          <!-- DESCRIPCIÓN -->
          <p style="margin:0 0 15px 0; color:#374151;">
            ${description}
          </p>

          <!-- CÓDIGO -->
          <div style="
            margin-top:10px;
            text-align:center;
            background:#111827;
            color:#22c55e;
            font-size:24px;
            font-weight:bold;
            padding:14px;
            border-radius:8px;
            letter-spacing:4px;
          ">
            ${validationCode}
          </div>

          <!-- TEXTO USO -->
          <p style="margin-top:15px; font-size:14px;">
            Usa este código para redimir tu beneficio.
          </p>

          <!-- PATROCINADOR -->
          <p style="margin-top:10px; font-size:14px;">
            Beneficio cortesía de:
            <strong>${patrocinador}</strong>
          </p>

          <!-- EXPIRACIÓN -->
          <p style="margin-top:10px; font-size:13px; color:#6b7280;">
            Válido hasta:
            <strong>${expiresAt ? new Date(expiresAt).toLocaleDateString() : 'Sin fecha límite'}</strong>
          </p>

        </div>
      </div>
      `
          : ''
      }
      <p style="margin-top:25px;">
        Guarda este correo como comprobante de tu compra.
      </p>
    </div>

    <!-- FOOTER -->
    <div style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
      © ${new Date().getFullYear()} RIVO - Todos los derechos reservados
    </div>

  </div>
</div>
`,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
