import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, piece, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "SM Struktur <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO ?? "nielsenadam44@gmail.com",
      replyTo: email,
      subject: piece
        ? `Ny förfrågan: ${piece}`
        : `Nytt meddelande från ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2c2c2c;">
          <h2 style="color: #2d4a3e; border-bottom: 1px solid #e8e0d5; padding-bottom: 12px;">
            Nytt meddelande via SM Struktur
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Namn</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">E-post</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2d4a3e;">${email}</a></td>
            </tr>
            ${
              piece
                ? `<tr>
              <td style="padding: 8px 0; font-weight: bold;">Objekt</td>
              <td style="padding: 8px 0;">${piece}</td>
            </tr>`
                : ""
            }
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f5f0eb; border-left: 3px solid #c9a96e;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Skickat via kontaktformuläret på smstruktur.se
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
