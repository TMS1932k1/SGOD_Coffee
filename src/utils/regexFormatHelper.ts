const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const regPassword = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;

const regPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export default {regEmail, regPassword, regPhone};
