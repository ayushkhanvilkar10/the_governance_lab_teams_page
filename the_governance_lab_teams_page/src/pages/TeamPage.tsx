import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember } from '../types';
import { teamMembersArray } from '../data/teamMembersArray';
import parse from 'html-react-parser';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
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
      projects: member.projects
    } : null;
  }).filter(member => member !== null);

  return (
    <Container>
      <main>
        {sortedTeamMembers.map((member, index) => {
          const pictureUrl = member.picture_blog2020 || (member.picture ? `https://content.thegovlab.com/assets/${member.picture.id}` : '');
          const isExpanded = expandedMembers[member.name];
          const areProjectsVisible = projectsVisible[member.name];

          return (
            <Card key={index} className="mb-3 custom-card">
              <Row noGutters>
                <Col xs={12} md={3}>
                  {pictureUrl && (
                    <div
                      className="team-member-picture"
                      style={{ backgroundImage: `url(${pictureUrl})` }}
                    ></div>
                  )}
                </Col>
                <Col xs={12} md={9}>
                  <Card.Body className="team-member-body">
                    <Card.Title className="card-title-custom">{member.name}</Card.Title>
                    {member.title && <Card.Subtitle className="mb-2 text-muted card-subtitle-custom">{member.title}</Card.Subtitle>}
                    {member.bio_short && !isExpanded && <Card.Text className='card-text-custom'>{parse(member.bio_short)}</Card.Text>}
                    {member.bio && isExpanded && <Card.Text className='card-text-custom'>{parse(member.bio)}</Card.Text>}
                    {member.bio !== null && member.bio !== "NULL" && (
                      <Button variant="link" onClick={() => handleToggle(member.name)}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </Button>
                    )}
                    {member.projects && member.projects.length > 0 && (
                      <Button variant="link" onClick={() => handleProjectsToggle(member.name)}>
                        {areProjectsVisible ? 'Hide Projects' : 'Show Projects'}
                      </Button>
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
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          );
        })}
      </main>
      <footer>
        <p>© 2024 Governance Lab</p>
      </footer>
    </Container>
  );
};

export default TeamPage;
