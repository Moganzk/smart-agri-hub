const { Sequelize, DataTypes, Model } = require('sequelize');

// Setup PostgreSQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'smart_agri_hub',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

// User model
class User extends Model {}
User.init({
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('farmer', 'agent', 'admin'), allowNull: false, defaultValue: 'farmer' },
  email: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { sequelize, modelName: 'user' });

// Device model
class Device extends Model {}
Device.init({
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
}, { sequelize, modelName: 'device' });

// SensorReading model
class SensorReading extends Model {}
SensorReading.init({
  temperature: { type: DataTypes.FLOAT },
  humidity: { type: DataTypes.FLOAT },
  soilMoisture: { type: DataTypes.FLOAT },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'sensor_reading' });

// Alert model
class Alert extends Model {}
Alert.init({
  type: { type: DataTypes.STRING, allowNull: false }, // e.g. 'temperature'
  message: { type: DataTypes.STRING, allowNull: false },
  triggeredAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: 'alert' });

// Associations
User.hasMany(Device, { foreignKey: 'userId' });
Device.belongsTo(User, { foreignKey: 'userId' });

Device.hasMany(SensorReading, { foreignKey: 'deviceId' });
SensorReading.belongsTo(Device, { foreignKey: 'deviceId' });

Device.hasMany(Alert, { foreignKey: 'deviceId' });
Alert.belongsTo(Device, { foreignKey: 'deviceId' });

// Sync models with DB
async function syncDb() {
  await sequelize.sync({ alter: true });
  console.log('Database synced');
}

module.exports = {
  sequelize,
  User,
  Device,
  SensorReading,
  Alert,
  syncDb,
};