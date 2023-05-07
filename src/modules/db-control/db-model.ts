import config from 'config';
import { DataTypes, Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.get('db-path')
});

export const messagesTable = sequelize.define('messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chat_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  is_premium_bonus: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  response_time: {
    type: DataTypes.FLOAT
  },
  message_text: {
    type: DataTypes.STRING
  },
  message_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  replied_to_message: {
    type: DataTypes.NUMBER
  }
});
