import React, { memo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';
import { MapPin, Calendar, Phone, Asterisk, BriefcaseBusiness } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }
};

const About: React.FC = memo(() => {
  // Parallax للصورة (تتحرك مع السكرول بشكل ناعم)
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]); // حركة خفيفة للأعلى والأسفل مع السكرول

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-8  md:p-6 overflow-visible">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 lg:gap-16 items-center">
        {/* النص - الجانب الأيسر */}
        <motion.div
          className="order-2 md:order-1 flex flex-col items-start text-left z-20 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div variants={itemVariants} className="mb-6 md:mb-6 md:pt-12   relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-100 tracking-tight leading-tight">
              About
              <div className="relative inline-block ml-3">
                <span className="font-designer font-normal relative z-10">Me</span>
                <svg
                  className="absolute w-[120%] -left-[10%] h-[40%] bottom-[10%] -z-10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
                >
                  <motion.path
                    d="M 5 5 Q 50 10 95 5"
                    fill="none"
                    stroke="#FCDD00"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mix-blend-multiply opacity-80"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </h2>
          </motion.div>

          {/* النص الموسع - تفاصيل أكثر */}
          <motion.div variants={itemVariants} className="prose prose-lg text-gray-400 mb-10 md:mb-10">
            <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-300 mb-6">
              I'm Ahmed Khaled, an architect who is constantly seeking to give to and learn from my field of profession.
              I aim to bring architecture to a new level of 
              <span className="bg-yellow-900/50 px-1 rounded-md text-yellow-300">creativity</span> 
              accompanied by the perfect balance of 
              <span className="bg-blue-900/50 px-1 rounded-md text-blue-300">reliability</span>.
            </p>

            <p className="leading-relaxed text-base md:text-lg mb-6">
              At the same time, I strive to absorb every piece of knowledge and experience needed 
              to enhance my work, refine my talent, and continuously pursue my passion for architecture.
            </p>

            <p className="leading-relaxed text-base md:text-lg">
              Every design starts with a deep understanding of the client's vision, the site context, and the environment — ensuring that the final result is not just beautiful, but truly functional and sustainable for generations to come.
            </p>
          </motion.div>

          {/* الإحصائيات */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 md:gap-6  pt-8 md:pt-8 border-t border-gray-700 w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-900/50 rounded-full text-blue-400">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Experience</p>
                <p className="font-bold text-gray-100 text-sm">5+ Years</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-900/50 rounded-full text-orange-400">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Location</p>
                <p className="font-bold text-gray-100 text-sm">Fifth Settlement , Cairo</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-900/50 rounded-full text-yellow-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Number </p>
                <p className="font-bold text-gray-100 text-sm">+201090304760</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-900/50 rounded-full text-red-400">
                <BriefcaseBusiness size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Projects </p>
                <p className="font-bold text-gray-100 text-sm">100+ Project </p>
              </div>
            </div>
          </motion.div>

          {/* قسم Design Philosophy */}
          <motion.div 
            variants={itemVariants} 
            className="mt-12 pt-8 pb-12  border-t border-gray-700 w-full"
          >
            <h3 className="text-2xl font-semibold font-designer text-gray-100 mb-6 flex items-center gap-3">
              <span className="text-yellow-400">
                <Asterisk size={24} />
              </span>
              Design Philosophy
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {/* Card 1 */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 bg-yellow-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-900/50 transition-colors">
                  <span className="text-2xl">✦</span>
                </div>
                <div>
                  <p className="font-semibold text-yellow-300 text-lg">Creativity First</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Pushing design boundaries while staying rooted in real-world functionality and Egyptian cultural identity.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-900/50 transition-colors">
                  <span className="text-2xl">📐</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-300 text-lg">Precision &amp; Reliability</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Every detail is engineered to last — from structural integrity to the finest finishing touches.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex gap-4 group">
                <div className="w-10 h-10 bg-emerald-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-900/50 transition-colors">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <p className="font-semibold text-emerald-300 text-lg">Sustainable Innovation</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Smart, eco-friendly solutions that respect the environment and reduce long-term costs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* الصورة - الجانب الأيمن مع Parallax */}
        <motion.div
          ref={imageRef}
          className="order-1 md:order-2 md:space-y-10 md:sticky md:top-20 md:self-start w-full flex justify-center md:justify-end z-10"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            style={{ y: imageY }}   
            className={cn(
              "relative w-[280px] sm:w-[320px] aspect-[3/4] mx-auto mb-10",
              "bg-gray-800 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden",
              "border-[6px] border-zinc-900 ring-1 ring-white/5",
              
              /* تعديلات الديسكتوب */
              "md:w-[420px] md:aspect-square md:mx-0 md:mb-0",
              "md:bg-zinc-900/70 md:rounded-3xl md:shadow-2xl md:overflow-hidden",
              "md:border-8 md:border-zinc-800/70 md:ring-4 md:ring-white/10 md:backdrop-blur-xl",
              "md:transition-all md:duration-700"
            )}
          >
            {/* Gradient خفيف فقط على الموبايل */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-indigo-900/30 md:hidden" />

            <img
              src="/about.webp"
              alt="Ahmed Khaled - Portrait"
              loading="eager"
              decoding="async"
              className={cn(
                "relative z-10 block w-full h-full object-cover transition-all duration-700 ease-out",
                "scale-110 translate-y-6 md:scale-100 md:translate-y-0 md:translate-x-0",
                "md:object-center md:shadow-inner",
                "hover:scale-[1.03] md:hover:scale-105"
              )}
            />

            {/* إطار داخلي أنيق على الديسكتوب */}
            <div className="hidden md:block absolute inset-0 border border-white/10 rounded-[13px] pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

About.displayName = 'About';

export default About;