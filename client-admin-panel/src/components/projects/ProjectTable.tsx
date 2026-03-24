"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Project } from '../../types';
import { fetchProjects, deleteProject } from '../../lib/api';

const ProjectTable: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch {
      setError('Failed to load projects. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  const handleDelete = async (project: Project) => {
    const id = project.id;
    if (!id) return;
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete project. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading projects...</div>;
  }
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
        {error} <button onClick={loadProjects} className="ml-2 underline font-medium">Retry</button>
      </div>
    );
  }
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-400 text-sm mb-4">No projects yet.</p>
        <Link href="/projects/new"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
          + Add your first project
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500 w-16">Image</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Title</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden lg:table-cell">Location</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Category</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 hidden sm:table-cell">Description</th>
            <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => {
            const id = project.id;
            return (
              <tr key={id ?? idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  {project.images?.[0] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={project.images[0]} alt={project.title}
                      className="h-10 w-14 object-cover rounded-md bg-gray-100" />
                  ) : (
                    <div className="h-10 w-14 rounded-md bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                      No img
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{project.title}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-gray-500 max-w-[180px] truncate">
                  {project.location || '—'}
                </td>
                <td className="px-4 py-3">
                  {project.category ? (
                    <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {project.category}
                    </span>
                  ) : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell max-w-xs truncate">
                  {project.description}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {id ? (
                    <Link href={`/projects/${id}`}
                      className="inline-block rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 mr-2 transition-colors">
                      Edit
                    </Link>
                  ) : null}
                  <button
                    onClick={() => handleDelete(project)}
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

export default ProjectTable;