import { SocialConnections } from '@/components/auth/social-connections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { account } from '@/lib/appwrite';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { ID } from 'react-native-appwrite';
import * as React from 'react';
import { Alert, TextInput, View } from 'react-native';
import { Link } from 'expo-router';

export function SignUpForm() {
  const { signin } = useAuth();
  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function onNameSubmitEditing() {
    // Focus email input after name
    const emailInput = document.getElementById('email'); // For web
    if (emailInput) emailInput.focus();
  }

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onPasswordSubmitEditing() {
    confirmPasswordInputRef.current?.focus();
  }

  function validateForm() {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function onSubmit() {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Create new account
      await account.create(ID.unique(), email, password, name);

      // Automatically sign in after account creation
      await signin(email, password);

      // Navigate to protected screen after successful signup
      router.replace('/'); // Update with your protected route
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to create account. Please try again.';
      Alert.alert('Sign Up Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                autoComplete="name"
                autoCapitalize="words"
                onSubmitEditing={onNameSubmitEditing}
                returnKeyType="next"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                editable={!isLoading}
              />
              {errors.name ? <Text className="text-xs text-destructive">{errors.name}</Text> : null}
            </View>
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                editable={!isLoading}
              />
              {errors.email ? (
                <Text className="text-xs text-destructive">{errors.email}</Text>
              ) : null}
            </View>
            <View className="gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={onPasswordSubmitEditing}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: '' });
                  // Clear confirm password error if passwords now match
                  if (confirmPassword && text === confirmPassword && errors.confirmPassword) {
                    setErrors({ ...errors, password: '', confirmPassword: '' });
                  }
                }}
                editable={!isLoading}
              />
              {errors.password ? (
                <Text className="text-xs text-destructive">{errors.password}</Text>
              ) : null}
            </View>
            <View className="gap-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                ref={confirmPasswordInputRef}
                id="confirmPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                editable={!isLoading}
              />
              {errors.confirmPassword ? (
                <Text className="text-xs text-destructive">{errors.confirmPassword}</Text>
              ) : null}
            </View>
            <Button className="w-full" onPress={onSubmit} disabled={isLoading}>
              <Text>{isLoading ? 'Creating account...' : 'Continue'}</Text>
            </Button>
          </View>
          <Text className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/auth/signin">
              <Text className="text-sm underline underline-offset-4">Sign in</Text>
            </Link>
          </Text>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
