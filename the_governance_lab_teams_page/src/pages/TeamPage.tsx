import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember } from '../types';
import { teamMembersArray } from '../data/teamMembersArray';
import parse from 'html-react-parser';
import './TeamPage.css';

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMembers, setExpandedMembers] = useState<{ [key: string]: boolean }>({});
  const [projectsVisible, setProjectsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        const data = await fetchTeamMembers();
        setTeamMembers(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching team members');
        setLoading(false);
      }
    };

    getTeamMembers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleToggle = (name: string) => {
    setExpandedMembers(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleProjectsToggle = (name: string) => {
    setProjectsVisible(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const sortedTeamMembers = teamMembersArray.map(name => {
    const member = teamMembers.find(member => member.name === name && member.bio_short);
    return member ? {
      name: member.name,
      title: member.title,
      bio_short: member.bio_short,
      bio: member.bio,
      picture_blog2020: member.picture_blog2020,
      picture: member.picture,
      projects: member.projects // Add projects attribute here
    } : null;
  }).filter(member => member !== null);

  return (
    <div>
      <header>
        <h1>Our Team</h1>
      </header>
      <main>
        {sortedTeamMembers.map((member, index) => {
          const pictureUrl = member.picture_blog2020 || (member.picture ? `https://content.thegovlab.com/assets/${member.picture.id}` : '');
          const isExpanded = expandedMembers[member.name];
          const areProjectsVisible = projectsVisible[member.name];

          return (
            <div key={index} className="team-member">
              {pictureUrl && <img src={pictureUrl} alt={member.name} className="team-member-picture" />}
              <div className="team-member-info">
                <h2>{member.name}</h2>
                {member.title && <h3>{member.title}</h3>}
                {member.bio_short && !isExpanded && <div>{parse(member.bio_short)}</div>}
                {member.bio && isExpanded && <div>{parse(member.bio)}</div>}
                {member.bio !== null && member.bio !== "NULL" && (
                  <button onClick={() => handleToggle(member.name)}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
                {member.projects && member.projects.length > 0 && (
                  <button onClick={() => handleProjectsToggle(member.name)}>
                    {areProjectsVisible ? 'Hide Projects' : 'Show Projects'}
                  </button>
                )}
                {areProjectsVisible && member.projects && (
                  <ul className="projects-list">
                    {member.projects.map((project, projectIndex) => (
                      <li key={projectIndex}>
                        <a href={project.projects_id.project_link} target="_blank" rel="noopener noreferrer">
                          {project.projects_id.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </main>
      <footer>
        <p>© 2024 Governance Lab</p>
      </footer>
    </div>
  );
};

export default TeamPage;
