"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AddPlantForm from '@/components/admin/AddPlantForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function AddPlantPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/login?redirect=/admin/add-plant'); 
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-10 w-1/3" />
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    // This will be brief as the redirect should happen quickly
    return <p className="text-center py-12">Redirigiendo...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-headline text-primary mb-8">Añadir Nueva Planta</h1>
      <AddPlantForm />
    </div>
  );
}
