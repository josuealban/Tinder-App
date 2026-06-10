const http = require('http');

function makeRequest(path, data) {
  const postData = JSON.stringify(data);
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      console.log(`${path} - Status: ${res.statusCode}`);
      console.log(`Body: ${body}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

makeRequest('/auth/login', { email: 'juan@example.com', password: 'admin123' });
makeRequest('/auth/register', {
  email: 'juan_nuevo2@example.com',
  password: 'secret123',
  name: 'Juan Pérez',
  age: 25,
  phone: '+593987654322',
  bio: 'Me gusta el cine.',
  weight: 72.5,
  height: 175.0,
  nationality: 'Ecuatoriana',
  gender: 'MALE',
  city: 'Quito',
  country: 'Ecuador',
  zodiacSign: 'Tauro',
  seeking: 'Relación seria',
  location: '-0.1807,-78.4678',
  job: 'Ingeniero',
  hobbies: ['Música'],
  musicList: ['Rock'],
  subscription: 'FREE'
});
