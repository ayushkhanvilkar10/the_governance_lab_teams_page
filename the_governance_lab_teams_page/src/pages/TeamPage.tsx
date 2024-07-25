import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember } from '../types';
import { teamMembersArray } from '../data/teamMembersArray';
import './TeamPage.css';  // Import the CSS file for styling

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Filter and sort team members based on teamMembersArray and ensure bio_short is available
  const sortedTeamMembers = teamMembersArray.map(name => {
    const member = teamMembers.find(member => member.name === name && member.bio_short);
    return member ? {
      name: member.name,
      title: member.title,
      bio_short: member.bio_short,
      picture_blog2020: member.picture_blog2020
    } : null;
  }).filter(member => member !== null);

  return (
    <div>
      <header>
        <h1>Our Team</h1>
      </header>
      <main>
        {sortedTeamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.picture_blog2020} alt={member.name} className="team-member-picture" />
            <div className="team-member-info">
              <h2>{member.name}</h2>
              {member.title && <h3>{member.title}</h3>}
              {member.bio_short && <p>{member.bio_short}</p>}
            </div>
          </div>
        ))}
      </main>
      <footer>
        <p>© 2024 Governance Lab</p>
      </footer>
    </div>
  );
};

export default TeamPage;
