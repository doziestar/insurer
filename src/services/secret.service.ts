import { IApiData } from '@/interfaces/secret.interface';
import { APIDataModel } from '@/models/secret.model';

class SecretService {
  public async new(userId: number): Promise<IApiData> {
    const secret: IApiData = await APIDataModel.create({
      userId,
    });

    return secret;
  }

  public async regenerate(userId: number): Promise<IApiData> {
    const secret: IApiData = await APIDataModel.findOne({
      where: {
        userId,
      },
    });

    if (!secret) {
      throw new Error('Invalid secret');
    }

    await secret.destroySecret();
    const newSecret: IApiData = await this.new(userId);

    return newSecret;
  }

  public async check(userId: number): Promise<boolean> {
    const secret: IApiData = await APIDataModel.findOne({
      where: {
        userId,
      },
    });

    if (!secret) {
      return false;
    }

    return true;
  }
}

export default SecretService;
