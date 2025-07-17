import { notFound } from 'next/navigation';

export default function ForbiddenPage() {
  // This will trigger the not-found page which we've styled as a 403 error
  notFound();
} 