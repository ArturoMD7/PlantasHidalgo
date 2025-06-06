
"use client";

import type { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale'; // For Spanish date formatting

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const getAvatarFallbackText = (name?: string) => {
    if (name) return name;
    return 'User';
  };
  
  // Removed getAvatarInitial as it was unused after recent changes.

  return (
    <div className="flex items-start space-x-3 py-4 border-b last:border-b-0">
      <Avatar className="h-10 w-10">
        {(comment.userAvatar && !comment.userAvatar.startsWith('https://placehold.co')) ? (
           <AvatarImage src={comment.userAvatar} alt={comment.userName || 'User'} />
        ) : null}
        <AvatarFallback className="text-xs p-1 truncate leading-tight">
          {getAvatarFallbackText(comment.userName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">{comment.userName}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })}
          </p>
        </div>
        <p className="text-sm text-foreground mt-1">{comment.text}</p>
      </div>
    </div>
  );
}
