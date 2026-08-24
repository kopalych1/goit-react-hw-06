'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import styles from './Notes.client.module.css';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

import { fetchNotes } from '@/lib/api';

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page),
    throwOnError: true,
  });

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox onChange={updateSearch} />
        {data && data.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
