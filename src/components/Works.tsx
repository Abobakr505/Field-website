import React, { memo, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight,  } from 'lucide-react';
import { FaBehanceSquare  } from "react-icons/fa";
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

// GithubIcon remains the same (as in your original code)

interface Project {
  technologies: any;
  id: number;
  name: string;
  project_type: string;
  description: string;
  behance?: string;
  main_image?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", damping: 15, stiffness: 120, duration: 0.5 }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.4 } }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

const ProjectCard = memo(({ project }: { project: Project }) => {
  return (
    <Link to={`/project/${project.id}`}>
      <motion.div
        variants={cardVariants}
        className="group relative flex flex-col w-full max-w-md mx-auto bg-gray-900 rounded-[32px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] border border-gray-700 hover:border-blue-700 transition-all duration-500 hover:-translate-y-3 hover:scale-105 h-auto min-h-[400px] gpu-accelerated overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #18181b, #27272a)' }} // Subtle gradient for beauty
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[24px] bg-gray-800 shrink-0 mb-4">
          {project.main_image ? (
            <img src={project.main_image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-gray-400 font-bold text-xl">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="bg-gray-900/95 backdrop-blur-lg rounded-full px-5 py-3 shadow-xl transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
              <span className="text-sm font-bold text-gray-100">View Details</span>
              <ArrowUpRight size={16} className="text-gray-100" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow px-3 pt-2 pb-3">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-display font-bold text-gray-100 leading-tight group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
              {project.project_type}
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

        </div>
      </motion.div>
    </Link>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Works: React.FC = memo(() => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) console.error(error);
      else setProjects(data || []);
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full min-h-full flex flex-col items-center p-6 md:p-8 pb-24 overflow-visible"> {/* Added background gradient for beauty */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="text-center shrink-0 relative z-10 mt-4 mb-8 md:mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-100 tracking-tight flex items-baseline justify-center gap-3">
          Selected
          <div className="relative inline-block">
            <span className="font-designer font-normal text-4xl md:text-5xl lg:text-6xl relative z-10">Works</span>
            <svg
              className="absolute w-[130%] -left-[15%] h-[50%] bottom-[5%] -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <motion.path
                d="M 2 5 Q 50 10 98 5"
                fill="none"
                stroke="#FCDD00"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mix-blend-multiply opacity-85"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
          </div>
        </h2>
      </motion.div>

      <div className="w-full max-w-[1600px] flex-1 min-h-0 flex flex-col justify-start md:justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 w-full h-auto"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="shrink-0 pt-10 pb-6 flex flex-col items-center"
      >
        <a
          href="https://www.behance.net/e96d3821"
          className="flex items-center gap-2 text-gray-100 text-sm md:text-base font-bold border-b border-white hover:text-blue-400 hover:border-blue-400 transition-colors pb-1"
        >
          <FaBehanceSquare  className="w-5 h-5" />
          More on Behance
        </a>
      </motion.div>
    </div>
    
  );
});

Works.displayName = 'Works';

export default Works;