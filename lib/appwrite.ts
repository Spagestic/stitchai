import { Client, Databases, TablesDB , Account} from 'react-native-appwrite';
import { Platform } from 'react-native';

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    tasks: process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID,
  },
};

const client = new Client().setEndpoint(config.endpoint!).setProject(config.projectId!);

switch (Platform.OS) {
  case 'ios':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!);
    break;
  case 'android':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME!);
}

const database = new Databases(client);

const tablesDB = new TablesDB(client);

const account = new Account(client);

export { database, tablesDB, account, config, client };