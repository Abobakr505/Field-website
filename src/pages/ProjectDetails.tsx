import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, Share2 } from 'lucide-react';
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
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
};

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (error) {
        setError(error.message);
      } else {
        setProject(data);
      }
      setLoading(false);
    };
    fetchProject();
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
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
      <HashLink
        smooth
        to="/#Works"
        className="flex items-center gap-2 text-blue-400 hover:text-blue-200 transition-colors"
      >
        <ChevronLeft size={24} />
        <span className="font-medium">Back to Projects</span>
      </HashLink>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800/80 backdrop-blur-md rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Share2 size={20} className="text-gray-300" />
            <span className="text-sm font-medium text-gray-300">Share</span>
          </button>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-12 font-display text-gray-100 tracking-tight"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          {project.name}
          <span className="block text-lg md:text-xl font-normal text-gray-400 mt-2">{project.project_type}</span>
        </motion.h1>
        
        <AnimatePresence>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <motion.div variants={childVariants} className="space-y-8">
              {project.main_image && (
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-zinc-700/50">
                  <img 
                    src={project.main_image} 
                    alt={project.name} 
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" 
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = "../assets/images/placeholder.webp"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>
              )}
              {project.video && (
                <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-zinc-700/50">
                  <video 
                    src={project.video} 
                    className="w-full h-auto" 
                    controls 
                    playsInline 
                    poster={project.main_image || "../assets/images/placeholder.webp"}
                  />
                </div>
              )}
            </motion.div>
            
            <motion.div variants={childVariants} className="space-y-8">
              <div className="bg-zinc-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-zinc-700/50" style={{ background: 'linear-gradient(145deg, #18181b, #27272a)' }}>
                <h2 className="text-2xl font-bold mb-6 text-gray-100 flex items-center font-display gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full " />
                  Project Info
                </h2>
                <div className="space-y-4 text-gray-400">
                  <p><span className="font-semibold text-gray-100">Client:</span> {project.company_name || 'N/A'}</p>
                  <p><span className="font-semibold text-gray-100">Partner:</span> {project.partner_company || 'N/A'}</p>
                  <p><span className="font-semibold text-gray-100">Location:</span> {project.location || 'N/A'}</p>
                  <p><span className="font-semibold text-gray-100">Type:</span> {project.project_type || 'N/A'}</p>
                </div>
              </div>
              
              <div className="bg-zinc-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-zinc-700/50" style={{ background: 'linear-gradient(145deg, #18181b, #27272a)' }}>
                <h2 className="text-2xl font-bold mb-6 text-gray-100 flex items-center font-display gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Description
                </h2>
                <p className="text-gray-400 leading-relaxed">{project.description || 'No description available.'}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {project.features.length > 0 && (
          <motion.div 
            className="mb-16"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-100 font-display flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500  rounded-full" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  className="p-6 bg-zinc-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {project.technologies.length > 0 && (
          <motion.div 
            className="mb-16"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-100 flex items-center font-display gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {project.technologies.map((tech, i) => (
                <motion.div 
                  key={i} 
                  className="p-4 bg-zinc-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-zinc-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-300 font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {project.sub_images.length > 0 && (
          <motion.div 
            className="mb-16"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-100 font-display flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.sub_images.map((img, i) => (
                <motion.img 
                  key={i} 
                  src={img} 
                  alt={`Gallery ${i + 1}`} 
                  className="w-full h-72 object-cover rounded-2xl shadow-xl border border-zinc-700/50 transition-all duration-500"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "../assets/images/placeholder.webp"; }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {project.behance && (
          <motion.a 
            href={project.behance} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex font-display items-center px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            View on Behance <ArrowUpRight className="ml-2" size={20} />
          </motion.a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;