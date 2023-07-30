  import axios from 'axios';
  const sendEmail = (email) => {
    axios
      .post('http://79.32.231.27:8889/sendEmail', {email})
      .then((response) => {
        if (response.status === 200) {
          alert('Email inviata');
        } else {
          alert('Credenziali errate');
        }
      })
      .catch((error) => {
        alert("Errore durante l'incvio dell'email: " + error);
      });
  };

  export default sendEmail;