"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CommentFormProps {
  plantId: string;
  onCommentAdded: (newComment: any) => void; // Adjust type as needed
}

export default function CommentForm({ plantId, onCommentAdded }: CommentFormProps) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || text.trim() === '') return;

    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For mock:
      const { addComment } = await import('@/lib/plantService');
      const newComment = await addComment(plantId, user.id, user.displayName || user.email, text);
      
      onCommentAdded(newComment);
      setText('');
      toast({
        title: "Comentario añadido",
        description: "Tu comentario ha sido publicado.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir tu comentario. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        Debes <a href="/login" className="underline hover:text-primary">iniciar sesión</a> para comentar.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <Textarea
          placeholder="Escribe tu comentario aquí..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Button type="submit" disabled={isSubmitting || text.trim() === ''}>
          {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
        </Button>
      </div>
    </form>
  );
}
