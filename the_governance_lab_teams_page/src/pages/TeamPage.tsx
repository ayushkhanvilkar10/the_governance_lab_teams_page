import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember, SelectedTeamMember } from '../types';
import { selectedTeamMembersArray } from '../data/teamMembersArray';
import { Container, Spinner } from 'react-bootstrap';
import './TeamPage.css';
import TeamCard from '../components/TeamCard/TeamCard';

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMembers, setExpandedMembers] = useState<{ [key: string]: boolean }>({});
  const [projectsVisible, setProjectsVisible] = useState<{ [key: string]: boolean }>({});

  // API call to fetch team members
  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        const data = await fetchTeamMembers();
        setTeamMembers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred.');
        }
        
        setLoading(false);
      } 
    };

    getTeamMembers();
  }, []);

  // Spinner for loading state that takes up entire screen and stops footer from being shown at the top during initial loading
  if (loading) return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
    
  if (error) return <div>{error}</div>;

  // Handling click on the MORE button
  const handleMoreToggle = (name: string, url: string) => {
    if (url) {
      window.location.href = url;
    } else {
      setExpandedMembers(prev => ({
        ...prev,
        [name]: !prev[name]
      }));
    }
  };

  // Handling click on the PROJECTS button
  const handleProjectsToggle = (name: string) => {
    setProjectsVisible(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Handling bios to ensure they are parsed correctly so that complete value of bio return from API is displayed
  const preprocessBio = (bio: string): string => {
    return bio.replace(/\n<\/br><\/br>/g, '<br></br>');
  };

  // Creating a map for quick lookup
  const teamMembersMap = new Map(teamMembers.map(member => [member.name, member]));

  const sortedSelectedTeamMembers: SelectedTeamMember[] = [];

  // Building a sorted list of selected team members
  // Preprocessing bio so that it can be parsed properly
  selectedTeamMembersArray.forEach(selected_member => {
    const member = teamMembersMap.get(selected_member.name);
    if (member && member.bio_short) {
      sortedSelectedTeamMembers.push({
        name: member.name,
        title: member.title,
        bio_short: member.bio_short,
        bio: member.bio && member.bio !== "NULL" ? preprocessBio(member.bio) : member.bio,
        picture_blog2020: member.picture_blog2020,
        picture: member.picture,
        projects: member.projects,
        url: selected_member.url,
      });
    }
  });

  return (
    <>
      <Container className='team-member-container mx-auto'>
        <main>
          {sortedSelectedTeamMembers.map((member, index) => {
            const isExpanded = expandedMembers[member.name];
            const areProjectsVisible = projectsVisible[member.name];
            // Showing the MORE button if bio is not null and not as same as the short bio or when on cliking the MORE button user is redirected to bio page
            const showReadMoreButton = (member.bio !== member.bio_short && member.bio !== null && member.bio !== "NULL") || member.url.length > 1; // Hide MORE button if bio property is not found

            return (
              <TeamCard
              index={index}
              member={member}
              isExpanded={isExpanded}
              areProjectsVisible={areProjectsVisible}
              showReadMoreButton={showReadMoreButton}
              handleMoreToggle={handleMoreToggle}
              handleProjectsToggle={handleProjectsToggle}
            />
            );
          })}
        </main>
      </Container>
    </>
  );
};

export default TeamPage;
