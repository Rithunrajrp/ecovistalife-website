import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    
    // Limit: 3 requests per 60 seconds (60000 ms)
    if (!checkRateLimit(ip, 3, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { name, email, phone, message, projectname, location } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Send data to SalezRobot CRM FIRST
    const crmParams = new URLSearchParams({
      webformid: '2',
      moduletype: 'Basic',
      company_name: 'ECOVISTA',
      name: name,
      mobileno: phone,
      email: email,
      medium: 'Website',
      projectname: projectname || 'General Enquiry',
      description: message,
      location: location || 'Coimbatore'
    });

    try {
      await fetch(`https://www.thesalezrobot.com/public/api/WebformIntegration?${crmParams.toString()}`, {
        method: 'POST',
      });
    } catch (crmError) {
      console.error('CRM Integration error:', crmError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Failed to process request. Please try again.' }, { status: 500 });
  }
}
