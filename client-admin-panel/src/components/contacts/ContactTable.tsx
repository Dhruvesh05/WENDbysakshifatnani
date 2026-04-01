"use client";

import { useCallback, useEffect, useState } from 'react';
import { ContactMessage } from '../../types';
import { deleteContactMessage, fetchContactMessages } from '../../lib/api';

const ContactTable = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchContactMessages();
      setContacts(data);
    } catch {
      setError('Failed to load contact messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleDelete = async (contact: ContactMessage) => {
    if (!contact.id) {
      return;
    }

    if (!confirm(`Delete message from ${contact.name}?`)) {
      return;
    }

    setDeletingId(contact.id);

    try {
      await deleteContactMessage(contact.id);
      setContacts((previous) => previous.filter((item) => item.id !== contact.id));
    } catch {
      alert('Failed to delete contact message.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="py-16 text-center text-sm text-gray-500">Loading contact messages...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
        <button type="button" onClick={loadContacts} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  if (contacts.length === 0) {
    return <div className="py-16 text-center text-sm text-gray-500">No contact messages yet.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Email</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden md:table-cell">Location</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden md:table-cell">Service</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden md:table-cell">Message</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden lg:table-cell">Date</th>
            <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b border-gray-100 align-top">
              <td className="px-4 py-3 font-medium text-gray-900">{contact.name}</td>
              <td className="px-4 py-3 text-gray-600">{contact.email}</td>
              <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{contact.location || '—'}</td>
              <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{contact.service || '—'}</td>
              <td className="hidden max-w-md px-4 py-3 text-gray-600 md:table-cell">{contact.message}</td>
              <td className="hidden whitespace-nowrap px-4 py-3 text-gray-500 lg:table-cell">
                {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : '—'}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(contact)}
                  disabled={deletingId === contact.id}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  {deletingId === contact.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
