import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, Share2, Copy, ExternalLink, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { HashLink } from "react-router-hash-link";

interface Project {
  id: number;
  name: string;
  company_name: string;
  partner_company: string;
  location: string;
  project_type: string;
  main_image: string;
  sub_images: string[];
  description: string;
  video: string;
  features: string[];
  technologies: string[];
  behance: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut' } }
};

const galleryVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: projectData, error: projectError } = await supabase.from('projects').select('*').eq('id', id).single();
      const { data: allData } = await supabase.from('projects').select('*').order('id', { ascending: true });

      if (projectError) {
        setError(projectError.message);
      } else {
        setProject(projectData);
        setAllProjects(allData || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name,
          text: project?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };



  const formatVideoUrl = (url: string) => {
    if (url.includes("vimeo.com")) {
      const id = url.split("/").pop();
      return `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&autopause=0`;
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let id = "";
      if (url.includes("youtu.be")) {
        id = url.split("/").pop()!;
      } else {
        const params = new URL(url).searchParams;
        id = params.get("v")!;
      }
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
    }

    return url;
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoom(1);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(3, prev + 0.5));
  const handleZoomOut = () => setZoom(prev => Math.max(0.5, prev - 0.5));

  const currentIndex = allProjects.findIndex(p => p.id === project?.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-gray-100 flex-col gap-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-medium">Loading Project...</p>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-red-400 flex-col gap-4">
      <p className="text-xl font-bold">Error: {error || 'Project not found'}</p>
      <HashLink
        smooth
        to="/#Works" className="flex items-center gap-2 text-blue-400 hover:underline">
        <ChevronLeft size={20} /> Back to Projects
      </HashLink>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-gray-100 relative overflow-x-hidden py-16 px-4 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <HashLink
            smooth
            to="/#Works"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-200 transition-colors duration-300"
          >
            <ChevronLeft size={24} />
            <span className="font-medium">Back to Projects</span>
          </HashLink>
          <div className="flex items-center gap-4">

            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800/80 backdrop-blur-md rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Share2 size={20} className="text-gray-300" />
              <span className="text-sm font-medium text-gray-300">Share</span>
            </button>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-16 font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-800 tracking-tight"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          {project.name}
          <span className="block text-xl md:text-2xl font-normal text-gray-400 mt-3 italic">{project.project_type}</span>
        </motion.h1>
        
        <AnimatePresence>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
          >
            <motion.div variants={childVariants} className="space-y-10 sticky top-20 self-start">
              {project.main_image && (
                <div 
                  className="relative overflow-hidden rounded-3xl shadow-2xl border border-zinc-700/30 hover:border-blue-500/50 transition-colors duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(project.main_image)}
                >
                  <img 
                    src={project.main_image} 
                    alt={project.name} 
                    className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-110" 
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = "../assets/images/placeholder.webp"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              )}
              {project.video && (
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-zinc-700/30 hover:border-blue-700/50 transition-colors duration-300 aspect-video">
                  {project.video.includes("vimeo.com") || project.video.includes("youtube.com") ? (
                    <iframe
                      src={formatVideoUrl(project.video)}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={project.video}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.main_image || "../assets/images/placeholder.webp"}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              )}
            </motion.div>
            
            <motion.div variants={childVariants} className="space-y-10">
              <div className="bg-zinc-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-zinc-700/30 hover:border-blue-500/30 transition-all duration-500" style={{ background: 'linear-gradient(145deg, #18181b, #27272a)' }}>
                <h2 className="text-3xl font-bold mb-8 text-gray-100 flex items-center font-display gap-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse" />
                  Project Overview
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p><span className="font-semibold text-white">Client:</span> {project.company_name || 'N/A'}</p>
                  <p><span className="font-semibold text-white">Partner:</span> {project.partner_company || 'N/A'}</p>
                  <p><span className="font-semibold text-white">Location:</span> {project.location || 'N/A'}</p>
                  <p><span className="font-semibold text-white">Type:</span> {project.project_type || 'N/A'}</p>
                </div>
              </div>
              
              <div className="bg-zinc-800/60 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-zinc-700/30 hover:border-blue-700/30 transition-all duration-500" style={{ background: 'linear-gradient(145deg, #18181b, #27272a)' }}>
                <h2 className="text-3xl font-bold mb-8 text-gray-100 flex items-center font-display gap-3">
                  <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse" />
                  Description
                </h2>
                <p className="text-gray-300 leading-loose italic">{project.description || 'No description available.'}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {project.features.length > 0 && (
          <motion.div 
            className="mb-20"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-4xl font-bold mb-10 text-gray-100 font-display flex items-center gap-3">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  className="p-8 bg-zinc-800/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-zinc-700/30 hover:border-blue-500/50 hover:shadow-blue-500/20 transition-all duration-500"
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                >
                  <p className="text-gray-200 font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {project.technologies.length > 0 && (
          <motion.div 
            className="mb-20"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-4xl font-bold mb-10 text-gray-100 flex items-center font-display gap-3">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse" />
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {project.technologies.map((tech, i) => (
                <motion.div 
                  key={i} 
                  className="p-6 bg-zinc-800/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-zinc-700/30 hover:border-blue-700/50 hover:shadow-blue-700/20 transition-all duration-500 flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: -0.5 }}
                >
                  <span className="text-gray-200 font-semibold">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {project.sub_images?.length > 0 && (
          <motion.div 
            className="mb-20"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-4xl font-bold mb-10 text-gray-100 font-display flex items-center gap-3">
              <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse" />
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.sub_images.map((img, i) => (
                <motion.img 
                  key={i} 
                  src={img} 
                  alt={`Gallery ${i + 1}`} 
                  className="w-full h-80 object-cover rounded-3xl shadow-2xl border border-zinc-700/30 cursor-pointer transition-all duration-500 hover:border-blue-500/50 hover:shadow-blue-500/30"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "../assets/images/placeholder.webp"; }}
                  variants={galleryVariants}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {prevProject && (
            <Link 
              to={`/project/${prevProject.id}`} 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-200 transition-colors duration-300"
            >
              <ChevronLeft size={24} />
              <span className="font-medium">Previous: {prevProject.name}</span>
            </Link>
          )}
          {project.behance && (
            <a 
              href={project.behance} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex font-display items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-bold hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
            >
              View on Behance <ExternalLink className="ml-3" size={24} />
            </a>
          )}
          {nextProject && (
            <Link 
              to={`/project/${nextProject.id}`} 
              className="flex items-center gap-2 text-blue-400 hover:text-blue-200 transition-colors duration-300"
            >
              <span className="font-medium">Next: {nextProject.name}</span>
              <ArrowUpRight size={24} />
            </Link>
          )}
        </motion.div>
      </div>

      {selectedImage && (
<motion.div
  className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>

          <motion.div
            className="relative flex items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >

            <motion.img
  src={selectedImage}
  alt="Full view"
  className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl cursor-grab transition-transform duration-300"

  style={{ 
    scale: zoom,
    transformOrigin: 'center center'
  }}
/>

          </motion.div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-zinc-800/80 backdrop-blur-md p-2 rounded-full shadow-lg">
            <button 
              onClick={handleZoomOut}
              className="p-2 text-white hover:bg-zinc-700/50 rounded-full transition-colors"
            >
              <ZoomOut size={24} />
            </button>

            <button 
              onClick={handleZoomIn}
              className="p-2 text-white hover:bg-zinc-700/50 rounded-full transition-colors"
            >
              <ZoomIn size={24} />
            </button>
          </div>
          <button 
            className="absolute top-4 right-4 text-white bg-zinc-800/80 p-2 rounded-full hover:bg-zinc-700/50 transition-colors"
            onClick={closeModal}
          >
            <X size={24} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectDetails;