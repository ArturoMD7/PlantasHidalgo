import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
      <Leaf className="h-7 w-7" />
      <span className="text-2xl font-headline font-semibold">Flores en Hidalgo</span>
    </Link>
  );
}
