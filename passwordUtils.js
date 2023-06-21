import CryptoJS from 'crypto-js';

function hashPassword(password) {
  const firstChar = password.charAt(0); // Ottieni il primo carattere della password

  const saltedPassword = firstChar + password; // Concatena il carattere iniziale come "salt" alla password

  const hashedPassword = CryptoJS.SHA256(saltedPassword).toString(); // Genera l'hash SHA-256 della password

  return hashedPassword;
}

function decryptPassword(encryptedPassword) {
  const firstChar = encryptedPassword.charAt(0);
  const key = deriveKeyFromPassphrase(firstChar);

  const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, key);
  const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedPassword;
}

export default hashPassword;
