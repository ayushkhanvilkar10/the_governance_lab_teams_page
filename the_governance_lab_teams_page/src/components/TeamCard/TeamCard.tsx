import React from 'react';
import { SelectedTeamMember } from '../../types';
import parse from 'html-react-parser';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './TeamCard.css';

interface TeamCardProps {
    index:number;
    member: SelectedTeamMember;
    isExpanded: boolean;
    areProjectsVisible: boolean;
    showReadMoreButton: boolean;
    handleMoreToggle: (name: string, url: string) => void;
    handleProjectsToggle: (name: string) => void;
  }

const TeamCard: React.FC<TeamCardProps> = (
    {
        index,
        member,
        isExpanded,
        areProjectsVisible,
        showReadMoreButton,
        handleMoreToggle,
        handleProjectsToggle
      }

) => {

    //Handing fetching of the picture
    const pictureUrl = member.picture_blog2020 || (member.picture ? `https://content.thegovlab.com/assets/${member.picture.id}` : '');

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
};

export default TeamCard;
