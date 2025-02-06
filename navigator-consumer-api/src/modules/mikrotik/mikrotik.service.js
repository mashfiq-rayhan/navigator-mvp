import { RouterOSAPI } from 'node-routeros';
import { mikrotikConfig } from '../../config/mikrotik.config.js';
import logger from '../../config/logger.config.js';

export async function connectToHost(config) {
  try {
    logger.info({ config: { ...config, password: '***' } }, 'Attempting to connect to MikroTik host');
    const conn = new RouterOSAPI({ ...config });
    await conn.connect();
    logger.info('Successfully connected to MikroTik host');
    return conn;
  } catch (error) {
    logger.error(
      {
        error: {
          message: error.message,
          trace: error.trace,
        },
      },
      'Failed to connect to MikroTik host',
    );
    return null;
  }
}

export async function disconnectFromHost(conn) {
  try {
    logger.info('Attempting to disconnect from MikroTik host');
    await conn.close();
    logger.info('Successfully disconnected from MikroTik host');
    return true;
  } catch (error) {
    logger.error(
      {
        error: {
          message: error.message,
          trace: error.trace,
        },
      },
      'Failed to disconnect from MikroTik host',
    );
    return false;
  }
}

export const createHotspotUser = async (conn, phoneNumber, userIP, userMAC) => {
  try {
    logger.info(
      {
        phoneNumber,
        userIP,
        userMAC,
      },
      'Attempting to create hotspot user',
    );

    const password = generateSecurePassword();
    logger.info({ password });
    const existingUsers = await conn.write('/ip/hotspot/user/print', [`?name=${phoneNumber}`]);

    if (existingUsers.length > 0) {
      logger.warn({ phoneNumber }, 'User already exists');
      throw new Error(`User ${phoneNumber} already exists`);
    }

    await conn.write('/ip/hotspot/user/add', [`=name=${phoneNumber}`, `=password=${password}`, `=mac-address=${userMAC}`, `=comment=IP: ${userIP}, MAC: ${userMAC}`]);

    logger.info(
      {
        phoneNumber,
        userIP,
        userMAC,
      },
      'Hotspot user created successfully',
    );

    return {
      phoneNumber,
      password,
      userIP,
      userMAC,
    };
  } catch (error) {
    logger.error(
      {
        error: {
          message: error.message,
          trace: error.trace,
          phoneNumber,
          userIP,
          userMAC,
        },
      },
      'Error creating hotspot user',
    );
    throw error;
  }
};

const generateSecurePassword = () => {
  return Math.random().toString(36).slice(-8);
};

// export async function addUserToActiveList(client, username, userMAC) {
//   try {
//     logger.info(
//       {
//         username,
//         userMAC,
//       },
//       'Attempting to add user to active list',
//     );

//     const bindingDetails = {
//       user: username,
//       'mac-address': userMAC,
//     };

//     const result = await client.write('/ip/hotspot/active/add', bindingDetails);

//     logger.info(
//       {
//         username,
//         userMAC,
//         result,
//       },
//       'User MAC binding successful',
//     );

//     return result;
//   } catch (error) {
//     logger.error(
//       {
//         error: {
//           message: error.message,
//           username,
//           userMAC,
//         },
//         errorBody: error,
//       },
//       'MAC binding error',
//     );
//     throw error;
//   }
// }

export async function addUserToActiveList(client, username, userMAC) {
  try {
    // First, check existing active entries
    const activeEntries = await client.write('/ip/hotspot/active/print', [`?user=${username}`]);

    // If entry exists, remove it first
    if (activeEntries.length > 0) {
      await client.write('/ip/hotspot/active/remove', [`=.id=${activeEntries[0]['.id']}`]);
    }
    logger.info('activeEntries:', activeEntries);
    // Then add new entry
    logger.info('Attempting MAC binding', { username, userMAC });

    // Print exactly what you're sending
    logger.info('Binding details:', ['=user=' + username]);

    // const result = await client.write('/ip/hotspot/active/add', ['=user=' + username, '=mac-address=' + macAddress]);
    const result = await client.write('/ip/hotspot/active/add', ['=user=' + username]);

    return result;
  } catch (error) {
    logger.error(
      {
        error: error.message,
        username,
        userMAC,
      },
      'MAC binding error',
    );
    throw error;
  }
}

export async function removeUserFromActiveList(client, username) {
  try {
    logger.info({ username }, 'Attempting to remove user from active list');

    const result = await client.write('/ip/hotspot/active/remove', [`=.id=${username}`]);

    logger.info(
      {
        username,
        result,
      },
      'User removed from active list',
    );

    return result;
  } catch (error) {
    logger.error(
      {
        error: {
          message: error.message,
          username,
        },
      },
      'Error removing user from active list',
    );
    throw error;
  }
}

export async function generateNewHotspotUser(phoneNumber, userIP, userMAC) {
  logger.info(
    {
      phoneNumber,
      userIP,
      userMAC,
    },
    'Generating new hotspot user',
  );

  const connection = await connectToHost(mikrotikConfig);
  try {
    const newUser = await createHotspotUser(connection, phoneNumber, userIP, userMAC);
    // const activeUser = await loginHotspotUser(connection, { phoneNumber: '01764321053', password: 'i0dv9ikm' });

    logger.info({ newUser, phoneNumber, userIP, userMAC }, 'New hotspot user generated successfully');

    return newUser;
  } catch (error) {
    logger.error(
      {
        error: {
          message: error.message,
          phoneNumber,
          userIP,
          userMAC,
        },
      },
      'Error generating new hotspot user',
    );
    disconnectFromHost(connection);
    throw error;
  }
}

export async function loginHotspotUser(client, user) {
  try {
    // First, check existing active entries
    const activeEntries = await client.write('/ip/hotspot/active/print', [`?user=${user?.phoneNumber}`]);

    // If entry exists, remove it first
    if (activeEntries.length > 0) {
      await client.write('/ip/hotspot/active/remove', [`=.id=${activeEntries[0]['.id']}`]);
    }
    // eslint-disable-next-line no-console
    logger.info('activeEntries:', activeEntries);
    // Then add new entry
    logger.info('Attempting Login ', { user });

    // Print exactly what you're sending
    // eslint-disable-next-line no-console
    logger.info({ user }, 'Login DATA');

    // const result = await client.write('/ip/hotspot/active/add', ['=user=' + username, '=mac-address=' + macAddress]);
    const result = await client.write('/login', [`=name=${user?.phoneNumber}`, `=password=${user?.password}`]);
    // eslint-disable-next-line no-console
    logger.info({ result });
    return result;
  } catch (error) {
    logger.error(
      {
        error: error.message,
      },
      'MAC binding error',
    );
    throw error;
  }
}

// await conn.write('/ip/hotspot/active/add', [
//   `=user=01764321053`,
//   `=mac-address=AE:EA:D5:B8:4D:7C`,
//   `=address=192.168.20.2`,
//   `=server=TomarWifi`,
// ]);

// await conn.write('/ip/hotspot/active/add', [
//   `=user=01764321053`,
//   `=mac-address=AE:EA:D5:B8:4D:7C`,
//   `=address=192.168.20.2`,
//   `=server=TomarWifi`,
// ]);
