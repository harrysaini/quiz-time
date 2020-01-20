const conf = {
    db: {
        host: "localhost" || process.env.DATABASE_HOST,
        username: "root" || process.env.DATABASE_USERNAME,
        password: "gbee@123" || process.env.DATABASE_PASSWORD,
        database: "quiz_test" || process.env.DATABASE_NAME
    }
}

module.exports = conf;
