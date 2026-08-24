import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import styles from './NoteList.module.css';

import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  function handleDelete(note: Note) {
    mutation.mutate(note.id);
  }

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li className={styles.listItem} key={note.id}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={styles.link}>
              View details
            </Link>
            <button className={styles.button} onClick={() => handleDelete(note)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
