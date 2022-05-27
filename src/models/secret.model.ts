import { IApiData } from '@/interfaces/secret.interface';
import bcrypt from 'bcrypt';
import { DataTypes, Model, Sequelize } from 'sequelize';

const SALT_ROUNDS = 10;

export class APIDataModel extends Model<IApiData> implements IApiData {
  generateAPIKey(): string {
    throw new Error('Method not implemented.');
  }
  generateAPISecret(): string {
    throw new Error('Method not implemented.');
  }
  reHashAPIKey(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  reHashAPISecret(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  validateAPIKey(apiKey: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  validateAPISecret(apiSecret: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  hashAPIKey(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  hashAPISecret(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public ApiKey: string;
  public ApiSecret: string;
  public userId: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof APIDataModel {
  APIDataModel.init(
    {
      ApiKey: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      ApiSecret: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'api_data',
      sequelize,
      hooks: {
        beforeCreate: async (apiData: APIDataModel) => {
          const hash = await bcrypt.hash(apiData.ApiSecret, SALT_ROUNDS);
          apiData.ApiSecret = hash;
          const apiKey = await bcrypt.hash(apiData.ApiKey, SALT_ROUNDS);
          apiData.ApiKey = apiKey;
        },
      },
    },
  );

  return APIDataModel;
}
