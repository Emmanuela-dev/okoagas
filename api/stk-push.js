export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, amount, accountReference } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ message: 'Phone number and amount are required' });
  }

  // Formatting phone number to 254XXXXXXXXX
  let formattedPhone = phone.replace(/^(?:\+254|0)/, '254');
  if (formattedPhone.length === 9) formattedPhone = '254' + formattedPhone;
  
  if (!/^254\d{9}$/.test(formattedPhone)) {
    return res.status(400).json({ message: 'Invalid Kenyan phone number format' });
  }

  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  const env = process.env.MPESA_ENV || 'sandbox'; // Default to sandbox

  if (!consumerKey || !consumerSecret || !shortCode || !passkey || !callbackUrl) {
    return res.status(500).json({ 
      message: 'M-Pesa configuration missing. Please check your environment variables.',
      missing: {
        consumerKey: !consumerKey,
        consumerSecret: !consumerSecret,
        shortCode: !shortCode,
        passkey: !passkey,
        callbackUrl: !callbackUrl
      }
    });
  }

  const baseUrl = env === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke';

  try {
    // 1. Get Access Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: { Authorization: `Basic ${auth}` }
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return res.status(tokenResponse.status).json({ message: 'Failed to generate access token', details: errorData });
    }

    const { access_token } = await tokenResponse.json();

    // 2. Prepare STK Push request
    const date = new Date();
    const timestamp = date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount), // Ensure amount is an integer
        PartyA: formattedPhone,
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: accountReference || 'OKOA GAS',
        TransactionDesc: 'Kit Purchase'
      })
    });

    const data = await stkResponse.json();
    return res.status(stkResponse.status).json(data);
  } catch (error) {
    console.error('M-Pesa STK Push Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

