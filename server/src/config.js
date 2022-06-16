require('dotenv').config();

const checkEnvVars = (name) => {
    if(process.env[name]===undefined){
        throw new Error(`Undefined environment variable ${name}`);
    }
    return process.env[name];
}

module.exports = {
    PORT: checkEnvVars('PORT'),
    MONGO_URL: checkEnvVars("MONGO_URL")
}

