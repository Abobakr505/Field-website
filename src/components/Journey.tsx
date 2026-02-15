import React, { useEffect, memo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../lib/utils';
import { MousePointer2, Briefcase, Award, GraduationCap, Asterisk } from 'lucide-react';
import Testimonials from './Testimonials';

// Updated color palette for a more elegant and cohesive look:
// - Education: Warm amber/orange tones for academic feel (#F59E0B)
// - Courses: Cool teal tones for certifications (#0D9488)
// - Experience: Deep indigo for professional growth (#4F46E5)
// Using softer, more premium shades with better contrast and harmony.

const UniversityIcon = memo(({ className }: { className?: string }) => (
  <GraduationCap className={cn("w-12 h-12 text-amber-400", className)} />
));
UniversityIcon.displayName = 'UniversityIcon';

const CertificateIcon = memo(({ className }: { className?: string }) => (
  <Award className={cn("w-12 h-12 text-teal-400", className)} />
));
CertificateIcon.displayName = 'CertificateIcon';

const ExperienceIcon = memo(({ className }: { className?: string }) => (
  <Briefcase className={cn("w-12 h-12 text-indigo-400", className)} />
));
ExperienceIcon.displayName = 'ExperienceIcon';

// ProgressBar with smoother animation and customizable color
const ProgressBar = memo(({ percentage, color }: { percentage: number; color: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  useEffect(() => {
    const controls = animate(count, percentage, { duration: 1.5, ease: "circOut" });
    return controls.stop;
  }, [percentage, count]);
  return (
    <div className="w-full mt-auto pt-2">
      <div className="flex justify-between items-end mb-2">
        <span className="font-display text-[11px] font-bold text-gray-500 tracking-widest uppercase">Completion</span>
        <div className="flex items-baseline">
          <motion.span className="font-display text-2xl font-black text-gray-100 leading-none tracking-tight">
            {rounded}
          </motion.span>
          <span className="text-sm font-bold text-gray-500 ml-0.5">%</span>
        </div>
      </div>
      <div className="flex gap-[3px] h-3 w-full">
        {Array.from({ length: 20 }).map((_, i) => {
          const isActive = (i + 1) * 5 <= percentage;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 + 0.1, type: 'spring', stiffness: 300, damping: 20 }}
              className={cn(
                "flex-1 rounded-[1.5px] origin-bottom transition-all duration-300",
                isActive ? color : "bg-gray-800"
              )}
            />
          );
        })}
      </div>
    </div>
  );
});
ProgressBar.displayName = 'ProgressBar';

const Card = memo(({ children, className, index = 0 }: { children?: React.ReactNode; className?: string, index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className={cn(
      "relative flex flex-col p-5 rounded-[24px] bg-gray-900 border border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden group h-full  md:min-h-0 gpu-accelerated",
      className
    )}
  >
    {children}
  </motion.div>
));
Card.displayName = 'Card';

// Enhanced EducationVisual with smoother animation and better integration
const EducationVisual = memo(() => (
  <div className="relative h-32 w-full my-4 border border-dashed border-gray-700 rounded-xl flex items-center justify-center bg-gray-800/50 group-hover:bg-gray-900 transition-colors overflow-hidden">
    <motion.div
      className="absolute flex gap-3"
      animate={{ x: [0, 15, 0, -15, 0], y: [0, -8, 0, 8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-20 h-20 bg-gray-900 rounded-lg shadow-md border border-gray-700 p-3 flex items-center justify-center">
        <GraduationCap className="w-12 h-12 text-amber-500" />
      </div>
      <MousePointer2 className="absolute -bottom-6 -right-6 fill-white text-black w-6 h-6 drop-shadow-lg rotate-12" />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent pointer-events-none" />
    <span className="absolute bottom-3 left-4 text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-900/60 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">Academic Journey</span>
  </div>
));
EducationVisual.displayName = 'EducationVisual';

const ExperienceCard = memo(({ children, className, index = 0, side = 'left', year }: { children?: React.ReactNode; className?: string, index?: number, side?: 'left' | 'right', year: string }) => (
  <div className={cn("relative mb-12 w-full md:w-[45%]", side === 'left' ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left')}>
    {/* Dot with enhanced pulse effect */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      className={cn(
        "absolute top-12 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border-4 border-indigo-500 shadow-md ring-0 ring-indigo-300/50 transition-all group-hover:ring-8",
        side === 'left' ? 'right-[-10px] md:right-[-5rem]' : 'left-[-15px] md:left-[-5rem]'
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="w-3 h-3 bg-indigo-500 rounded-full"
      />
    </motion.div>
    {/* Horizontal Connector Line - Softer gradient */}
    <div className={cn(
      "hidden md:block absolute top-12 h-0.5 bg-gradient-to-r",
      side === 'left' ? 'right-0 from-indigo-800 to-indigo-500 w-[calc(50%+2.5rem)]' : 'left-0 from-indigo-500 to-indigo-800 w-[calc(50%+2.5rem)]'
    )} />

    {/* Card with improved shadow and hover */}
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "relative flex flex-col p-5 rounded-[24px] bg-gray-900 border border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden group",
        className
      )}
    >
      {children}
      {/* Year Label - More elegant styling */}
      <p className="text-center mt-4 px-4 py-1.5 bg-indigo-900/50 rounded-full text-sm font-bold text-indigo-300 shadow-sm transition-all duration-300 group-hover:bg-indigo-900">
        {year}
      </p>
    </motion.div>
  </div>
));
ExperienceCard.displayName = 'ExperienceCard';

const Journey: React.FC = memo(() => {
  return (
  <>
    <div className="w-full min-h-full flex flex-col items-center p-4 md:p-6 lg:p-8 overflow-visible pb-20">
      <div className="text-center mb-8 md:mb-10 shrink-0 relative z-10 mt-2">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-100 tracking-tight flex items-baseline justify-center gap-2"
        >
          My
          <div className="relative inline-block">
            <span className="font-designer font-normal text-3xl md:text-4xl lg:text-5xl relative z-10">Journey</span>
            <svg
              className="absolute w-[110%] -left-[5%] h-[50%] bottom-[8%] -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <motion.path
                d="M 2 5 S 20 4 50 6 S 98 4 98 5"
                stroke="#FCDD00"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mix-blend-multiply opacity-80"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-gray-400 font-medium max-w-lg mx-auto text-xs md:text-sm tracking-wide"
        >
          From education to real-world experience - my professional path.
        </motion.p>
      </div>

      {/* Education Section - Made distinct: Larger visual, no progress bar for completion (since it's completed), added timeline feel */}
      <div className="w-full max-w-[1200px] mb-12">
        <h3 className="text-2xl font-bold text-gray-100 mb-6 text-left font-designer flex flex-row items-center">
          <Asterisk className="w-10 h-10 text-[#fcdd00]" /> My EDUCATION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5 items-stretch"> {/* Changed to single column for emphasis */}
          <Card className="justify-between w-[90%] mx-auto" index={0}>
            <div className="absolute top-4 left-4 text-4xl font-bold text-gray-700 opacity-40">1</div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 bg-amber-900/50 rounded-xl flex items-center justify-center border border-amber-900 group-hover:bg-amber-900 group-hover:scale-105 transition-all">
                  <UniversityIcon />
                </div>
                <div className="px-3 py-1.5 bg-amber-900/50 rounded-md border border-amber-900">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">2015-2020</span>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-100 mb-1">Bachelor of Architecture</h4> {/* Fixed typo */}
              <h3 className="text-base font-bold text-gray-300 mb-1">Modern University for Technology & Information</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Bachelor's Degree in Architectural Engineering<br />
                Sep 2015 - Sep 2020<br />
                - Grade: Good<br />
                - Graduation Project: Excellent
              </p>
              <EducationVisual /> {/* Enhanced visual for distinction */}
            </div>
            {/* Removed ProgressBar for education to differentiate from courses */}
          </Card>
        </div>
      </div>

      {/* Courses Section - Kept grid layout, with ProgressBar for completion feel */}
      <div className="w-full max-w-[1200px] mb-12">
        <h3 className="text-2xl font-bold text-gray-100 mb-6 text-left font-designer flex flex-row items-center">
          <Asterisk className="w-10 h-10 text-[#fcdd00]" /> My COURSES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <Card className="justify-between" index={0}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center border border-teal-900 group-hover:bg-teal-900 group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-teal-900/50 rounded-md border border-teal-900 ">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">Completed</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5 mt-6">Autodesk Autocad Course </h4>
              <p className="text-sm text-gray-400 leading-relaxed">By Iwan Learning Center </p>
            </div>
            <ProgressBar percentage={100} color="bg-teal-500" />
          </Card>
          <Card className="justify-between" index={0}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center border border-teal-900 group-hover:bg-teal-900 group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-teal-900/50 rounded-md border border-teal-900 ">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">Completed</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5 mt-6">Autodesk Revit Course </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">By Iwan Learning Center </p>

            </div>
            <ProgressBar percentage={100} color="bg-teal-500" />
          </Card>
          <Card className="justify-between" index={0}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center border border-teal-900 group-hover:bg-teal-900 group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-teal-900/50 rounded-md border border-teal-900 ">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">Completed</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5 mt-6">3DMax & V-ray Course </h4>
                            <p className="text-sm text-gray-400 leading-relaxed">By Iwan Learning Center </p>

            </div>
            <ProgressBar percentage={100} color="bg-teal-500" />
          </Card>
          <Card className="justify-between" index={0}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center border border-teal-900 group-hover:bg-teal-900 group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-teal-900/50 rounded-md border border-teal-900 ">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">Completed</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5 mt-6">Advanced Rendering Course </h4>
               <p className="text-sm text-gray-400 leading-relaxed">By Three Engineers Center </p>

            </div>
            <ProgressBar percentage={100} color="bg-teal-500" />
          </Card>
          <Card className="justify-between" index={0}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-teal-900/50 rounded-xl flex items-center justify-center border border-teal-900 group-hover:bg-teal-900 group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-teal-900/50 rounded-md border border-teal-900 ">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide">Completed</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5 mt-6">Twinmotion Course </h4>
              <p className="text-sm text-gray-400 leading-relaxed">By ARCHITECTURAL VISUALIZATION , Three Engineers Center  </p>
            </div>
            <ProgressBar percentage={100} color="bg-teal-500" />
          </Card>
        </div>
      </div>

      {/* Experience Section - Enhanced Timeline with smoother animations */}
      <div className="w-full max-w-[1200px]">
        <h3 className="text-2xl font-bold text-gray-100 mb-6 text-left font-designer flex flex-row items-center">
          <Asterisk className="w-10 h-10 text-[#fcdd00]" /> My EXPERIENCE
        </h3>
        <div className="relative flex flex-col items-center">
          {/* Timeline Line - Softer gradient with subtle glow */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-indigo-800 to-indigo-500 h-full rounded-full overflow-hidden shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-30"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          {/* Experience Items */}
          <ExperienceCard side="left" index={0} year="Jun 2020 - Feb 2021">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center border border-indigo-900 group-hover:bg-indigo-900 group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-indigo-900/50 rounded-md border border-indigo-900">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5">ARCHITECT AT EL-ETIHAD FOR GENERAL CONTRACTING </h4>
              <p className="text-sm text-gray-400 leading-relaxed">- Re-Designing and executing several different projects.</p>
            </div>
            <ProgressBar percentage={100} color="bg-indigo-500" />
          </ExperienceCard>
          <ExperienceCard side="right" index={1} year="Mar 2021-Mar 2022">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center border border-indigo-900 group-hover:bg-indigo-900 group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-indigo-900/50 rounded-md border border-indigo-900">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5">MILITARY SERVICE AT ENGINEERING BRANCH , REPUBLICAN GUARDS</h4>
              <p className="text-sm text-gray-400 leading-relaxed">- Works on raising the condition of damaged buildings and revision drawings and supervision on the constructions</p>
            </div>
            <ProgressBar percentage={100} color="bg-indigo-500" />
          </ExperienceCard>
          <ExperienceCard side="left" index={2} year="Feb 2022 - Jun 2022">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center border border-indigo-900 group-hover:bg-indigo-900 group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-indigo-900/50 rounded-md border border-indigo-900">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5">-Design & Visualize & Animate For Interior Desings ARCHITECT AT ARCHI-EDGE COMPANY (FREELANCER)</h4>
              <p className="text-sm text-gray-400 leading-relaxed">-Design Architect for Interior and Exterior Residential projects of different types.</p>
            </div>
            <ProgressBar percentage={100} color="bg-indigo-500" />
          </ExperienceCard>
                    <ExperienceCard side="right" index={1} year="JUN 2022 - SEP 2023">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center border border-indigo-900 group-hover:bg-indigo-900 group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-indigo-900/50 rounded-md border border-indigo-900">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5">VISUALIZER & ANIMATOR AT LODESTAR COMPANY (FULL TIME)</h4>
              <p className="text-sm text-gray-400 leading-relaxed">-Visualize And Animate For Residential Compounds, Mixed Use Building Commercial Buildings In Realstate And Villas And Hotels In KSA</p>
            </div>
            <ProgressBar percentage={100} color="bg-indigo-500" />
          </ExperienceCard>
          <ExperienceCard side="left" index={2} year="Sep 2023 - Sep 2024">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center border border-indigo-900 group-hover:bg-indigo-900 group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-indigo-900/50 rounded-md border border-indigo-900">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5">VISUALIZER & ANIMATOR AT NARA STUDIOS (FULL TIME)</h4>
              <p className="text-sm text-gray-400 leading-relaxed">-Visualize And Animate For All Types Of Buildings And Create Diffrenet Visual Wise For all Our Work All Over The World - Water Simulations by Phoneix</p>
            </div>
            <ProgressBar percentage={100} color="bg-indigo-500" />
          </ExperienceCard>
                    <ExperienceCard side="right" index={1} year="Present">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center border border-indigo-900 group-hover:bg-indigo-900 group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-indigo-900/50 rounded-md border border-indigo-900">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-100 mb-0.5">VISUALIZER & ANIMATOR AT LODESTAR COMPANY (FULL TIME)</h4>
              <p className="text-sm text-gray-400 leading-relaxed">-Visualize And Animate For Residential Compounds, Mixed Use Building Commercial Buildings In Realstate And Villas And Hotels At Middle East, Make </p>
            </div>
            <ProgressBar percentage={100} color="bg-indigo-500" />
          </ExperienceCard>
        </div>
      </div>
    </div>
    <Testimonials/>
    </>
  );
});
Journey.displayName = 'Journey';
export default Journey;