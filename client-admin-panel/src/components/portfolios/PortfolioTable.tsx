"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Portfolio } from '../../types';
import { fetchPortfolios, deletePortfolio } from '../../lib/api';

const PortfolioTable: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPortfolios = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPortfolios();
      setPortfolios(data);
    } catch {
      setError('Failed to load portfolios. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPortfolios(); }, [loadPortfolios]);

  const handleDelete = async (portfolio: Portfolio) => {
    const id = portfolio.id;
    if (!id) return;
    if (!confirm(`Delete "${portfolio.title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deletePortfolio(id);
      setPortfolios(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete portfolio. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading portfolios...</div>;
  }
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
        {error} <button onClick={loadPortfolios} className="ml-2 underline font-medium">Retry</button>
      </div>
    );
  }
  if (portfolios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-400 text-sm mb-4">No portfolios yet.</p>
        <Link href="/portfolios/new"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
          + Add your first portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500 w-16">Cover</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Title</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Images</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden sm:table-cell">Description</th>
            <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((portfolio, idx) => {
            const id = portfolio.id;
            return (
              <tr key={id ?? idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  {portfolio.images?.[0] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={portfolio.images[0]} alt={portfolio.title}
                      className="h-10 w-14 object-cover rounded-md bg-gray-100" />
                  ) : (
                    <div className="h-10 w-14 rounded-md bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                      No img
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{portfolio.title}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    {portfolio.images?.length ?? 0} photo{(portfolio.images?.length ?? 0) !== 1 ? 's' : ''}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell max-w-xs truncate">
                  {portfolio.description}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {id ? (
                    <Link href={`/portfolios/${id}`}
                      className="inline-block rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 mr-2 transition-colors">
                      Edit
                    </Link>
                  ) : null}
                  <button
                    onClick={() => handleDelete(portfolio)}
                    disabled={deletingId === id}
                    className="rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 transition-colors">
                    {deletingId === id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioTable;