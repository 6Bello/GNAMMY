  import axios from 'axios';
  const sendEmail = (email) => {
    axios
      .post('http://gnammy.mywire.org:9710/sendEmail', {
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