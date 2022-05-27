export interface IApiData {
  ApiKey: string;
  ApiSecret: string;
  userId: number;

  generateAPIKey?(): string;
  generateAPISecret?(): string;

  reHashAPIKey?(): Promise<void>;
  reHashAPISecret?(): Promise<void>;

  validateAPIKey?(apiKey: string): Promise<boolean>;
  validateAPISecret?(apiSecret: string): Promise<boolean>;

  hashAPIKey?(): Promise<void>;
  hashAPISecret?(): Promise<void>;
}
