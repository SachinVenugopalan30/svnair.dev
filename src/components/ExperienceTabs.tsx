import React, { useState } from 'react';

interface Job {
  id: number;
  company: string;
  link?: string;
  position: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
}

interface ExperienceTabsProps {
  experience: Job[];
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ experience }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        .custom-link {
          position: relative;
          display: inline-block;
          color: #ccd6f6;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .custom-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #368A83;
          transition: width 0.3s ease-out;
        }
        
        .custom-link:hover {
          color: #368A83;
        }
        
        .custom-link:hover::after {
          width: 100%;
        }
      `}</style>
      <section id="experience" className="py-26 px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-10 flex items-center gap-4">
          <span>Where I've Worked</span>
          <div className="flex-1 h-px bg-ivory/20 ml-8"></div>
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible">
            <div className="flex md:flex-col relative">
              {/* Active indicator - Desktop (vertical) */}
              <div
                className="absolute left-0 w-0.5 bg-[#368A83] transition-all duration-300 ease-out hidden md:block"
                style={{
                  height: '42px',
                  transform: `translateY(${activeTab * 42}px)`,
                }}
              ></div>
              
              {/* Mobile active indicator (horizontal) */}
              <div
                className="absolute bottom-0 h-0.5 bg-[#368A83] transition-all duration-300 ease-out md:hidden"
                style={{
                  width: '120px',
                  transform: `translateX(${activeTab * 120}px)`,
                }}
              ></div>

              {experience.map((job, index) => (
                <button
                  key={job.id}
                  onClick={() => setActiveTab(index)}
                  style={{ fontFamily: 'monospace' }}
                  className={`
                    px-5 py-3 text-left text-sm whitespace-nowrap
                    transition-all duration-200
                    min-w-[120px] md:min-w-[160px]
                    bg-transparent border-none cursor-pointer
                    ${
                      activeTab === index
                        ? 'text-[#368A83]'
                        : 'text-gray-400 hover:text-[#368A83]'
                    }
                  `}
                >
                  {job.company}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Panels */}
          <div className="flex-1 min-h-[340px]">
            {experience.map((job, index) => (
              <div
                key={job.id}
                className={`
                  transition-opacity duration-300
                  ${activeTab === index ? 'opacity-100' : 'opacity-0 hidden'}
                `}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-ivory mb-1">
                  <span>{job.position}</span>
                  <span className="text-[#368A83]">
                    {' '}@ {job.link ? (
                      <a 
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="custom-link"
                      >
                        {job.company}
                      </a>
                    ) : (
                      <span className="custom-link">{job.company}</span>
                    )}
                  </span>
                </h3>

                <p className="text-sm text-gray-400 mb-6" style={{ fontFamily: 'monospace' }}>
                  {job.startDate} - {job.endDate}
                </p>

                <ul className="space-y-4">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-text-secondary">
                      <svg 
                        className="w-4 h-4 mt-1 flex-shrink-0" 
                        style={{ color: '#368A83' }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                {job.technologies && job.technologies.length > 0 && (
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-[#368A83]/10 text-[#368A83] border border-[#368A83]/20"
                          style={{ fontFamily: 'monospace' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ExperienceTabs;
