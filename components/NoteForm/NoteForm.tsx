import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import * as Yup from 'yup';

import { type NoteTag } from '../../types/note';

import styles from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  function handleSubmit(values: NoteFormValues) {
    mutation.mutate(values);
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('This field is required')
      .min(3, 'Title must not be shorter than 3 characters')
      .max(50, 'Title must not be longer than 50 characters'),
    content: Yup.string().max(500, 'Content must not be longer than 500 characters'),
    tag: Yup.string()
      .required('This field is required')
      .oneOf(
        ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
        'Tag must be one of: Todo, Work, Personal, Meeting, Shopping'
      ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={styles.input} />
          <ErrorMessage name="title" component="span" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <Field as="textarea" id="content" name="content" rows={8} className={styles.textarea} />
          <ErrorMessage name="content" component="span" className={styles.error} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={styles.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={styles.error} />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
