import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Plus } from 'lucide-react';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import { Table, TableRow, TableCell } from '../../components/common/Table';
import { mockSubjects } from '../../data/mockData';

const FacultyMaterials = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [materials, setMaterials] = useState([
    {
      id: '1',
      title: 'Introduction to Data Structures',
      type: 'lecture',
      subjectId: '1',
      fileSize: '2.3 MB',
      uploadDate: '2024-01-15',
      downloads: 45
    },
    {
      id: '2',
      title: 'BST Implementation Assignment',
      type: 'assignment',
      subjectId: '1',
      fileSize: '1.1 MB',
      uploadDate: '2024-01-20',
      downloads: 32
    },
    {
      id: '3',
      title: 'Sorting Algorithms Reference',
      type: 'reference',
      subjectId: '2',
      fileSize: '5.7 MB',
      uploadDate: '2024-01-18',
      downloads: 67
    }
  ]);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    type: 'lecture',
    subjectId: '',
    file: null
  });

  const handleUpload = () => {
    if (uploadForm.title && uploadForm.subjectId && uploadForm.file) {
      const newMaterial = {
        id: (materials.length + 1).toString(),
        title: uploadForm.title,
        type: uploadForm.type,
        subjectId: uploadForm.subjectId,
        fileSize: `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0
      };
      setMaterials([...materials, newMaterial]);
      setUploadForm({ title: '', type: 'lecture', subjectId: '', file: null });
      setShowUploadModal(false);
    }
  };

  const handleDelete = (materialId) => {
    setMaterials(materials.filter(m => m.id !== materialId));
  };

  const getSubjectName = (subjectId) => {
    const subject = mockSubjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'assignment':
        return 'bg-green-100 text-green-800';
      case 'reference':
        return 'bg-purple-100 text-purple-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalMaterials = materials.length;
  const totalDownloads = materials.reduce((sum, m) => sum + m.downloads, 0);
  const lectureNotes = materials.filter(m => m.type === 'lecture').length;
  const assignments = materials.filter(m => m.type === 'assignment').length;

  return (
    <div className="space-y-6">
      {/*------------------------------------------ Header -----------------------------------------*/}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-gray-600">Upload and manage study materials for your students</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/*----------------------------------------- Stats--------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Materials</p>
              <p className="text-2xl font-bold text-gray-900">{totalMaterials}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Download className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Upload className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Lecture Notes</p>
              <p className="text-2xl font-bold text-gray-900">{lectureNotes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{assignments}</p>
            </div>
          </div>
        </Card>
      </div>

      {/*-------------------------------- Materials Table------------------------------------- */}
      <Card title="Uploaded Materials">
        <Table headers={['Material', 'Subject', 'Type', 'Size', 'Upload Date', 'Downloads', 'Actions']}>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{material.title}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{getSubjectName(material.subjectId)}</span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(material.type)}`}>
                  {material.type}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{material.fileSize}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">
                  {new Date(material.uploadDate).toLocaleDateString()}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{material.downloads}</span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(material.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>

      {/*----------- Upload Modal-------------------- */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Study Material"
      >
        <div className="space-y-4">
          {/*--------------------------------- Title --------------------------------------*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Title
            </label>
            <input
              type="text"
              value={uploadForm.title}
              onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter material title"
            />
          </div>

          {/*------------------------------------ Subject & Type--------------------------------------- */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={uploadForm.subjectId}
                onChange={(e) => setUploadForm({ ...uploadForm, subjectId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subject</option>
                {mockSubjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Type
              </label>
              <select
                value={uploadForm.type}
                onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="lecture">Lecture Notes</option>
                <option value="assignment">Assignment</option>
                <option value="reference">Reference Material</option>
                <option value="exam">Exam Paper</option>
              </select>
            </div>
          </div>

          {/*------------------------------------------ File Upload------------------------------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <input
              type="file"
              onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, PPT, PPTX (Max size: 50MB)
            </p>
          </div>

          {/* -----------------------------------Buttons -----------------------------------------*/}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!uploadForm.title || !uploadForm.subjectId || !uploadForm.file}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Upload Material
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FacultyMaterials;
