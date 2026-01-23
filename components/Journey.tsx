import React, { useEffect, memo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../lib/utils';
import { MousePointer2, Briefcase, Award, Microscope, Asterisk } from 'lucide-react';

// Placeholder logos or icons - you can replace with actual SVGs or images
const UniversityIcon = memo(({ className }: { className?: string }) => (
  <Microscope className={cn("w-12 h-12 text-blue-600", className)} />
));
UniversityIcon.displayName = 'UniversityIcon';

const CertificateIcon = memo(({ className }: { className?: string }) => (
  <Award className={cn("w-12 h-12 text-green-600", className)} />
));
CertificateIcon.displayName = 'CertificateIcon';

const ExperienceIcon = memo(({ className }: { className?: string }) => (
  <Briefcase className={cn("w-12 h-12 text-purple-600", className)} />
));
ExperienceIcon.displayName = 'ExperienceIcon';

// ProgressBar reused for progress or similar
const ProgressBar = memo(({ percentage, color }: { percentage: number; color: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  useEffect(() => {
    const controls = animate(count, percentage, { duration: 1.5, ease: "circOut" });
    return controls.stop;
  }, [percentage, count]);
  return (
    <div className="w-full mt-auto pt-4">
      <div className="flex justify-between items-end mb-2">
        <span className="font-display text-[11px] font-bold text-gray-400 tracking-widest uppercase">Completion</span>
        <div className="flex items-baseline">
          <motion.span className="font-display text-2xl font-black text-gray-900 leading-none tracking-tight">
            {rounded}
          </motion.span>
          <span className="text-sm font-bold text-gray-400 ml-0.5">%</span>
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
                isActive ? color : "bg-gray-100"
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
      "relative flex flex-col p-5 rounded-[24px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden group h-full min-h-[280px] md:min-h-0 gpu-accelerated",
      className
    )}
  >
    {children}
  </motion.div>
));
Card.displayName = 'Card';

const EducationVisual = memo(() => (
  <div className="relative h-20 w-full my-3 border border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50/50 group-hover:bg-white transition-colors overflow-hidden">
    <motion.div
      className="absolute flex gap-2"
      animate={{ x: [0, 10, 0, -10, 0], y: [0, -5, 0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-16 h-16 bg-white rounded-lg shadow-sm border border-gray-200 p-2 flex items-center justify-center">
        <Microscope className="w-10 h-10 text-blue-500" />
      </div>
      <MousePointer2 className="absolute -bottom-4 -right-4 fill-black text-white w-5 h-5 drop-shadow-md" />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Learning Path</span>
  </div>
));
EducationVisual.displayName = 'EducationVisual';

const CertificateVisual = memo(({ imageSrc }: { imageSrc: string }) => (
  <div className="relative h-24 w-full my-3 border border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50/50 group-hover:bg-white transition-colors">
    <img src={imageSrc} alt="Certificate" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Certified</span>
  </div>
));
CertificateVisual.displayName = 'CertificateVisual';

const ExperienceCard = memo(({ children, className, index = 0, side = 'left', year }: { children?: React.ReactNode; className?: string, index?: number, side?: 'left' | 'right', year: string }) => (
  <div className={cn("relative mb-12 w-full md:w-[45%]", side === 'left' ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left')}>
    {/* Dot */}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      className={cn(
        "absolute top-12 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-purple-500 shadow-md ring-0 ring-purple-300/50 transition-all group-hover:ring-8",
        side === 'left' ? 'right-[-10px] md:right-[-5rem]' : 'left-[-15px] md:left-[-5rem]'
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
        className="w-3 h-3 bg-purple-500 rounded-full"
      />
    </motion.div>
    {/* Horizontal Connector Line - Visible on md+ with gradient */}
    <div className={cn(
      "hidden md:block absolute top-12 h-0.5 bg-gradient-to-r",
      side === 'left' ? 'right-0 from-purple-300 to-purple-500 w-[calc(50%+2.5rem)]' : 'left-0 from-purple-500 to-purple-300 w-[calc(50%+2.5rem)]'
    )} />

    {/* Card */}
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={cn(
        "relative flex flex-col p-5 rounded-[24px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden group",
        className
      )}
    >
      {children}    {/* Year Label - Improved styling */}
    <p className="text-center mt-4 px-3 py-1 bg-purple-100 rounded-full text-sm font-bold text-purple-700 shadow-sm transition-all duration-300 group-hover:bg-purple-200">
      {year}
    </p>
    </motion.div>
  </div>
));
ExperienceCard.displayName = 'ExperienceCard';

const Journey: React.FC = memo(() => {
  return (
    <div className="w-full min-h-full flex flex-col items-center p-4 md:p-6 lg:p-8 overflow-visible pb-20">
      <div className="text-center mb-8 md:mb-10 shrink-0 relative z-10 mt-2">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 tracking-tight flex items-baseline justify-center gap-2"
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
          className="mt-2 text-gray-500 font-medium max-w-lg mx-auto text-xs md:text-sm tracking-wide"
        >
          From education to real-world experience - my professional path.
        </motion.p>
      </div>

      {/* Education Section */}
      <div className="w-full max-w-[1200px] mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left font-designer  flex flex-row items-center"> <Asterisk className="w-10 h-10 text-[#fcdd00]" />   My Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <Card className="justify-between" index={0}>
            <div className="absolute top-4 left-4 text-3xl font-bold text-gray-200 opacity-50">1</div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <UniversityIcon />
                </div>
                <div className="px-2 py-1 bg-blue-50 rounded-md border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Bachelor</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">Computer Science</h4>
              <p className="text-sm text-gray-500 leading-relaxed">University of Example, 2015-2019. Focused on software engineering.</p>
              <EducationVisual />
            </div>
            <ProgressBar percentage={100} color="bg-blue-500" />
          </Card>
          <Card className="justify-between" index={1}>
            <div className="absolute top-4 left-4 text-3xl font-bold text-gray-200 opacity-50">2</div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <UniversityIcon />
                </div>
                <div className="px-2 py-1 bg-blue-50 rounded-md border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Master</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">AI & Machine Learning</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Tech Institute, 2019-2021. Advanced AI techniques.</p>
              <EducationVisual />
            </div>
            <ProgressBar percentage={100} color="bg-blue-500" />
          </Card>
          <Card className="justify-between" index={2}>
            <div className="absolute top-4 left-4 text-3xl font-bold text-gray-200 opacity-50">3</div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <UniversityIcon />
                </div>
                <div className="px-2 py-1 bg-blue-50 rounded-md border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">PhD</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">Data Science</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Research University, 2021-2024. Big data analysis.</p>
              <EducationVisual />
            </div>
            <ProgressBar percentage={100} color="bg-blue-500" />
          </Card>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="w-full max-w-[1200px] mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left font-designer flex flex-row items-center "> <Asterisk className="w-10 h-10 text-[#fcdd00]" />  My Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          <Card className="justify-between" index={0}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-green-50 rounded-md border border-green-100">
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Certified</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">AWS Certified Developer</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Issued by Amazon Web Services, 2022.</p>
              <CertificateVisual imageSrc="https://via.placeholder.com/300x200?text=AWS+Certificate" />
            </div>
          </Card>
          <Card className="justify-between" index={1}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-green-50 rounded-md border border-green-100">
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Certified</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">Google Data Analytics</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Issued by Google, 2023.</p>
              <CertificateVisual imageSrc="https://via.placeholder.com/300x200?text=Google+Certificate" />
            </div>
          </Card>
          <Card className="justify-between" index={2}>
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <CertificateIcon />
                </div>
                <div className="px-2 py-1 bg-green-50 rounded-md border border-green-100">
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Certified</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">Microsoft Azure AI</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Issued by Microsoft, 2024.</p>
              <CertificateVisual imageSrc="https://via.placeholder.com/300x200?text=Azure+Certificate" />
            </div>
          </Card>
        </div>
      </div>

      {/* Experience Section - Enhanced Timeline */}
      <div className="w-full max-w-[1200px]">
        <h3 className="text-2xl flex flex-row items-center   font-bold text-gray-900 mb-6 text-left font-designer"> <Asterisk className="w-10 h-10 text-[#fcdd00]" /> My Experience</h3>
        <div className="relative flex flex-col items-center">
          {/* Timeline Line - Enhanced with gradient and animation */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-200 to-purple-500 h-full rounded-full overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.3)]"
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
          <ExperienceCard side="left" index={0} year="2019-2021">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-purple-50 rounded-md border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wide">Junior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">Software Engineer</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Tech Corp, 2019-2021. Developed web applications.</p>
            </div>
            <ProgressBar percentage={100} color="bg-purple-500" />
          </ExperienceCard>
          <ExperienceCard side="right" index={1} year="2021-2023">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-purple-50 rounded-md border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wide">Senior</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">AI Specialist</h4>
              <p className="text-sm text-gray-500 leading-relaxed">AI Innovations, 2021-2023. Led ML projects.</p>
            </div>
            <ProgressBar percentage={100} color="bg-purple-500" />
          </ExperienceCard>
          <ExperienceCard side="left" index={2} year="2023-Present">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 group-hover:bg-white group-hover:scale-105 transition-all">
                  <ExperienceIcon />
                </div>
                <div className="px-2 py-1 bg-purple-50 rounded-md border border-purple-100">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wide">Lead</span>
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-0.5">Data Scientist</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Data Dynamics, 2023-Present. Big data analytics.</p>
            </div>
            <ProgressBar percentage={90} color="bg-purple-500" />
          </ExperienceCard>
        </div>
      </div>
    </div>
  );
});
Journey.displayName = 'Journey';
export default Journey;