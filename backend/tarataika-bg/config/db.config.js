module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "BobioneQ1w2E3r4",
    DB: "tarataika",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    createdAt: false,
    updatedAt: false
  };