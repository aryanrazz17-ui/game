
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const models = require('./models/index');
const config = require('./admin/config');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

console.log('Connecting to DB:', process.env.MONGODB_URI);
console.log('Config Admin ID:', config.admin.id);
console.log('Config Admin Pass:', config.admin.pass);

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected.');
        try {
            const adminData = await models.adminUserModel.findOne({ customerId: config.admin.id });
            if (!adminData) {
                console.log('Admin user NOT FOUND in DB!');
            } else {
                console.log('Admin user FOUND:', adminData.username);
                console.log('Stored Password (JWT):', adminData.password);

                try {
                    const decoded = JWT.decode(adminData.password);
                    if (!decoded) {
                        console.log('JWT Decode Failed!');
                    } else {
                        console.log('Decoded Payload:', decoded);
                        const storedHash = decoded.password;
                        console.log('Stored Hash:', storedHash);

                        const inputPass = config.admin.pass;
                        const match = bcrypt.compareSync(inputPass, storedHash);
                        console.log(`Comparing input "${inputPass}" with hash... Match: ${match}`);
                    }
                } catch (e) {
                    console.log('Error decoding/comparing:', e);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            mongoose.connection.close();
            process.exit(0);
        }
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
