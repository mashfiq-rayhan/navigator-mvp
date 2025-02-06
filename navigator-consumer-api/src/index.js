import express from 'express';

// import { requestLogger } from './middleware/logger.middleware.js';
import { generateNewHotspotUser } from './modules/mikrotik/mikrotik.service.js';
import os from 'os';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
// app.use(requestLogger);
// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to Navigator MVP!');
});

app.post('/', async (req, res) => {
  try {
    const { phoneNumber, userMAC, userIP, hostIP } = req.body;
    console.log('Request Body:', req.body);
    console.log('------------------------');
    console.log('Phone Number', phoneNumber);
    console.log('User MAC', userMAC);
    console.log('User IP', userIP);
    console.log('Host IP', hostIP);
    console.log('------------------------');

    // return res.status(201).json({ message: 'User Created and Activated' });
    const activeUser = await generateNewHotspotUser(phoneNumber, userIP, userMAC);
    console.log('Active User:', activeUser);
    res.status(201).json('User Created and Activated');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('An error occurred');
  }
});

function initializeNetworkAccess() {
  const networkInterfaces = os.networkInterfaces();

  // Find the IPv4 address in your network interfaces
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    networkInterfaces[interfaceName]?.forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`Network: http://${iface.address}:${PORT}/`);
      }
    });
  });
}
initializeNetworkAccess();
// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
