import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { DataSource, DataSourceOptions } from "typeorm"

require('dotenv').config()

const devConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: true,
  entities: [`dist/**/*.entity.js`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  migrationsTableName: 'migrations',
}

const prodConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [`dist/**/*.entity.js`], 
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  // ssl: {
  //   rejectUnauthorized: false,
  // },
}

const dbConfig = process.env.NODE_ENV === 'prod' ? prodConfig : devConfig

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return dbConfig
  }
}
export default new DataSource(dbConfig)