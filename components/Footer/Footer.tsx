import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: kopalych1</p>
          <p>
            Contact us: <a href="mailto:kopalych@example.com">kopalych@example.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
