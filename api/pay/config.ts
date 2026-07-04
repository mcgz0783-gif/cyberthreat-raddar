export const PESAPAL_CONFIG = {
  consumer_key: process.env.PESAPAL_CONSUMER_KEY || '',
  consumer_secret: process.env.PESAPAL_CONSUMER_SECRET || '',
  is_sandbox: process.env.PESAPAL_MODE !== 'live',
  get base_url() {
    return this.is_sandbox 
      ? 'https://cybqa.pesapal.com/pesapalv3' 
      : 'https://pay.pesapal.com/v3';
  }
};

export async function getPesapalAuthToken() {
  const response = await fetch(`${PESAPAL_CONFIG.base_url}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      consumer_key: PESAPAL_CONFIG.consumer_key,
      consumer_secret: PESAPAL_CONFIG.consumer_secret
    })
  });

  const data = await response.json();
  if (data.status !== "200") {
    throw new Error(data.error?.message || 'Failed to authenticate with PesaPal');
  }
  return data.token;
}
