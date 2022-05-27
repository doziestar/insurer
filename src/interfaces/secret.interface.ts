export interface IApiData {
  ApiKey: string;
  ApiSecret: string;
  userId: number;

  generateAPIKey?(): Promise<string>;
  generateAPISecret?(): Promise<string>;

  validateAPIKey?(apiKey: string): Promise<boolean>;
  validateAPISecret?(apiSecret: string): Promise<boolean>;

  hashAPIKey?(): Promise<void>;
  hashAPISecret?(): Promise<void>;
}
