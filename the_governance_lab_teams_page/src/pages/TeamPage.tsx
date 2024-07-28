import React, { useEffect, useState } from 'react';
import { fetchTeamMembers } from '../services/api';
import { TeamMember } from '../types';
import { teamMembersArray } from '../data/teamMembersArray';
import parse from 'html-react-parser';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
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

  if (loading) return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
    
  if (error) return <div>{error}</div>;

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

  const handleProjectsToggle = (name: string) => {
    setProjectsVisible(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const preprocessBio = (bio: string): string => {
    // Replace \n</br></br> with a single <br> tag
    return bio.replace(/\n<\/br><\/br>/g, '<br></br>');
  };

  const sortedTeamMembers = teamMembersArray.map(selected_member => {
    const member = teamMembers.find(member => member.name === selected_member.name && member.bio_short);
    return member ? {
      name: member.name,
      title: member.title,
      bio_short: member.bio_short,
      bio: member.bio && member.bio !== null && member.bio !== "NULL" ? preprocessBio(member.bio) : null, // Preprocess bio to replace sequences
      picture_blog2020: member.picture_blog2020,
      picture: member.picture,
      projects: member.projects,
      url: selected_member.url,
    } : null;
  }).filter(member => member !== null);

  return (
    <>
      <Container className='team-member-container mx-auto'>
        <main>
          {sortedTeamMembers.map((member, index) => {
            const pictureUrl = member.picture_blog2020 || (member.picture ? `https://content.thegovlab.com/assets/${member.picture.id}` : '');
            const isExpanded = expandedMembers[member.name];
            const areProjectsVisible = projectsVisible[member.name];
            const showReadMoreButton = member.bio !== member.bio_short && member.bio !== null && member.bio !== "NULL";

            return (
              <React.Fragment key={index}>
                <Card className="mb-3 custom-card">
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
                        {member.title && <Card.Subtitle className="mb-2 text-muted card-subtitle-custom">
                          {member.title}
                        </Card.Subtitle>}
                        {member.bio_short && !isExpanded && <Card.Text className='card-text-custom'>{parse(member.bio_short)}</Card.Text>}
                        {member.bio && isExpanded && <Card.Text className='card-text-custom'>{parse(member.bio)}</Card.Text>}
                          <div className='button-container'>
                            {showReadMoreButton && (
                              <Button className='team-card-custom-button' variant="link" onClick={() => handleMoreToggle(member.name, member.url)}>
                                {isExpanded ? 'LESS' : 'MORE'}
                                <i className='material-icons'>{isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
                              </Button>
                            )}
                            {member.projects && member.projects.length > 0 && (
                              <Button className='team-card-custom-button' variant="link" onClick={() => handleProjectsToggle(member.name)}>
                                PROJECTS
                                <i className='material-icons'>{areProjectsVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
                              </Button>
                            )}
                          </div>
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
                <hr className="full-width-divider" />
              </React.Fragment>
            );
          })}
        </main>
      </Container>
    </>
  );
};

export default TeamPage;
