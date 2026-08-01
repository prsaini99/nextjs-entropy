'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import { jobs, Job } from '@/lib/careers';

const teams = ['All', 'Engineering', 'AI/Data', 'Cloud/DevOps', 'Product/Design', 'Go-to-Market', 'People/Ops', 'Internships'];

export default function OpenRoles() {
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
    return ['All', ...uniqueLocations];
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesTeam = selectedTeam === 'All' || job.team === selectedTeam;
      const matchesLocation = selectedLocation === 'All' || job.location === selectedLocation;
      return matchesTeam && matchesLocation;
    });
  }, [selectedTeam, selectedLocation]);

  const jobsByTeam = useMemo(() => {
    const grouped = filteredJobs.reduce((acc, job) => {
      if (!acc[job.team]) {
        acc[job.team] = [];
      }
      acc[job.team].push(job);
      return acc;
    }, {} as Record<string, Job[]>);
    return grouped;
  }, [filteredJobs]);

  return (
    <section id="open-roles">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container w-container">
          <div className="steps-wrapper">
            <AnimatedInViewDiv className="header">
              <h2 className="heading-4 text-weight-medium">
                Open Roles
              </h2>
              <div className="opacity-60">
                <div className="max-width-42ch">
                  <div>
                    We're always looking for talented builders to join our team. Find your next opportunity below.
                  </div>
                </div>
              </div>
            </AnimatedInViewDiv>

            <AnimatedInViewDiv className="mt-12" delay={0.1}>
              <div className="mb-8">
                <div className="mb-6">
                  <div className="text-size-medium text-weight-medium mb-4">Filter by Team</div>
                  <div className="flex flex-wrap gap-2">
                    {teams.map((team) => (
                      <button
                        key={team}
                        onClick={() => setSelectedTeam(team)}
                        className={`px-4 py-2 rounded-full text-size-small text-weight-medium transition-all duration-200 ${
                          selectedTeam === team 
                            ? 'bg-white text-black' 
                            : 'bg-transparent text-white opacity-60 hover:opacity-100 border border-white/20'
                        }`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-size-medium text-weight-medium mb-4">Filter by Location</div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`px-4 py-2 rounded-full text-size-small text-weight-medium transition-all duration-200 ${
                          selectedLocation === location 
                            ? 'bg-white text-black' 
                            : 'bg-transparent text-white opacity-60 hover:opacity-100 border border-white/20'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedInViewDiv>

            <div className="mt-12">
              <div className="mb-6">
                <div className="text-size-small opacity-70">
                  Showing {filteredJobs.length} role{filteredJobs.length !== 1 ? 's' : ''}
                </div>
              </div>

              {Object.keys(jobsByTeam).length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-size-regular opacity-70">
                    No roles match your current filters. Try adjusting your selection.
                  </div>
                </div>
              ) : (
                <div className="steps-stack-component">
                  {Object.entries(jobsByTeam).map(([team, teamJobs]) => (
                    <div key={team} className="mb-12">
                      <div className="mb-8">
                        <h3 className="text-size-xlarge text-weight-medium">
                          {team} <span className="opacity-60">({teamJobs.length})</span>
                        </h3>
                      </div>
                      <div className="space-y-6">
                        {teamJobs.map((job, index) => (
                          <AnimatedInViewDiv
                            key={job.slug}
                            delay={index * 0.05}
                            className="steps-item"
                          >
                            <div className="steps-card">
                              <div className="left-content">
                                <div className="steps-content">
                                  <div className="steps-tag">
                                    <div className="text-size-small text-weight-bold">{job.team}</div>
                                    <div className="vertical-line-tag"></div>
                                    <div className="read-more-button">
                                      <div className="opacity-70">
                                        <div className="text-size-small text-weight-medium">{job.experienceLevel}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="max-width-40ch">
                                    <div className="heading-4 text-weight-medium">{job.title}</div>
                                  </div>
                                  <div className="steps-description">
                                    <div>{job.blurb}</div>
                                  </div>
                                  <div className="flex gap-2 text-size-small opacity-70 mt-2">
                                    <span>{job.location}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                  </div>
                                </div>
                                <Link href={`/careers/${job.slug}`} className="primary-button w-inline-block">
                                  <div className="relative">
                                    <div className="text-size-small text-weight-bold">Apply Now</div>
                                  </div>
                                  <div className="button-elipse"></div>
                                </Link>
                              </div>
                              <div className="right-content">
                                <div className="flex items-center justify-center h-full p-6">
                                  <div className="w-full">
                                    <h4 className="text-size-medium text-weight-medium mb-4 opacity-80 text-center">
                                      What You'll Do
                                    </h4>
                                    <ul className="space-y-3">
                                      {job.whatYoullDo.slice(0, 4).map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3 text-size-small opacity-70">
                                          <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AnimatedInViewDiv>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}