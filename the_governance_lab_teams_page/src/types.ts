export interface ProjectID {
    id: number;
    name: string;
    project_link: string; // Link is needed to wrap around name
}

export interface Project {
    id: number;
    team_id: string;
    projects_id: ProjectID; // An object with all the project related properties
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
    picture_blog2020?: string; // Primary source of profile picture
    picture?: Picture;  // Back up source of profile picture
    projects?: Project[];
  }
  
  // TeamMember interface represents Teammember properties returned by the API
  export interface TeamMember extends CommonMemberProps {
    [key: string]: any;
  }
  
  // SelectedTeamMember interface represents Teammember properties to be displayed on the website
  export interface SelectedTeamMember extends CommonMemberProps {
    url: string; // Links to GovLabs bio when on click of MORE button
  }
  
