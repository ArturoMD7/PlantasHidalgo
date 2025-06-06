import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-headline text-primary">Crear Cuenta</h1>
          <p className="mt-2 text-muted-foreground">Únete a nuestra comunidad de amantes de las plantas.</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
