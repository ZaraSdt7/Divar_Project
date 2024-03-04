const sequelize = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test',
  Pool: {
    evict: +process.env.DB_EVICT || 1000,
    idle: +process.env.DB_IDLE || 0,
    max: +process.env.DB_MAX || 5,
    min: +process.env.DB_MIN || 0,
    maxUses: +process.env.DB_MAXUSE || 0,
  },
};
export { sequelize };
