import { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import type { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "@/lib/appwrite";

const AuthContext = createContext({
  session: null as Models.Session | null,
  user: null as Models.User<Models.Preferences> | null,
  signin: (_email: string, _password: string): Promise<void> => {
    throw new Error("Not implemented");
  },
  signout: (): Promise<void> => {
    throw new Error("Not implemented");
  },
  loading: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Models.Session | null>(null);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        const currentSession = await account.getSession("current");
        setSession(currentSession);
      } catch {
        // No active session
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);

      // Get user details after successful login
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      console.log("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      setSession(null);
      setUser(null);
    } catch (error) {
      console.log("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextData = { session, user, signin, signout, loading };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <Text>Loading..</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContext, AuthProvider };
