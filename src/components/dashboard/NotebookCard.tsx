import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useNotebookDelete } from '@/hooks/useNotebookDelete';

interface NotebookCardProps {
  notebook: {
    id: string;
    title: string;
    date: string;
    sources: number;
    icon: string;
    color: string;
    hasCollaborators?: boolean;
  };
}

const NotebookCard = ({
  notebook
}: NotebookCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const {
    deleteNotebook,
    isDeleting
  } = useNotebookDelete();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Delete button clicked for notebook:', notebook.id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Confirming delete for notebook:', notebook.id);
    deleteNotebook(notebook.id);
    setShowDeleteDialog(false);
  };

  // Generate CSS classes from color name
  const colorName = notebook.color || 'gray';
  const backgroundClass = `bg-${colorName}-100`;
  const borderClass = `border-${colorName}-200`;

  return <div 
      className={`rounded-2xl border ${borderClass} ${backgroundClass} p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer relative h-52 flex flex-col backdrop-blur-sm bg-white/70 border-white/20 shadow-lg`}
    >
      <div className="absolute top-3 right-3" data-delete-action="true">
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <button onClick={handleDeleteClick} className="p-2 hover:bg-red-50/80 rounded-full text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110 delete-button backdrop-blur-sm" disabled={isDeleting} data-delete-action="true">
              <Trash2 className="h-4 w-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="backdrop-blur-sm bg-white/90">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this notebook?</AlertDialogTitle>
              <AlertDialogDescription>
                You're about to delete this notebook and all of its content. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300" disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br from-white/50 to-white/30 shadow-lg">
        <span className="text-3xl">{notebook.icon}</span>
      </div>
      
      <h3 className="text-gray-900 mb-2 pr-6 line-clamp-2 text-2xl font-medium flex-grow">
        {notebook.title}
      </h3>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mt-auto pt-2 border-t border-white/30">
        <span>{notebook.date} • {notebook.sources} source{notebook.sources !== 1 ? 's' : ''}</span>
      </div>
    </div>;
};

export default NotebookCard;
