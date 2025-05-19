import { FaPhone, FaEnvelope, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm border-t m t-10 flex flex-col items-center gap-2">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <FaPhone />
          <span>+91-9096233458</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope />
          <span>kushsonkamble@gmail.com</span>
        </div>
        <a
          href="https://github.com/Kushalprintln"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-500 hover:text-black"
        >
          <FaGithub size={18} />
          <span>GitHub</span>
        </a>
      </div>
      <div>
        © {new Date().getFullYear()} PuzzlePG. All rights reserved. Created by Kushal Sonkamble
      </div>
    </footer>
  );
}
