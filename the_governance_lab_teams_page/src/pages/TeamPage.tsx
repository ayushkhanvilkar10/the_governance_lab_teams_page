import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember } from '../types';
import { teamMembersArray } from '../data/teamMembersArray';

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

  // Filter and sort team members based on teamMembersArray
  const sortedTeamMembers = teamMembersArray.map(name => {
    const member = teamMembers.find(member => member.name === name);
    return member ? { name: member.name, bio_short: member.bio_short } : null;
  }).filter(member => member !== null);

  return (
    <div>
      <header>
        <h1>Our Team</h1>
      </header>
      <main>
        {sortedTeamMembers.map((member, index) => (
          <div key={index}>
            <h2>{member.name}</h2>
            <p>{member.bio_short}</p>
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
