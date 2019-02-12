const redis = require('redis');

function createRedisController() {
  let client = null;

  return {
    init() {
      client = redis.createClient();
      client.on('error', (err) => {
        console.log(`Error redis  ${err}`);
      });
    },
    getClient() {
      return client;
    },
  };
}

module.exports = createRedisController();
