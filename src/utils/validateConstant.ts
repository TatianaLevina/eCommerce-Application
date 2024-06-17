const validateConstant = {
  namePattern: /^(?!\s+)[a-zA-Z]+(?!\s+)$/,
  emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  passwordPattern: /^(?!\s+)(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*.]{8,}(?!\s+)$/,
  passwordRules: [
    { required: true, message: 'Please input your password!' },
    { pattern: /^(?!\s+)[a-zA-Z0-9!@#$%^&*.]+(?!\s+)$/, message: 'Use English letters' },
    { pattern: /(?=.*[A-Z]).*/, message: 'Password must contain at least 1 uppercase letter.' },
    { pattern: /(?=.*[a-z]).*/, message: 'Password must contain at least 1 lowercase letter.' },
    { pattern: /(?=.*\d).*/, message: 'Password must contain at least 1 digit.' },
    { pattern: /(?=.*[^\w\s]|_).*/, message: 'Password must contain at least 1 special character.' },
    { pattern: /^(?!\s+).+$/, message: 'Password must not contain leading whitespace' },
    { pattern: /^.+(?<!\s)$/, message: 'Password must not contain trailing whitespace' },
    { min: 8, message: 'Password length must be minimum 8 characters.' },
  ],
  AgeLimit: 13,
  dateFormat: 'YYYY-MM-DD',
  streetPattern: /^(?!\s+).+(?!\s+)$/,
  cityPattern: /^(?!\s+)[[A-Za-z\s]+(?!\s+)$/,
  postalCodePattern: /^(?!\s+)([A-Z0-9]{5}-[A-Z0-9]{4})|([A-Z0-9]{4}\s[A-Z0-9]{3})|([0-9]{6})(?!\s+)$/,
};
export default validateConstant;
