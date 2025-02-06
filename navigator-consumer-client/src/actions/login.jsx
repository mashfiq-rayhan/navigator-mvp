'use server';

export async function loginUser(prevState, formData) {
  const phoneNumber = formData.get('phoneNumber');
  const userMAC = formData.get('userMAC');
  const userIP = formData.get('userIP');
  const hostIP = formData.get('hostIP');

  console.log(phoneNumber);

  let errors = [];
  if (!phoneNumber?.trim()) errors.push('Phone Number is required.');
  if (!userMAC?.trim()) errors.push('User MAC is required.');
  if (!userIP?.trim()) errors.push('User IP is required.');
  if (!hostIP?.trim()) errors.push('Host IP is required.');

  if (errors.length > 0) return { errors };

  try {
    const response = await fetch('http://10.10.15.2:3001/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, userMAC, userIP, hostIP })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { errors: [errorData.error || 'Failed to log in.'] };
    }

    const resData = await response.json();
    console.log('Server Responded:', resData);

    return { success: true, redirectUrl: '/' };
  } catch (error) {
    console.error('Error logging in:', error);
    return { errors: ['An error occurred while logging in.'] };
  }
}
