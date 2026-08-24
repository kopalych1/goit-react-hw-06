import { type Note, type NewNote } from '../types/note';
import axios from 'axios';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api/notes/';

interface NoteFetchResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number = 12
): Promise<NoteFetchResponse> {
  const options = {
    params: { search, page, perPage },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    },
  };
  const response = await axios.get<NoteFetchResponse>(BASE_URL, options);
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    },
  };
  const response = await axios.post<Note>(BASE_URL, newNote, options);

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    },
  };
  const response = await axios.get<Note>(`${BASE_URL}${id}`, options);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN,
    },
  };
  const response = await axios.delete<Note>(`${BASE_URL}${id}`, options);
  return response.data;
}
