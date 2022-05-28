import { IApiData } from '@/interfaces/secret.interface';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

const SALT_ROUNDS = 10;

type APIData = Optional<IApiData, 'ApiKey' | 'ApiSecret'>;

export class APIDataModel extends Model<IApiData, APIData> implements IApiData {
  async generateAPIKey(): Promise<string> {
    return crypto.randomBytes(32).toString('hex');
  }

  async generateAPISecret(): Promise<string> {
    return crypto.randomBytes(32).toString('hex');
  }

  async validateAPIKey(apiKey: string): Promise<boolean> {
    const isValid = await bcrypt.compare(apiKey, this.ApiKey);
    return isValid;
  }

  async validateAPISecret(apiSecret: string): Promise<boolean> {
    const isValid = await bcrypt.compare(apiSecret, this.ApiSecret);
    return isValid;
  }

  async hashAPIKey(): Promise<void> {
    this.ApiKey = await bcrypt.hash(this.ApiKey.toString(), SALT_ROUNDS);
  }

  async hashAPISecret(): Promise<void> {
    this.ApiSecret = await bcrypt.hash(this.ApiSecret.toString(), SALT_ROUNDS);
  }

  public async destroySecret(): Promise<void> {
    this.ApiKey = null;
    this.ApiSecret = null;
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
          await apiData.hashAPIKey();
          await apiData.hashAPISecret();
        },
        beforeUpdate: async (apiData: APIDataModel) => {
          await apiData.hashAPIKey();
          await apiData.hashAPISecret();
        },
      },
    },
  );

  return APIDataModel;
}
