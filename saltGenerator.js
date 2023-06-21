function generateSaltRounds(password) {
  let saltRounds = 10;

  // Ottieni la prima lettera della password
  const firstLetter = password.charAt(0);

  // Calcola l'indice della lettera nell'alfabeto
  const alphabetIndex = firstLetter.toLowerCase().charCodeAt(0) - 97;

  // Incrementa il numero di salti in base all'indice dell'alfabeto
  saltRounds += alphabetIndex;

  return saltRounds;
}

exports.default = generateSaltRounds;
