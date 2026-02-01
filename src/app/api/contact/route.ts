import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send email notification to Derf Boys
    const { data, error } = await resend.emails.send({
      from: 'The Derf Boys <contact@derfboys.com>',
      to: ['derfboys@gmail.com'],
      replyTo: email,
      subject: subject || `New Contact from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a0a0a; padding: 20px; border-bottom: 4px solid #FFB21A;">
            <h1 style="color: #FFB21A; margin: 0;">THE DERF BOYS</h1>
            <p style="color: #888; margin: 5px 0 0 0;">New Contact Form Submission</p>
          </div>
          <div style="background: #1a1a1a; padding: 30px; color: #fff;">
            <p><strong style="color: #FFB21A;">From:</strong> ${name}</p>
            <p><strong style="color: #FFB21A;">Email:</strong> ${email}</p>
            <p><strong style="color: #FFB21A;">Message:</strong></p>
            <div style="background: #0a0a0a; padding: 15px; border-left: 3px solid #C81E2A; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #0a0a0a; padding: 15px; text-align: center;">
            <p style="color: #666; margin: 0; font-size: 12px;">Sent via derfboys.com contact form</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
