import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, countryCode, projectName } = await req.json();

    if (!name || !email || !phone || !projectName) {
      return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullPhone = `${countryCode} ${phone}`;

    await transporter.sendMail({
      from: `"EcoVistaLife Brochure Lead" <${process.env.SMTP_USER}>`,
      to: 'info@ecovistalife.com',
      replyTo: email,
      subject: `Brochure Download: ${projectName} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
          <h2 style="color: #1a1a1a; margin-bottom: 24px;">New Brochure Download Lead</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; background: #fff; border-radius: 8px 8px 0 0; border-bottom: 1px solid #eee;">
                <strong style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project</strong><br/>
                <span style="color: #1a1a1a; font-size: 18px; font-weight: bold;">${projectName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #fff; border-bottom: 1px solid #eee;">
                <strong style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</strong><br/>
                <span style="color: #1a1a1a; font-size: 16px;">${name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #fff; border-bottom: 1px solid #eee;">
                <strong style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</strong><br/>
                <a href="mailto:${email}" style="color: #0081C9; font-size: 16px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #fff; border-radius: 0 0 8px 8px;">
                <strong style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</strong><br/>
                <a href="tel:${fullPhone}" style="color: #0081C9; font-size: 16px;">${fullPhone}</a>
              </td>
            </tr>
          </table>
          <p style="color: #aaa; font-size: 12px; margin-top: 24px; text-align: center;">Lead captured via Brochure Download form on ecovistalife.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Brochure email error:', error);
    return NextResponse.json({ error: 'Failed to record lead. Please try again.' }, { status: 500 });
  }
}
