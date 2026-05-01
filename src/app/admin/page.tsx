"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { FolderKanban, FileText, Star, Plus, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, { credentials: 'include' });
      if (!res.ok) router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const [pRes, bRes] = await Promise.all([
        fetch(`${API_URL}/api/projects`, { credentials: 'include' }),
        fetch(`${API_URL}/api/blogs`, { credentials: 'include' }),
      ]);
      if (pRes.ok) setProjects(await pRes.json());
      if (bRes.ok) setBlogs(await bRes.json());
    } catch {
      console.error('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE', credentials: 'include' });
      setProjects(projects.filter(p => p.id !== id));
    } catch { alert('Failed to delete'); }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE', credentials: 'include' });
      setBlogs(blogs.filter(b => b.id !== id));
    } catch { alert('Failed to delete'); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-primary text-white">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Page Header */}
            <div>
              <h1 className="font-heading text-4xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-text-secondary">Welcome back. Here is what's happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Projects" value={projects.length} icon={FolderKanban} />
              <StatCard title="Total Blog Posts" value={blogs.length} icon={FileText} />
              <StatCard title="Active Testimonials" value={3} icon={Star} />
            </div>

            {/* Tables Section */}
            <div className="space-y-12">
              <TableSection 
                title="Projects" 
                data={projects} 
                onDelete={handleDeleteProject} 
                columns={[
                  { key: 'title', label: 'Title' },
                  { key: 'slug', label: 'Slug' },
                  { key: 'status', label: 'Status' }
                ]}
              />

              <TableSection 
                title="Blog Posts" 
                data={blogs} 
                onDelete={handleDeleteBlog} 
                columns={[
                  { key: 'title', label: 'Title', render: (val: string) => `${val?.substring(0, 60)}...` },
                  { key: 'category', label: 'Category', render: (val: string) => val || '—' },
                  { key: 'status', label: 'Status' }
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: { title: string, value: number, icon: any }) {
  return (
    <div className="bg-bg-secondary border border-white/5 p-6 rounded-3xl flex items-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
        <Icon size={32} />
      </div>
      <div>
        <div className="text-sm uppercase tracking-widest text-text-secondary mb-1">{title}</div>
        <div className="font-heading text-4xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

function TableSection({ title, data, columns, onDelete }: { title: string, data: any[], columns: any[], onDelete: (id: string) => void }) {
  return (
    <div className="bg-bg-secondary rounded-[2rem] border border-white/5 overflow-hidden">
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-white">{title}</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-bg-primary rounded-lg font-medium hover:bg-white transition-colors">
          <Plus size={18} />
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              {columns.map((col, i) => (
                <th key={i} className="py-4 px-8 text-sm uppercase tracking-widest text-text-secondary font-medium">
                  {col.label}
                </th>
              ))}
              <th className="py-4 px-8 text-sm uppercase tracking-widest text-text-secondary font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-text-secondary">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  {columns.map((col, i) => (
                    <td key={i} className="py-4 px-8 text-white/80">
                      {col.key === 'status' ? (
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          row[col.key] === 'published' ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                        )}>
                          {row[col.key]}
                        </span>
                      ) : (
                        col.render ? col.render(row[col.key]) : row[col.key]
                      )}
                    </td>
                  ))}
                  <td className="py-4 px-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(row.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
