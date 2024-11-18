const bcrypt = require('bcryptjs');

// Password to hash
const password = 'password123';

// Hash the password
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.log('Error hashing password:', err);
    return;
  }
  console.log('Hashed Password:', hashedPassword);

  const comparePasswords = async () => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password match:', isMatch); // should log true if passwords match
  };

  comparePasswords();
 
});
