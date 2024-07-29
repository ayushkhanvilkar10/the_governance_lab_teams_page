export interface ProjectID {
    id: number;
    name: string;
    project_link: string; // Link is needed to wrap around name
}

export interface Project {
    id: number;
    team_id: string;
    projects_id: ProjectID; // An object with different project related properties
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
  
  // TeamMember includes common properties of a member and any-key properties for additional properties that API might return
  export interface TeamMember extends CommonMemberProps {
    [key: string]: any;
  }
  
  // SelectedTeamMember includes common properties of a member and the url property
  export interface SelectedTeamMember extends CommonMemberProps {
    url: string; // Link to GovLabs bio when on click of MORE button
  }
  
