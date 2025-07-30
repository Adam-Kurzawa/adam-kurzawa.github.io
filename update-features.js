import * as fs from 'fs';

/*
 * Wygeneruj plik alternata_bff_signature.bin za pomocą komendy:
 * openssl dgst -sha256 -sign alternata_bff_private_key.pem alternata_bff_token.txt > alternata_bff_signature.bin
 * Koniecznie użyj cmd a nie PowerShell.
 */

const token = fs.readFileSync("C:\\Users\\Adam\\alternata_bff_token.txt", 'utf-8').trim();
const signature = fs.readFileSync("C:\\Users\\Adam\\alternata_bff_signature.bin").toString('base64');

// Endpoint backendu
// const endpoint = 'https://alternata-bff.onrender.com/features';
const endpoint = 'http://localhost:8080/features';

async function sendToken() {
  console.log(token)
  console.log("")
  console.log(signature)

  const put = await fetch(endpoint, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          token: token,
          signature: signature,
          // null means no update
          addComment: null,
          sendToKindle: null,
          keepAwake: false
      })
  });

  const post = await fetch(endpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          token: token,
          signature: signature
      })
  });

  const postResponse = await post.text();
  console.log('Odpowiedź z serwera:', postResponse);
}

await sendToken();

/* 
 * Uruchom plik komendą:
 * node update-features.js
 */