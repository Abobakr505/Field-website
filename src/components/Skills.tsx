import React, { useEffect, memo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../lib/utils';
import { MousePointer2 } from 'lucide-react';
import { GiOpenBook } from 'react-icons/gi';
import { DiHtml53dEffects } from "react-icons/di";
const AutoCADLogo = memo(({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="256"
    height="256"
    className={className}
  >
    <rect width="256" height="256" rx="60" fill="#f4f2ed" />
    <path
      fill="#E51013"
      d="M128 28L52 228h34l16-46h52l16 46h34L128 28zm0 56l24 70h-48l24-70z"
    />
  </svg>
));

AutoCADLogo.displayName = "AutoCADLogo";


const FramerLogo = memo(({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>Framer icon</title>
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="black" />
  </svg>
));

FramerLogo.displayName = 'FramerLogo';

const OfficeVisual = memo(() => (
  <div className="relative h-20 w-full my-3 border border-dashed border-gray-700 rounded-xl flex items-center justify-center bg-gray-800/50 group-hover:bg-gray-900 transition-colors overflow-hidden">
    <motion.div
      className="absolute flex gap-2"
      animate={{ x: [0, 10, 0, -10, 0], y: [0, -5, 0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-16 h-16 bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-2 flex items-center justify-center">
        <GiOpenBook className="w-10 h-10 text-[#e0530c]" />
      </div>
      <MousePointer2 className="absolute -bottom-4 -right-4 fill-white text-black w-5 h-5 drop-shadow-md" />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Productivity</span>
  </div>
));
OfficeVisual.displayName = 'OfficeVisual';
const TwinVisual3D = memo(() => (
  <div className="relative h-20 w-full my-3 perspective-1000">
    <motion.div
      className="relative h-full w-full rounded-xl flex items-center justify-center bg-gray-800 shadow-lg border border-gray-700 overflow-hidden"
      whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.div
        className="w-16 h-16 bg-gray-900 rounded-lg shadow-xl border border-gray-700 p-2 flex items-center justify-center"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <DiHtml53dEffects className="w-10 h-10 text-white" />
      </motion.div>

      <MousePointer2 className="absolute -bottom-4 -right-4 w-5 h-5 drop-shadow-md text-white" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
      <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
        3D Magician
      </span>
    </motion.div>
  </div>
));

TwinVisual3D.displayName = "TwinVisual3D"; 
const SkillMeter = memo(({ percentage, color }: { percentage: number; color: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, percentage, { duration: 1.5, ease: "circOut" });
    return controls.stop;
  }, [percentage, count]);

  return (
    <div className="w-full mt-auto pt-2">
      <div className="flex justify-between items-end mb-2">
        <span className="font-display text-[11px] font-bold text-gray-500 tracking-widest uppercase">Proficiency</span>
        <div className="flex items-baseline">
          <motion.span className="font-display text-2xl font-black text-gray-100 leading-none tracking-tight">
            {rounded}
          </motion.span>
          <span className="text-md font-bold font-display text-gray-500 ml-1">%</span>
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

SkillMeter.displayName = 'SkillMeter';

const Card = memo(({ children, className, index = 0 }: { children?: React.ReactNode; className?: string, index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className={cn(
      "relative flex flex-col p-5 rounded-[24px] bg-gray-900 border border-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden group h-full min-h-[320px] md:min-h-0 gpu-accelerated",
      className
    )}
  >
    {children}
  </motion.div>
));

Card.displayName = 'Card';

const FigmaVisual = memo(() => (
  <div className="relative h-24 w-full my-3 border border-dashed border-gray-700 rounded-xl flex items-center justify-center bg-gray-800/50 group-hover:bg-gray-900 transition-colors overflow-hidden">
    <motion.div
      className="absolute flex gap-2"
      animate={{ x: [0, 10, 0, -10, 0], y: [0, -5, 0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-16 h-20 bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-2 flex flex-col gap-1">
        <div className="w-full h-8 bg-purple-900 rounded-md" />
        <div className="w-2/3 h-2 bg-gray-700 rounded-full" />
        <div className="w-full h-2 bg-gray-700 rounded-full" />
      </div>
      <MousePointer2 className="absolute -bottom-4 -right-4 fill-white text-black w-5 h-5 drop-shadow-md" />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Engineering design</span>
  </div>
));

FigmaVisual.displayName = 'FigmaVisual';

const FramerVisual = memo(() => (
  <div className="relative h-24 w-full my-3 border border-dashed border-gray-700 rounded-xl flex items-center justify-center bg-gray-800/50 group-hover:bg-gray-900 transition-colors overflow-hidden">
    <motion.div
      className="flex flex-wrap gap-2 w-32 justify-center items-center content-center"
      animate={{ gap: ["8px", "4px", "8px"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-blue-500 rounded-[4px]"
          animate={{
            width: ["36px", "100px", "36px"],
            height: ["36px", "12px", "36px"],
            backgroundColor: ["#3b82f6", "#60a5fa", "#1f70ff"],
            borderRadius: ["8px", "6px", "8px"]
          }}
          transition={{
            duration: 4,
            ease: [0.22, 1, 0.36, 1],
            repeat: Infinity,
            repeatDelay: 1,
            delay: i * 0.05
          }}
        />
      ))}
    </motion.div>

    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50 px-2 py-0.5 rounded-full backdrop-blur-sm">Building Information Modeling</span>
  </div>
));

FramerVisual.displayName = 'FramerVisual';

const MaxVisual3D = memo(() => (
  <div className="relative h-24 w-full my-3 border border-dashed border-gray-700 rounded-xl flex items-center justify-center bg-gray-800/50 group-hover:bg-gray-900 transition-colors overflow-hidden perspective-800">
    <motion.div
      className="flex gap-4 justify-center items-center"
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.5, 1],
            y: [0, -10, 0],
            rotateX: [0, 180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>

    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
      3D Different
    </span>
  </div>
));

MaxVisual3D.displayName = "MaxVisual3D";
const IllustratorVisual = memo(() => (
  <div className="relative h-24 w-full my-3 border border-gray-700 rounded-xl overflow-hidden bg-gray-800 group-hover:border-gray-600 transition-colors">
    <div className="absolute inset-0 w-full h-full">
      <video
        src="/Illustrator.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none', transform: 'translateX(1%)' }}
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
    <span className="absolute bottom-2 left-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-900/80 px-2 py-0.5 rounded-full backdrop-blur-sm z-10 shadow-sm">Image Editing</span>
  </div>
));

IllustratorVisual.displayName = 'IllustratorVisual';

const Skills: React.FC = memo(() => {
  return (
    <div className="w-full min-h-full flex flex-col items-center p-4 md:p-6 lg:p-8 overflow-visible pb-20">
      <div className="text-center mb-8 md:mb-10 shrink-0 relative z-10 mt-2">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-100 tracking-tight flex items-baseline justify-center gap-2"
        >
          My
          <div className="relative inline-block">
            <span className="font-designer font-normal text-3xl md:text-4xl lg:text-5xl relative z-10">Skills</span>
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
          The creative arsenal I use to bring ideas to life.
        </motion.p>
      </div>

      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        <Card className="justify-between" index={0}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden shadow-sm">
                <AutoCADLogo className="w-full h-full" />
              </div>
              <div className="px-2 py-1 bg-red-900/50 rounded-md border border-red-900">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Drafting</span>
              </div>
            </div>

            <h3 className="text-xl font-bold font-display text-gray-100 mb-0.5">AutoCAD</h3>


            <FigmaVisual />
          </div>

          <SkillMeter percentage={96} color="bg-red-500" />
        </Card>

        <Card className="justify-between" index={1}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 bg-[#1f70ff] rounded-xl flex items-center justify-center border border-gray-700   group-hover:scale-105 transition-all">
                <h2 className='text-3xl font-bold text-white '>R</h2>
              </div>
              <div className="px-2 py-1 bg-blue-900/50 rounded-md border border-blue-900">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">BIM</span>
              </div>
            </div>

            <h3 className="text-xl font-bold font-display text-gray-100 mb-0.5">REVIT</h3>


            <FramerVisual />
          </div>

          <SkillMeter percentage={85} color="bg-blue-500" />
        </Card>

        <Card className="justify-between" index={2}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 bg-[#102438] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden shadow-sm">
                <h2 className='text-3xl font-bold text-[#5ba4db] '>Ps</h2>
              </div>
              <div className="px-2 py-1 bg-blue-900/50 rounded-md border border-blue-900">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">Image Editing</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-100 font-display mb-0.5">PHOTOSHOP</h3>

            <IllustratorVisual />
          </div>

          <SkillMeter percentage={82} color="bg-[#5ba4db]" />
        </Card>
               <Card className="justify-between" index={1}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700   group-hover:scale-105 transition-all">
                <h2 className='text-3xl font-bold text-[#39a5cc] '>3D</h2>
              </div>
              <div className="px-2 py-1 bg-blue-900/50 rounded-md border border-blue-900">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">3D Modeling</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-100 font-display mb-0.5">3DSMAX</h3>


            <MaxVisual3D />
          </div>

          <SkillMeter percentage={98} color="bg-[#39a5cc]" />
        </Card>
                       <Card className="justify-between" index={1}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-700   group-hover:scale-105 transition-all">
                <h2 className='text-3xl font-bold text-black '>T</h2>
              </div>
              <div className="px-2 py-1 bg-gray-900 rounded-md border border-gray-700">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide">Visualization</span>
              </div>
            </div>

            <h3 className="text-xl font-bold font-display text-gray-100 mb-0.5">TWINMOTION</h3>


            <TwinVisual3D />
          </div>

          <SkillMeter percentage={80} color="bg-white" />
        </Card>
                               <Card className="justify-between" index={1}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 bg-[#e0530c] rounded-xl flex items-center justify-center border border-gray-700   group-hover:scale-105 transition-all">
                <h2 className='text-3xl font-bold text-white '>O</h2>
              </div>
                              <div className="px-2 py-1 bg-orange-900/50 rounded-md border border-orange-900">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wide">Productivity</span>
              </div>
            </div>

            <h3 className="text-xl font-bold font-display text-gray-100 mb-0.5">MICROSOFT OFFICE</h3>


            <OfficeVisual />
          </div>

          <SkillMeter percentage={98} color="bg-[#e0530c]" />
        </Card>
      </div>
    </div>
  );
});

Skills.displayName = 'Skills';

export default Skills;