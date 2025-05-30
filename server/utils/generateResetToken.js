// utils/generateResetToken.js
const crypto = require('crypto');

exports.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const expire = Date.now() + 15 * 60 * 1000; // 15 mins

  return { resetToken, hashedToken, expire };
};
