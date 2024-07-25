import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember } from '../types';

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

  return (
    <div>
      <header>
        <h1>Our Team</h1>
      </header>
      <main>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.picture?.url} alt={member.name} />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.bio}</p>
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
