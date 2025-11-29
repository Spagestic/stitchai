import { Platform } from "react-native";
import { Account, Client, Databases, TablesDB } from "react-native-appwrite";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    tasks: process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID,
  },
};

const endpoint = config.endpoint ?? "";
const projectId = config.projectId ?? "";

const client = new Client().setEndpoint(endpoint).setProject(projectId);

switch (Platform.OS) {
  case "ios": {
    const bundleId = process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID ?? "";
    client.setPlatform(bundleId);
    break;
  }
  case "android": {
    const packageName = process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME ?? "";
    client.setPlatform(packageName);
    break;
  }
  default:
    break;
}

const database = new Databases(client);

const tablesDB = new TablesDB(client);

const account = new Account(client);

export { database, tablesDB, account, config, client };
