export async function POST(req) {
  try {
    const hostIP = req.headers.get('x-forwarded-for')?.replace('::ffff:', '') || 'Unknown';
    const contentType = req.headers.get('content-type');

    if (contentType !== 'application/x-www-form-urlencoded') {
      return new Response(JSON.stringify({ error: 'Unsupported Content-Type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
      );
    }

    const text = await req.text();
    const body = Object.fromEntries(new URLSearchParams(text));

    const {
      hostId,
      hostRedirect,
      userMAC,
      userIP,
      username,
      chapId,
      chapChallenge,
      linkLogin,
      linkOrig,
      linkLoginOnly,
      linkOrigEsc,
      error,
      macEsc
    } = body;

    if (!userMAC || !userIP || !hostIP) {
      return new Response(
        JSON.stringify({ error: 'mac and ip are required' }),
        { status: 400 }
      );
    }

    console.log('--------------------------------------------------');
    console.log('Request received from Host IP:', hostIP);
    console.log('--------------------------------------------------');
    // console.log('Form Data:', body);
    console.log('--------------------FROM DATA------------------------------');
    console.log('Host Id : ', hostId);
    console.log('Host Redirect : ', hostRedirect);
    console.log('User MAC : ', userMAC);
    console.log('User IP : ', userIP);
    console.log('User Name : ', username);
    console.log('Chap Id : ', chapId);
    console.log('Chap Challenge : ', chapChallenge);
    console.log('Link Login : ', linkLogin);
    console.log('Link Orig : ', linkOrig);
    console.log('Link Login Only', linkLoginOnly);
    console.log('Link Orig Esc : ', linkOrigEsc);
    console.log('Error : ', error);
    console.log('MAC Esc : ', macEsc);
    console.log('--------------------------------------------------');

    // Redirect the user
    const redirectUrl = `http://10.10.15.2:3000/login?hostIP=${hostIP}&hostId=${hostId}&hostRedirect=${hostRedirect}&userMAC=${userMAC}&userIP=${userIP}&username=${username}&chapId=${chapId}&chapChallenge=${chapChallenge}&linkLogin=${linkLogin}&linkOrig=${linkOrig}&linkLoginOnly=${linkLoginOnly}&linkOrigEsc=${linkOrigEsc}&error=${error}&macEsc=${macEsc}`;
    console.log(`Redirecting to: ${redirectUrl}`);
    return Response.redirect(redirectUrl, 302);
  } catch (error) {
    console.error('Error processing request:', error);
    console.error('Error processing request:', error.message, error.stack);

    return new Response(JSON.stringify({ error: 'Invalid request format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
