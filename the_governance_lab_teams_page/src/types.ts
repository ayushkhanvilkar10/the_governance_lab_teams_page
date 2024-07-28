export interface ProjectID {
    id: number;
    name: string;
    project_link: string;
}

export interface Project {
    id: number;
    team_id: string;
    projects_id: ProjectID;
}

export interface Picture {
    id: string;
}

// Define common properties separately
interface CommonMemberProps {
    name: string;
    title: string;
    bio_short: string;
    bio?: string;
    picture_blog2020?: string;
    picture?: Picture;
    projects?: Project[];
  }
  
  // TeamMember includes common properties and additional any-key properties
  export interface TeamMember extends CommonMemberProps {
    [key: string]: any;
  }
  
  // SelectedTeamMember includes common properties and the url property
  export interface SelectedTeamMember extends CommonMemberProps {
    url: string;
  }
  
