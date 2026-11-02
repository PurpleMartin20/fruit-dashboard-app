import { Redirect } from 'expo-router';

// Open the app straight on the fruit page
export default function Home() {
  return <Redirect href="/fruit" />;
}
