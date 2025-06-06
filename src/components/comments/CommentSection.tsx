"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Comment } from '@/lib/types';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { getCommentsByPlantId } from '@/lib/plantService';
import { Skeleton } from '@/components/ui/skeleton';

interface CommentSectionProps {
  plantId: string;
}

export default function CommentSection({ plantId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await getCommentsByPlantId(plantId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Optionally set an error state to display to user
    } finally {
      setIsLoading(false);
    }
  }, [plantId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-headline text-primary mb-6">Comentarios y Opiniones</h3>
      
      <CommentForm plantId={plantId} onCommentAdded={handleCommentAdded} />

      {isLoading ? (
        <div className="mt-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 py-4 border-b">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="mt-6">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">No hay comentarios aún. ¡Sé el primero en opinar!</p>
      )}
    </div>
  );
}
