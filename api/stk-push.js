export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { phone, amount, accountReference } = req.body;

  // Formatting phone number to 254XXXXXXXXX
  let formattedPhone = phone.replace(/^(?:\+254|0)/, '254');
  if (formattedPhone.length === 9) formattedPhone = '254' + formattedPhone;

  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  try {
    // 1. Get Access Token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });
    const { access_token } = await tokenResponse.json();

    // 2. Prepare STK Push request
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const stkResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
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
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: accountReference || 'OKOA GAS',
        TransactionDesc: 'Kit Purchase'
      })
    });

    const data = await stkResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('M-Pesa STK Push Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
