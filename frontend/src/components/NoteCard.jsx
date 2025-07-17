import { Link } from 'react-router';
import { PenSquareIcon,Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast, { Toaster } from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {
  
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id)) // filter out the deleted note
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log('Error deleting note: ', error);
      toast.error("Failed to delete note!")
    } 
  }

  return (
    <Link
      className="card bg-neutral hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary/70"
      to={`note/${note?._id}`}
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note?.title}</h3>
        <p>{note?.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span>{formatDate(new Date(note.createdAt))}</span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard