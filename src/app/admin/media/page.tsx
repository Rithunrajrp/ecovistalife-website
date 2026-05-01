"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './Media.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function MediaManager() {
  const [folders, setFolders] = useState<any[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('root');
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFolders();
    fetchFiles('root');
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/media/folders`, { credentials: 'include' });
      if (res.ok) setFolders(await res.json());
    } catch (err) {
      console.error('Failed to fetch folders', err);
    }
  };

  const fetchFiles = async (folderId: string, searchQuery = '') => {
    setLoading(true);
    try {
      const url = new URL(`${API_URL}/api/media/files`);
      if (folderId !== 'root') url.searchParams.append('folderId', folderId);
      if (searchQuery) url.searchParams.append('search', searchQuery);

      const res = await fetch(url.toString(), { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error('Failed to fetch files', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    const name = prompt('Enter folder name:');
    if (!name) return;
    try {
      const res = await fetch(`${API_URL}/api/media/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, parentId: activeFolder === 'root' ? null : activeFolder }),
        credentials: 'include',
      });
      if (res.ok) fetchFolders();
    } catch (err) {
      alert('Failed to create folder');
    }
  };

  const handleDeleteFolder = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure? This will delete the folder and all its contents.')) return;
    try {
      const res = await fetch(`${API_URL}/api/media/folders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        if (activeFolder === id) {
          setActiveFolder('root');
          fetchFiles('root');
        }
        fetchFolders();
      }
    } catch {
      alert('Failed to delete folder');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    const formData = new FormData();
    Array.from(e.target.files).forEach(file => formData.append('files', file));
    if (activeFolder !== 'root') formData.append('folderId', activeFolder);

    try {
      const res = await fetch(`${API_URL}/api/media/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (res.ok) {
        fetchFiles(activeFolder, search);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (id: string) => {
    if (!confirm('Delete this file permanently?')) return;
    try {
      const res = await fetch(`${API_URL}/api/media/files/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setFiles(files.filter(f => f.id !== id));
      }
    } catch {
      alert('Failed to delete file');
    }
  };

  const copyToClipboard = (url: string) => {
    const fullUrl = `${API_URL}${url}`;
    navigator.clipboard.writeText(fullUrl);
    alert('URL copied to clipboard!');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // Basic debounce logic can be added here
    fetchFiles(activeFolder, e.target.value);
  };

  // Simple recursive folder tree renderer
  const renderFolders = (nodes: any[], depth = 0) => {
    return nodes.map(folder => (
      <div key={folder.id}>
        <li
          className={`${styles.folderItem} ${activeFolder === folder.id ? styles.folderItemActive : ''}`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => {
            setActiveFolder(folder.id);
            fetchFiles(folder.id, search);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <span style={{ flex: 1 }}>{folder.name}</span>
          <button 
            className={styles.actionBtnDelete} 
            style={{ width: '20px', height: '20px', padding: 0, background: 'none', color: 'inherit' }}
            onClick={(e) => handleDeleteFolder(folder.id, e)}
            title="Delete Folder"
          >
            ×
          </button>
        </li>
        {folder.children?.length > 0 && renderFolders(folder.children, depth + 1)}
      </div>
    ));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar: Folder Tree */}
      <aside className={styles.sidebar}>
        <div className={styles.folderSection}>
          <div className={styles.folderSectionTitle}>
            <span>Folders</span>
            <button className={styles.addFolderBtn} onClick={handleCreateFolder} title="New Folder">+</button>
          </div>
          <ul className={styles.folderList}>
            <li
              className={`${styles.folderItem} ${activeFolder === 'root' ? styles.folderItemActive : ''}`}
              onClick={() => { setActiveFolder('root'); fetchFiles('root', search); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              All Files (Root)
            </li>
            {renderFolders(folders)}
          </ul>
        </div>
      </aside>

      {/* Main Content: Files */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Media CDN</h1>
          <div className={styles.headerActions}>
            <input 
              type="file" 
              multiple 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleUpload}
            />
            <button 
              className={styles.btnPrimary} 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : '+ Upload Files'}
            </button>
          </div>
        </div>

        {/* Upload Drop Zone (Visual only for now, can implement drag events) */}
        {files.length === 0 && !loading && (
          <div className={styles.uploadZone} onClick={() => fileInputRef.current?.click()}>
            <div className={styles.uploadIcon}>☁️</div>
            <h3>Drag & Drop files here</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>
              or click to browse (up to 20MB per file)
            </p>
          </div>
        )}

        {/* Grid Toolbar */}
        <div className={styles.gridToolbar}>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            {files.length} file{files.length !== 1 ? 's' : ''} {activeFolder !== 'root' ? 'in this folder' : ''}
          </div>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search files..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* File Grid */}
        {loading ? (
          <p>Loading files...</p>
        ) : (
          <div className={styles.fileGrid}>
            {files.map(file => (
              <div key={file.id} className={styles.fileCard}>
                <div className={styles.filePreview}>
                  {file.mimeType.startsWith('image/') ? (
                    <img src={`${API_URL}${file.url}`} alt={file.originalName} loading="lazy" />
                  ) : file.mimeType.startsWith('video/') ? (
                    <video src={`${API_URL}${file.url}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '2rem' }}>📄</div>
                  )}
                </div>
                
                <div className={styles.fileInfo}>
                  <div className={styles.fileName} title={file.originalName}>{file.originalName}</div>
                  <div className={styles.fileSize}>{formatSize(file.size)} • {file.mimeType.split('/')[1]}</div>
                </div>

                <div className={styles.fileActions}>
                  <button className={styles.actionBtn} onClick={() => copyToClipboard(file.url)} title="Copy URL">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnDelete}`} onClick={() => handleDeleteFile(file.id)} title="Delete">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
