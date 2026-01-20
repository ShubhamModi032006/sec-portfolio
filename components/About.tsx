"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Music, Lightbulb, ChevronDown, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

const Box = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 0.98, rotate: 0.5 }}
        className={`bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-sm overflow-hidden relative group hover:border-neon-main/50 transition-colors ${className}`}
    >
        {children}
    </motion.div>
)

const GithubActivity = () => {
    const weeks = 18;
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;

    // State to hold data
    const [contributionData, setContributionData] = useState<{ level: number, date: string, count: number }[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch('https://github-contributions-api.jogruber.de/v4/ShubhamModi032006?y=last');
            const data = await response.json();

            // Flatten the days from the API response
            const allDays = data.contributions.flat();
            const last16Weeks = allDays.slice(-totalDays); // Take last 112 days

            const processedData = last16Weeks.map((day: any) => ({
                level: day.level,
                date: new Date(day.date).toLocaleDateString(),
                count: day.count
            }));

            // Sum up total contributions for the displayed period
            const total = processedData.reduce((acc: number, curr: any) => acc + curr.count, 0);

            setContributionData(processedData);
            setTotalContributions(total);
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
            // Fallback to mock data on error (using previous randomizer logic)
            const mockData = Array.from({ length: totalDays }, (_, i) => ({
                level: Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0,
                date: new Date(Date.now() - (totalDays - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                count: 0
            }));
            setContributionData(mockData);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getColor = (level: number) => {
        switch (level) {
            case 1: return '#7c2d12'; // Dark Orange
            case 2: return '#c2410c'; // Medium Orange
            case 3: return '#ea580c'; // Bright Orange
            case 4: return '#f97316'; // Neon Orange
            default: return '#2d2d2d'; // Empty
        }
    };

    if (contributionData.length === 0) return (
        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs animate-pulse">Loading GitHub stats...</div>
    );

    const getWeekMonth = (weekIndex: number) => {
        if (contributionData.length === 0) return "";
        // Calculate based on the data index for the start of the week
        const dayIndex = weekIndex * 7;
        // Safety check
        if (dayIndex >= contributionData.length) return "";
        const dateStr = contributionData[dayIndex].date;
        return new Date(dateStr).toLocaleString('default', { month: 'short' });
    }

    return (
        <div className="w-full h-full flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                    <Image
                        src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png"
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 invert opacity-80"
                        alt="GitHub"
                        unoptimized
                    />
                    <span className="font-bold text-xs sm:text-sm">GitHub Activity</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400">{totalContributions} contributions (Last 4 Months)</span>
            </div>

            <div className="flex flex-col items-center w-full">
                {/* Month Labels */}
                <div className="flex gap-[2px] sm:gap-[3px] mb-0.5 sm:mb-1 w-full pb-0.5 justify-center">
                    {Array.from({ length: weeks }).map((_, weekIndex) => {
                        const currentMonth = getWeekMonth(weekIndex);
                        const nextMonth = getWeekMonth(weekIndex + 1);
                        const prevMonth = weekIndex > 0 ? getWeekMonth(weekIndex - 1) : null;

                        // Logic: Show label if it's the start of a month in the grid (prev !== current),
                        // OR if it's the very first week and continues into the next (not a stub).
                        const isNewMonth = weekIndex > 0 && currentMonth !== prevMonth;
                        const isFirstWeekOfBlock = weekIndex === 0 && currentMonth === nextMonth;
                        const showLabel = isNewMonth || isFirstWeekOfBlock;

                        return (
                            <div key={weekIndex} className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 relative text-center flex-shrink-0">
                                {showLabel && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center mb-0.5">
                                        <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium leading-none tracking-tighter whitespace-nowrap">
                                            {currentMonth}
                                        </span>
                                        <ChevronDown className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-neutral-600/80 mt-0.5" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Grid */}
                <div className="flex gap-[2px] sm:gap-[3px] justify-center">
                    {Array.from({ length: weeks }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px] sm:gap-[3px]">
                            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                                const dataIndex = weekIndex * daysPerWeek + dayIndex;
                                const data = contributionData[dataIndex];

                                if (!data) return null;

                                return (
                                    <motion.div
                                        key={dayIndex}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: dataIndex * 0.005, duration: 0.2 }}
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-[1px] sm:rounded-[2px] relative group/cell"
                                        style={{ backgroundColor: getColor(data.level) }}
                                    >
                                        {/* Tooltip */}
                                        {data.count > 0 && (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-[9px] sm:text-[10px] text-white whitespace-nowrap rounded border border-white/10 opacity-0 group-hover/cell:opacity-100 pointer-events-none z-50 transition-opacity">
                                                {data.count} contributions on {data.date}
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

            <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[9px] sm:text-[10px] text-neutral-500">
                <span>Less</span>
                <div className="flex gap-[1px] sm:gap-[2px]">
                    {[0, 1, 2, 3, 4].map(l => (
                        <div key={l} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[1px]" style={{ backgroundColor: getColor(l) }} />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    )
}

const LeetCodeStats = () => {
    const [stats, setStats] = useState<any>(null);
    const [contest, setContest] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = fetch('https://alfa-leetcode-api.onrender.com/ShubhamModi032006/profile').then(res => res.json());
        const fetchContest = fetch('https://alfa-leetcode-api.onrender.com/ShubhamModi032006/contest').then(res => res.json());

        Promise.all([fetchStats, fetchContest])
            .then(([statsData, contestData]) => {
                if (statsData && statsData.totalSolved !== undefined) {
                    setStats(statsData);
                }
                if (contestData) {
                    setContest(contestData);
                }
            })
            .catch(err => console.error("LeetCode fetch error", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-between h-full animate-pulse">
                <div className="flex items-center justify-between w-full mb-3 sm:mb-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/10 rounded-full" />
                        <div className="h-3 sm:h-4 w-16 bg-white/10 rounded" />
                    </div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white/10 rounded" />
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <div className="h-3 w-24 bg-white/10 rounded" />
                    <div className="h-6 w-16 bg-white/10 rounded" />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-baseline gap-2">
                        <div className="h-8 sm:h-10 w-20 bg-white/10 rounded" />
                        <div className="h-3 sm:h-4 w-12 bg-white/10 rounded" />
                    </div>
                    <div className="h-1.5 sm:h-2 w-full bg-white/10 rounded-full" />
                    <div className="flex justify-between pt-0.5 sm:pt-1">
                        <div className="h-2 sm:h-2.5 w-10 bg-white/10 rounded" />
                        <div className="h-2 sm:h-2.5 w-10 bg-white/10 rounded" />
                        <div className="h-2 sm:h-2.5 w-10 bg-white/10 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    const totalSolved = stats ? stats.totalSolved : 120; // Fallback
    const easy = stats ? stats.easySolved : 45;
    const medium = stats ? stats.mediumSolved : 60;
    const hard = stats ? stats.hardSolved : 15;

    // Safety check for division by zero
    const totalQ = easy + medium + hard || 1;
    const easyP = (easy / totalQ) * 100;
    const mediumP = (medium / totalQ) * 100;
    const hardP = (hard / totalQ) * 100;

    const rating = contest?.contestRating ? Math.round(contest.contestRating) : 'N/A';
    const topPercent = contest?.contestTopPercentage ? contest.contestTopPercentage : null;

    return (
        <div className="flex flex-col justify-between h-full relative">
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-2 text-neon-main">
                    <Image
                        src="https://cdn.simpleicons.org/leetcode/CCFF00"
                        alt="LeetCode"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        unoptimized
                    />
                    <span className="uppercase tracking-widest text-xs font-bold">LeetCode</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </div>

            <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-3 h-3 text-yellow-500" />
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400">Contest Rating</span>
                </div>
                <div className="flex items-baseline gap-3">
                    <h4 className="text-2xl font-display font-bold text-white tracking-tight">{rating}</h4>
                    {topPercent && (
                        <span className="text-[10px] font-mono text-neon-main bg-neon-main/10 px-1.5 py-0.5 rounded border border-neon-main/20">
                            Top {topPercent}%
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                    <h4 className="text-4xl font-display font-bold text-white leading-none">{totalSolved}</h4>
                    <span className="text-sm text-neutral-500 font-medium">Solved</span>
                </div>
                <div className="flex gap-1 h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${easyP}%` }} transition={{ duration: 1 }} className="h-full bg-green-500" />
                    <motion.div initial={{ width: 0 }} animate={{ width: `${mediumP}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-yellow-500" />
                    <motion.div initial={{ width: 0 }} animate={{ width: `${hardP}%` }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-red-500" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
                    <span className="hover:text-green-400 transition-colors">Easy: {easy}</span>
                    <span className="hover:text-yellow-400 transition-colors">Med: {medium}</span>
                    <span className="hover:text-red-400 transition-colors">Hard: {hard}</span>
                </div>
            </div>
        </div>
    );
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
        <section id="about" className="min-h-screen py-16 sm:py-24 md:py-32 container mx-auto px-4 sm:px-6 md:px-4 flex flex-col justify-center relative">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 sm:gap-6 h-auto md:min-h-[600px]">
                {/* Photo Box */}
                <Box className="md:col-span-1 md:row-span-2 relative min-h-[300px] sm:min-h-[400px] md:min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0 bg-neutral-900 z-0">
                        <Image
                            src="/shubham.jpg"
                            alt="Shubham Modi"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                        <h3 className="text-3xl sm:text-4xl font-display font-bold leading-none mb-2">Shubham<br />Modi</h3>
                        <p className="text-xs sm:text-sm text-neon-main uppercase tracking-widest">Full Stack Dev</p>
                    </div>
                </Box>

                {/* Bio Box */}
                <Box className="md:col-span-2" delay={0.1}>
                    <div className="flex justify-between items-start mb-6 md:mb-10 flex-wrap gap-2">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">About</h3>
                            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-neon-main mt-1 opacity-80">
                                <span className="w-1.5 h-1.5 bg-neon-main animate-pulse rounded-full" />
                                // SYSTEM_LOG: BIO_DATA_FETCHED
                            </div>
                        </div>
                        <div className="bg-neon-main/10 px-2 sm:px-3 py-1 rounded-full text-neon-main text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-neon-main/20">
                            Open to Work
                        </div>
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 leading-relaxed font-sans font-light">
                        I'm a <span className="text-white font-medium">Full Stack Developer</span> passionate about building robust web applications. I transform ideas into complex <span className="text-white font-medium">MERN stack solutions</span> and treat every project as a piece of art.
                    </p>
                    <div className="mt-6 sm:mt-8 flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-2xl sm:text-3xl font-bold font-display text-white">#3</span>
                            <span className="text-[10px] sm:text-xs uppercase text-neutral-500 tracking-wider">Major Projects</span>
                        </div>
                        <div className="w-[1px] h-8 sm:h-10 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-2xl sm:text-3xl font-bold font-display text-white">100%</span>
                            <span className="text-[10px] sm:text-xs uppercase text-neutral-500 tracking-wider">Commitment</span>
                        </div>
                    </div>
                </Box>

                {/* LeetCode Box */}
                <Box className="md:col-span-1 flex flex-col justify-between min-h-[200px]" delay={0.2}>
                    <LeetCodeStats />
                </Box>

                {/* Github Activity Box */}
                <Box className="md:col-span-1 !p-4 sm:!p-6 flex flex-col justify-center min-h-[200px]" delay={0.3}>
                    <GithubActivity />
                </Box>
            </div>
        </section>
    )
}
