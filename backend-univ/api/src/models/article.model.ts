import { DataTypes, Model, Sequelize } from 'sequelize';

export class Article extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public category!: string;
  public tags!: string;
  public authorId!: number;
}

export function initArticle(sequelize: Sequelize) {
  Article.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    tags: { type: DataTypes.STRING, allowNull: true },
    authorId: { type: DataTypes.INTEGER, allowNull: false }
  }, { sequelize, tableName: 'articles' });
}
