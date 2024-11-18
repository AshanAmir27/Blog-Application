const bcrypt = require('bcryptjs');

// Replace this with the actual hashed password from the database
const storedHashedPassword = '$2a$10$.FhNR6zPgTJY1EqIVHX29u2rDYkh01aXZC0hrJM4jTlo/lP0DZvha';
const plainPassword = 'password123'; // This is the password you want to check

// Compare password with the hash from the database
bcrypt.compare(plainPassword, storedHashedPassword, (err, isMatch) => {
  if (err) throw err;
  console.log('Password match:', isMatch); // Should log `true` if passwords match
});
