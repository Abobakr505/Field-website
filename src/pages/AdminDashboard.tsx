// AdminDashboard.tsx - Redesigned to match the light theme style of Works.tsx: white/gray backgrounds, gray texts, blue accents on hover, rounded elements, shadows, no GSAP (removed all GSAP code), kept Framer Motion for animations similar to Works.
// Removed dark theme elements (black bg, purple borders/gradients). Buttons now use blue/gray. Inputs and form use light grays.
// Updated react-select styles to light theme.
// Ensure to install dependencies: npm install react-select react-toastify framer-motion
// For storage buckets: Create 'project-images' and 'project-videos' in Supabase Storage.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", damping: 20, stiffness: 100 }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
};

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    company_name: '',
    partner_company: '',
    location: '',
    project_type: '',
    main_image: '',
    sub_images: [],
    description: '',
    video: '',
    features: [],
    technologies: [],
    behance: '',
  });
  const [mainImageType, setMainImageType] = useState('file');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImageUrlInput, setMainImageUrlInput] = useState('');
  const [subImagesType, setSubImagesType] = useState('file');
  const [subImageFiles, setSubImageFiles] = useState([]);
  const [subImagesUrlInput, setSubImagesUrlInput] = useState('');
  const [videoType, setVideoType] = useState('file');
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const mainImageDropRef = useRef(null);
  const subImagesDropRef = useRef(null);
  const videoDropRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const mainDropArea = mainImageDropRef.current;
    if (mainDropArea && mainImageType === 'file') {
      mainDropArea.addEventListener('dragover', handleDragOver);
      mainDropArea.addEventListener('dragleave', handleDragLeave);
      mainDropArea.addEventListener('drop', (e) => handleDrop(e, 'main'));
      return () => {
        mainDropArea.removeEventListener('dragover', handleDragOver);
        mainDropArea.removeEventListener('dragleave', handleDragLeave);
        mainDropArea.removeEventListener('drop', (e) => handleDrop(e, 'main'));
      };
    }
  }, [mainImageType]);

  useEffect(() => {
    const subDropArea = subImagesDropRef.current;
    if (subDropArea && subImagesType === 'file') {
      subDropArea.addEventListener('dragover', handleDragOver);
      subDropArea.addEventListener('dragleave', handleDragLeave);
      subDropArea.addEventListener('drop', (e) => handleDrop(e, 'sub'));
      return () => {
        subDropArea.removeEventListener('dragover', handleDragOver);
        subDropArea.removeEventListener('dragleave', handleDragLeave);
        subDropArea.removeEventListener('drop', (e) => handleDrop(e, 'sub'));
      };
    }
  }, [subImagesType]);

  useEffect(() => {
    const videoDropArea = videoDropRef.current;
    if (videoDropArea && videoType === 'file') {
      videoDropArea.addEventListener('dragover', handleDragOver);
      videoDropArea.addEventListener('dragleave', handleDragLeave);
      videoDropArea.addEventListener('drop', (e) => handleDrop(e, 'video'));
      return () => {
        videoDropArea.removeEventListener('dragover', handleDragOver);
        videoDropArea.removeEventListener('dragleave', handleDragLeave);
        videoDropArea.removeEventListener('drop', (e) => handleDrop(e, 'video'));
      };
    }
  }, [videoType]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (type === 'main' && files.length > 0) {
      setMainImageFile(files[0]);
    } else if (type === 'sub') {
      setSubImageFiles((prev) => [...prev, ...files]);
    } else if (type === 'video' && files.length > 0) {
      setVideoFile(files[0]);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'main') {
      setMainImageFile(file);
    } else if (type === 'video') {
      setVideoFile(file);
    }
  };

  const handleSubImagesChange = (e) => {
    setSubImageFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({ ...prev, technologies: [...prev.technologies, techInput.trim()] }));
      setTechInput('');
    }
  };

  const removeTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const uploadFile = async (file, bucket = 'project-images') => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      });
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const uploadSubImages = async (files) => {
    const urls = [];
    for (const file of files) {
      const url = await uploadFile(file);
      if (url) urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      let mainImageUrl = formData.main_image;
      if (mainImageType === 'file' && mainImageFile) {
        mainImageUrl = await uploadFile(mainImageFile);
      } else if (mainImageType === 'url' && mainImageUrlInput) {
        mainImageUrl = mainImageUrlInput;
      }

      let subImagesUrls = isEditing ? [...formData.sub_images] : [];
      if (subImagesType === 'file' && subImageFiles.length > 0) {
        const newUrls = await uploadSubImages(subImageFiles);
        subImagesUrls = [...subImagesUrls, ...newUrls];
      } else if (subImagesType === 'url' && subImagesUrlInput) {
        subImagesUrls = subImagesUrlInput.split(',').map((item) => item.trim()).filter(Boolean);
      }

      let videoUrl = formData.video;
      if (videoType === 'file' && videoFile) {
        videoUrl = await uploadFile(videoFile, 'project-videos');
      } else if (videoType === 'url' && videoUrlInput) {
        videoUrl = videoUrlInput;
      }

      const projectData = {
        ...formData,
        main_image: mainImageUrl,
        sub_images: subImagesUrls,
        video: videoUrl,
      };

      let result;
      if (isEditing) {
        result = await supabase.from('projects').update(projectData).eq('id', formData.id);
      } else {
        const { id, ...insertData } = projectData;
        result = await supabase.from('projects').insert(insertData);
      }
      if (result.error) throw result.error;

      fetchProjects();
      resetForm();
      toast.success(isEditing ? 'Project updated successfully!' : 'Project added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      setError(err.message || 'An error occurred during upload/submit.');
      toast.error('Error: ' + (err.message || 'An error occurred.'), {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      company_name: project.company_name || '',
      partner_company: project.partner_company || '',
      location: project.location || '',
      project_type: project.project_type || '',
      sub_images: project.sub_images || [],
      features: project.features || [],
      technologies: project.technologies || [],
    });
    setMainImageType(project.main_image ? 'url' : 'file');
    setMainImageUrlInput(project.main_image || '');
    setSubImagesType(project.sub_images.length > 0 ? 'url' : 'file');
    setSubImagesUrlInput(project.sub_images.join(', ') || '');
    setVideoType(project.video ? 'url' : 'file');
    setVideoUrlInput(project.video || '');
    setMainImageFile(null);
    setSubImageFiles([]);
    setVideoFile(null);
    setIsEditing(true);
  };

  const confirmDelete = (id) => {
    setDeleteProjectId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    if (deleteProjectId) {
      const { error } = await supabase.from('projects').delete().eq('id', deleteProjectId);
      if (error) {
        setError(error.message);
        toast.error('Error deleting project: ' + error.message, { theme: "light" });
      } else {
        fetchProjects();
        toast.success('Project deleted successfully!', { theme: "light" });
      }
      setDeleteProjectId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      company_name: '',
      partner_company: '',
      location: '',
      project_type: '',
      main_image: '',
      sub_images: [],
      description: '',
      video: '',
      features: [],
      technologies: [],
      behance: '',
    });
    setMainImageType('file');
    setMainImageFile(null);
    setMainImageUrlInput('');
    setSubImagesType('file');
    setSubImageFiles([]);
    setSubImagesUrlInput('');
    setVideoType('file');
    setVideoFile(null);
    setVideoUrlInput('');
    setFeatureInput('');
    setTechInput('');
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#f9fafb',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      color: '#111827',
      '&:hover': {
        borderColor: '#3b82f6',
        boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',
      },
      transition: 'all 0.3s ease',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#dbeafe' : 'transparent',
      color: '#111827',
      padding: '10px 20px',
      '&:hover': {
        backgroundColor: '#eff6ff',
      },
      transition: 'background-color 0.2s ease',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#111827',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6b7280',
    }),
  };

  const typeOptions = [
    { value: 'file', label: 'Upload File / Drag & Drop' },
    { value: 'url', label: 'Enter URL' },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 flex-col gap-4">
      <div className="w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      Loading...
    </div>
  );

  return (
    <div className="h-screen bg-white text-gray-900 relative  overflow-x-hidden py-8 sm:py-12">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 z-10 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Admin Dashboard</h2>
          <button onClick={handleLogout} className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg">Logout</button>
        </motion.div>
        {error && <p className="text-red-500 mb-4 text-center sm:text-left">{error}</p>}
        <motion.form 
          onSubmit={handleSubmit} 
          className="bg-white p-4 sm:p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 mb-8 sm:mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
          
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Project Name" className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" required />
          
          <input name="company_name" value={formData.company_name} onChange={handleInputChange} placeholder="Client Company Name" className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" required />
          
          <input name="partner_company" value={formData.partner_company} onChange={handleInputChange} placeholder="Partner Company Name (the company you worked with)" className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
          
          <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Project Location" className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
          
          <input name="project_type" value={formData.project_type} onChange={handleInputChange} placeholder="Project Type" className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Main Image {isEditing && '(Leave blank to keep existing)'}</label>
            <Select
              value={typeOptions.find(option => option.value === mainImageType)}
              onChange={(selected) => setMainImageType(selected.value)}
              options={typeOptions}
              styles={customSelectStyles}
              className="mb-2"
            />
            {mainImageType === 'file' ? (
              <div ref={mainImageDropRef} className={`w-full px-4 py-6 bg-gray-50 border-2 ${isDragging ? 'border-blue-500' : 'border-gray-200'} border-dashed rounded-lg text-gray-900 text-center cursor-pointer transition-all shadow-sm hover:border-blue-500/50`}>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'main')} className="hidden" id="mainImageFile" />
                <label htmlFor="mainImageFile" className="cursor-pointer">
                  {mainImageFile ? mainImageFile.name : 'Drag & drop image here or click to upload'}
                </label>
              </div>
            ) : (
              <input value={mainImageUrlInput} onChange={(e) => setMainImageUrlInput(e.target.value)} placeholder="Main Image URL" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
            )}
            {isEditing && formData.main_image && <img src={formData.main_image} alt="Current main" className="mt-2 w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md" />}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Sub Images {isEditing && '(Add new ones; existing will be kept and new added if using file upload, or edit URLs to modify)'}</label>
            <Select
              value={typeOptions.find(option => option.value === subImagesType)}
              onChange={(selected) => setSubImagesType(selected.value)}
              options={typeOptions}
              styles={customSelectStyles}
              className="mb-2"
            />
            {subImagesType === 'file' ? (
              <div ref={subImagesDropRef} className={`w-full px-4 py-6 bg-gray-50 border-2 ${isDragging ? 'border-blue-500' : 'border-gray-200'} border-dashed rounded-lg text-gray-900 text-center cursor-pointer transition-all shadow-sm hover:border-blue-500/50`}>
                <input type="file" accept="image/*" multiple onChange={handleSubImagesChange} className="hidden" id="subImagesFiles" />
                <label htmlFor="subImagesFiles" className="cursor-pointer">
                  {subImageFiles.length > 0 ? `${subImageFiles.length} files selected` : 'Drag & drop images here or click to upload multiple'}
                </label>
              </div>
            ) : (
              <input value={subImagesUrlInput} onChange={(e) => setSubImagesUrlInput(e.target.value)} placeholder="Sub Images URLs (comma separated)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
            )}
            {isEditing && formData.sub_images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto max-w-full">
                {formData.sub_images.map((img, i) => <img key={i} src={img} alt={`Sub ${i}`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md" />)}
              </div>
            )}
          </div>
          
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" rows={4} />
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Video {isEditing && '(Leave blank to keep existing)'}</label>
            <Select
              value={typeOptions.find(option => option.value === videoType)}
              onChange={(selected) => setVideoType(selected.value)}
              options={typeOptions}
              styles={customSelectStyles}
              className="mb-2"
            />
            {videoType === 'file' ? (
              <div ref={videoDropRef} className={`w-full px-4 py-6 bg-gray-50 border-2 ${isDragging ? 'border-blue-500' : 'border-gray-200'} border-dashed rounded-lg text-gray-900 text-center cursor-pointer transition-all shadow-sm hover:border-blue-500/50`}>
                <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="hidden" id="videoFile" />
                <label htmlFor="videoFile" className="cursor-pointer">
                  {videoFile ? videoFile.name : 'Drag & drop video here or click to upload'}
                </label>
              </div>
            ) : (
              <input value={videoUrlInput} onChange={(e) => setVideoUrlInput(e.target.value)} placeholder="Video URL (e.g., YouTube , Viemo embed)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
            )}
            {isEditing && formData.video && <video src={formData.video} className="mt-2 w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md" controls />}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Features</label>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Add feature" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
              <button type="button" onClick={addFeature} className="px-4 py-3 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg">Add</button>
            </div>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {formData.features.map((f, i) => (
                <li key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                  {f}
                  <button type="button" onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700 transition-colors">Remove</button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Technologies</label>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Add technology" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
              <button type="button" onClick={addTech} className="px-4 py-3 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg">Add</button>
            </div>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {formData.technologies.map((t, i) => (
                <li key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                  {t}
                  <button type="button" onClick={() => removeTech(i)} className="text-red-500 hover:text-red-700 transition-colors">Remove</button>
                </li>
              ))}
            </ul>
          </div>
          
          <input name="behance" value={formData.behance} onChange={handleInputChange} placeholder="Behance URL (optional)" className="w-full mb-4 sm:mb-6 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm" />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-3 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : null}
              {isSubmitting ? 'Processing...' : (isEditing ? 'Update' : 'Add')}
            </button>
            {isEditing && <button type="button" onClick={resetForm} className="px-6 sm:px-8 py-3 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg">Cancel</button>}
          </div>
        </motion.form>
        <motion.h3 
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          Existing Projects
        </motion.h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-auto"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative flex flex-col w-full bg-white rounded-[24px] p-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-500 hover:-translate-y-2 h-auto min-h-[320px]"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[18px] bg-gray-100 shrink-0 mb-4">
                <img
                  src={project.main_image || "../assets/images/placeholder.webp"}
                  onError={(e) => { e.currentTarget.src = "../assets/images/placeholder.webp"; }}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow px-2 pt-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h4>
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    {project.company_name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <button onClick={() => handleEdit(project)} className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md">Edit</button>
                  <button onClick={() => confirmDelete(project.id)} className="px-3 sm:px-4 py-2 bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-md">Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full"
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
