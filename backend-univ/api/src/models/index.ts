import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { initUser, User } from './user.model';
import { initArticle, Article } from './article.model';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

initUser(sequelize);
initArticle(sequelize);
User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

export { sequelize, User, Article };
