"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './MediaPicker.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface MediaPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function MediaPicker({ onSelect, onClose }: MediaPickerProps) {
  const [folders, setFolders] = useState<any[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('root');
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFolders();
    fetchFiles('root');
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/media/folders`, { credentials: 'include' });
      if (res.ok) setFolders(await res.json());
    } catch (err) {}
  };

  const fetchFiles = async (folderId: string) => {
    try {
      const url = new URL(`${API_URL}/api/media/files`);
      if (folderId !== 'root') url.searchParams.append('folderId', folderId);

      const res = await fetch(url.toString(), { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (err) {}
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
        fetchFiles(activeFolder);
      }
    } catch (err) {} finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onSelect(`${API_URL}${selectedFile.url}`);
    }
  };

  const renderFolders = (nodes: any[], depth = 0) => {
    return nodes.map(folder => (
      <div key={folder.id}>
        <div
          style={{
            padding: `6px 8px 6px ${depth * 12 + 8}px`,
            cursor: 'pointer',
            borderRadius: '4px',
            color: activeFolder === folder.id ? 'var(--color-accent)' : 'inherit',
            background: activeFolder === folder.id ? 'rgba(196, 154, 69, 0.1)' : 'transparent',
            fontSize: '0.9rem'
          }}
          onClick={() => { setActiveFolder(folder.id); fetchFiles(folder.id); setSelectedFile(null); }}
        >
          📁 {folder.name}
        </div>
        {folder.children?.length > 0 && renderFolders(folder.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Select Media</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.sidebar}>
            <div style={{ marginBottom: '12px', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Folders</div>
            <div
              style={{
                padding: '6px 8px', cursor: 'pointer', borderRadius: '4px',
                color: activeFolder === 'root' ? 'var(--color-accent)' : 'inherit',
                background: activeFolder === 'root' ? 'rgba(196, 154, 69, 0.1)' : 'transparent',
                fontSize: '0.9rem'
              }}
              onClick={() => { setActiveFolder('root'); fetchFiles('root'); setSelectedFile(null); }}
            >
              🏠 All Files
            </div>
            {renderFolders(folders)}
          </div>

          <div className={styles.mainArea}>
            <div className={styles.uploadRow}>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>{files.length} files found</span>
              <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleUpload} multiple />
              <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
                {uploading ? 'Uploading...' : 'Upload New'}
              </button>
            </div>

            <div className={styles.grid}>
              {files.map(file => (
                <div 
                  key={file.id} 
                  className={`${styles.fileCard} ${selectedFile?.id === file.id ? styles.fileCardSelected : ''}`}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className={styles.filePreview}>
                    {file.mimeType.startsWith('image/') ? (
                      <img src={`${API_URL}${file.url}`} alt={file.originalName} loading="lazy" />
                    ) : (
                      <div style={{ fontSize: '2rem' }}>📄</div>
                    )}
                  </div>
                  <div className={styles.fileName}>{file.originalName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button className={styles.btnConfirm} disabled={!selectedFile} onClick={handleConfirm}>
            Insert Media
          </button>
        </div>

      </div>
    </div>
  );
}
