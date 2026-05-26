import { RegisterForm } from '@/components/forms/auth/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignUpPage() {
  return (
    <Card className="border-border/80 bg-card/80 shadow-2xl shadow-primary/5 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Get started with{' '}
          <span className="font-semibold text-primary">Linkify</span> easily.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
