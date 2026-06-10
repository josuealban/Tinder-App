const fs = require('fs');

const collectionPath = './tindel-api.postman_collection.json';
const data = fs.readFileSync(collectionPath, 'utf8');

// The Postman collection contains paths like "/users/1", "/matches/1".
// We will replace "/1" with "/99" at the end of urls.

const json = JSON.parse(data);

function processItems(items) {
  for (const item of items) {
    if (item.item) {
      processItems(item.item);
    } else if (item.request && item.request.url) {
      if (item.request.url.raw) {
        // Replace /1 with /99 in paths
        item.request.url.raw = item.request.url.raw.replace(/\/1$/, '/99');
      }
      if (item.request.url.path) {
        item.request.url.path = item.request.url.path.map(p => p === '1' ? '99' : p);
      }
      
      // Also for user/1 -> user/99
      if (item.request.url.raw) {
        item.request.url.raw = item.request.url.raw.replace(/\/user\/1$/, '/user/99');
      }
      if (item.request.url.path) {
        const idx = item.request.url.path.indexOf('user');
        if (idx !== -1 && item.request.url.path[idx+1] === '1') {
          item.request.url.path[idx+1] = '99';
        }
      }
      
      // chat/1 -> chat/99
      if (item.request.url.raw) {
        item.request.url.raw = item.request.url.raw.replace(/\/chat\/1$/, '/chat/99');
      }
      if (item.request.url.path) {
        const idx = item.request.url.path.indexOf('chat');
        if (idx !== -1 && item.request.url.path[idx+1] === '1') {
          item.request.url.path[idx+1] = '99';
        }
      }

      // Also fix POST requests bodies that reference ID 1 or 2
      if (item.request.method === 'POST' && item.request.body && item.request.body.raw) {
         // Create match: user1Id: 1 -> 99, user2Id: 2 -> 98
         let body = item.request.body.raw;
         body = body.replace(/"user1Id": 1/g, '"user1Id": 99');
         body = body.replace(/"user2Id": 2/g, '"user2Id": 98');
         body = body.replace(/"fromId": 1/g, '"fromId": 99');
         body = body.replace(/"toId": 2/g, '"toId": 98');
         body = body.replace(/"user1Id": 1/g, '"user1Id": 99');
         body = body.replace(/"matchId": 1/g, '"matchId": 99');
         body = body.replace(/"chatId": 1/g, '"chatId": 99');
         body = body.replace(/"userId": 1/g, '"userId": 99');
         item.request.body.raw = body;
      }
    }
  }
}

processItems(json.item);

fs.writeFileSync(collectionPath, JSON.stringify(json, null, 2), 'utf8');
console.log("Postman collection updated to use ID 99/98 instead of 1/2.");
