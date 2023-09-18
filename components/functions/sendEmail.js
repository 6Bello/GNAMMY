  import axios from 'axios';
  import { domain } from '../dns';
  const sendEmail = (email) => {
    axios
      .post(`${domain}/sendEmail`, {
        params: {
          email
        }
      })
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