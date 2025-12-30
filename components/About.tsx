"use client"
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Music, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

const Box = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 0.98, rotate: 0.5 }}
    className={`bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden relative group hover:border-neon-main/50 transition-colors ${className}`}
  >
    {children}
  </motion.div>
)

const GithubActivity = () => {
    // Generate mock data for 16 weeks * 7 days
    const weeks = 16;
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;
    
    // State to hold data (prevents hydration mismatch)
    const [contributionData, setContributionData] = useState<{level: number, date: string}[]>([]);

    useEffect(() => {
        // Custom randomizer to simulate specific activity patterns
        const generateLevel = (index: number) => {
            // First 4 weeks (Oct): Heavy (Mix of 3 and 4)
            if (index < 28) return Math.random() > 0.3 ? (Math.random() > 0.6 ? 4 : 3) : 1;
            // Next 4 weeks (Nov): Consistent (Mix of 2 and 3)
            if (index < 56) return Math.random() > 0.2 ? (Math.random() > 0.5 ? 3 : 2) : 0;
            // Next 4 weeks (Dec): Streaks (High 4s followed by 0s)
            if (index < 84) return Math.random() > 0.4 ? 4 : 0;
             // Last 4 weeks (Jan): Normal
            return Math.random() > 0.6 ? (Math.random() > 0.5 ? 2 : 1) : 0;
        };

        const data = Array.from({ length: totalDays }, (_, i) => ({
            level: generateLevel(i),
            date: new Date(Date.now() - (totalDays - i) * 24 * 60 * 60 * 1000).toLocaleDateString()
        }));
        setContributionData(data);
    }, []);

    const getColor = (level: number) => {
        switch(level) {
            case 1: return '#7c2d12'; // Dark Orange
            case 2: return '#c2410c'; // Medium Orange
            case 3: return '#ea580c'; // Bright Orange
            case 4: return '#f97316'; // Neon Orange
            default: return '#2d2d2d'; // Empty
        }
    };

    if (contributionData.length === 0) return null; // Or a loading skeleton

    const getWeekMonth = (weekIndex: number) => {
        const dayIndex = weekIndex * 7;
        const date = new Date(Date.now() - (totalDays - dayIndex) * 24 * 60 * 60 * 1000);
        return date.toLocaleString('default', { month: 'short' });
    }

    return (
        <div className="w-full h-full flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white">
                    <img src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png" className="w-5 h-5 invert opacity-80" alt="GitHub" />
                    <span className="font-bold text-sm">GitHub Activity</span>
                </div>
                <span className="text-[10px] text-neutral-400">489 contributions</span>
            </div>

            <div className="flex flex-col items-center w-full">
                {/* Month Labels */}
                <div className="flex gap-[3px] mb-2">
                    {Array.from({ length: weeks }).map((_, weekIndex) => {
                        const currentMonth = getWeekMonth(weekIndex);
                        const prevMonth = weekIndex > 0 ? getWeekMonth(weekIndex - 1) : null;
                        const showLabel = weekIndex === 0 || currentMonth !== prevMonth;
                        
                        return (
                            <div key={weekIndex} className="w-2.5 sm:w-3 relative h-8">
                                {showLabel && (
                                    <div className="absolute bottom-0 left-0 flex flex-col items-center -translate-x-1/2 ml-1.5">
                                        <span className="text-[9px] text-neutral-500 whitespace-nowrap font-medium leading-none mb-0.5">
                                            {currentMonth}
                                        </span>
                                        <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-neutral-600">
                                            <path d="M12 5v14M19 12l-7 7-7-7"/>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Grid */}
                <div className="flex gap-[3px]">
                    {Array.from({ length: weeks }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                                const dataIndex = weekIndex * daysPerWeek + dayIndex;
                                const data = contributionData[dataIndex];
                                return (
                                    <motion.div
                                        key={dayIndex}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: dataIndex * 0.005, duration: 0.2 }}
                                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] relative group/cell"
                                        style={{ backgroundColor: getColor(data.level) }}
                                    >
                                         {/* Tooltip */}
                                         {data.level > 0 && (
                                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-[10px] text-white whitespace-nowrap rounded border border-white/10 opacity-0 group-hover/cell:opacity-100 pointer-events-none z-50 transition-opacity">
                                                 {Math.floor(Math.random() * 15) + 1} contributions on {data.date}
                                                 <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                                             </div>
                                         )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 text-[10px] text-neutral-500">
                <span>Less</span>
                <div className="flex gap-[2px]">
                    {[0, 1, 2, 3, 4].map(l => (
                        <div key={l} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getColor(l) }} />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    )
}

export default function About() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone: 'Asia/Kolkata' }));
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="min-h-screen py-32 container mx-auto px-4 flex flex-col justify-center relative">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Photo Box */}
            <Box className="md:col-span-1 md:row-span-2 relative min-h-[300px] overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900 z-0">
                    <img 
                      src="https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113553/jm7lzaefxenoz27qzxfz.jpg" 
                      alt="Shubham Modi" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-4xl font-display font-bold leading-none mb-2">Shubham<br/>Modi</h3>
                    <p className="text-sm text-neon-main uppercase tracking-widest">Full Stack Dev</p>
                </div>
            </Box>

            {/* Bio Box */}
            <Box className="md:col-span-2" delay={0.1}>
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-white">About</h3>
                    <div className="bg-neon-main/10 px-3 py-1 rounded-full text-neon-main text-[10px] font-bold uppercase tracking-widest border border-neon-main/20">
                        Open to Work
                    </div>
                </div>
                <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-sans font-light">
                    I'm a <span className="text-white font-medium">Full Stack Developer</span> passionate about building robust web applications. I transform ideas into complex <span className="text-white font-medium">MERN stack solutions</span> and treat every project as a piece of art.
                </p>
                <div className="mt-8 flex gap-4">
                     <div className="flex flex-col">
                         <span className="text-3xl font-bold font-display text-white">#3</span>
                         <span className="text-xs uppercase text-neutral-500 tracking-wider">Major Projects</span>
                     </div>
                     <div className="w-[1px] h-10 bg-white/10" />
                     <div className="flex flex-col">
                         <span className="text-3xl font-bold font-display text-white">100%</span>
                         <span className="text-xs uppercase text-neutral-500 tracking-wider">Commitment</span>
                     </div>
                </div>
            </Box>

            {/* LeetCode Box */}
            <Box className="md:col-span-1 flex flex-col justify-between" delay={0.2}>
                <div className="flex items-center justify-between w-full mb-4">
                    <div className="flex items-center gap-2 text-neon-main">
                        <img 
                            src="https://cdn.simpleicons.org/leetcode/CCFF00" 
                            alt="LeetCode" 
                            className="w-5 h-5"
                        />
                        <span className="uppercase tracking-widest text-xs">LeetCode</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </div>
                <div className="space-y-2">
                   <div className="flex items-baseline gap-2">
                       <h4 className="text-4xl font-display font-bold">120</h4>
                       <span className="text-sm text-neutral-400 font-medium">Solved</span>
                   </div>
                   <div className="flex gap-1 h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                       <div className="h-full bg-green-500 w-[75%]" /> {/* Easy */}
                       <div className="h-full bg-yellow-500 w-[23%]" /> {/* Medium */}
                       <div className="h-full bg-red-500 w-[2%]" />   {/* Hard */}
                   </div>
                   <div className="flex justify-between text-[10px] uppercase tracking-wider text-neutral-500 pt-1">
                       <span>Total Active Days: 71</span>
                       <span>Max Streak: 23</span>
                   </div>
                </div>
            </Box>

             {/* Github Activity Box */}
            <Box className="md:col-span-1 !p-6 flex flex-col justify-center" delay={0.3}>
                 <GithubActivity />
            </Box>
        </div>
    </section>
  )
}
